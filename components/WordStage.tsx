import React, { useState, useMemo } from 'react';
import { WordAnalysis } from '../types';

interface WordStageProps {
  data: WordAnalysis | null;
  isLoading: boolean;
  activePatternId?: string;
}

const WordStage: React.FC<WordStageProps> = ({ data, isLoading, activePatternId }) => {
  const [activeAudio, setActiveAudio] = useState<boolean>(false);

  const speak = (text: string, rate: number = 0.8) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to find a British English voice
    const voices = window.speechSynthesis.getVoices();
    const gbVoice = voices.find(voice => voice.lang === 'en-GB' || voice.name.includes('UK') || voice.name.includes('British'));
    
    if (gbVoice) {
      utterance.voice = gbVoice;
      utterance.lang = 'en-GB';
    } else {
      utterance.lang = 'en-GB'; // Fallback hint
    }

    utterance.rate = rate;
    utterance.onstart = () => setActiveAudio(true);
    utterance.onend = () => setActiveAudio(false);
    utterance.onerror = () => setActiveAudio(false);
    
    window.speechSynthesis.speak(utterance);
  };

  // Helper function to identify indices to highlight based on the selected pattern
  const getStrictPatternIndices = (word: string, patternId: string): number[] => {
    if (!word || !patternId) return [];
    const lowerWord = word.toLowerCase();
    const indices: number[] = [];

    // 1. Handle Short Vowels (id: 'short-a' -> match 'a')
    if (patternId.startsWith('short-')) {
        const char = patternId.split('-')[1]; 
        for (let i = 0; i < lowerWord.length; i++) {
            if (lowerWord[i] === char) indices.push(i);
        }
        return indices;
    }

    // 2. Handle Split Digraphs / Magic E (id: 'a_e' -> match 'a...e')
    if (patternId.includes('_e')) {
        const startChar = patternId[0];
        // Regex looks for the vowel, any single character (simplification), then 'e'
        const regex = new RegExp(`${startChar}.e`, 'g');
        let match;
        while ((match = regex.exec(lowerWord)) !== null) {
            indices.push(match.index);     // The vowel
            indices.push(match.index + 2); // The 'e'
        }
        return indices;
    }

    // 3. Handle Context-Sensitive Consonants (Soft/Hard C & G)
    // Rule: C/G is soft if followed by e, i, or y. Otherwise hard.
    if (patternId === 'c-soft') {
       for (let i = 0; i < lowerWord.length; i++) {
         if (lowerWord[i] === 'c') {
           const next = lowerWord[i+1];
           if (next && ['e','i','y'].includes(next)) indices.push(i);
         }
       }
       return indices;
    }
    if (patternId === 'c-hard') {
       for (let i = 0; i < lowerWord.length; i++) {
         if (lowerWord[i] === 'c') {
           const next = lowerWord[i+1];
           // End of word or followed by something else
           if (!next || !['e','i','y'].includes(next)) indices.push(i);
         }
       }
       return indices;
    }
    if (patternId === 'g-soft') {
       for (let i = 0; i < lowerWord.length; i++) {
         if (lowerWord[i] === 'g') {
           const next = lowerWord[i+1];
           if (next && ['e','i','y'].includes(next)) indices.push(i);
         }
       }
       return indices;
    }
    if (patternId === 'g-hard') {
       for (let i = 0; i < lowerWord.length; i++) {
         if (lowerWord[i] === 'g') {
           const next = lowerWord[i+1];
           if (!next || !['e','i','y'].includes(next)) indices.push(i);
         }
       }
       return indices;
    }


    // 4. Handle Substring Matches (with potential suffix removal)
    // Example: 'ea-long' -> target 'ea', 'ow-cow' -> target 'ow'
    let target = patternId;
    if (patternId.includes('-')) {
        target = patternId.split('-')[0];
    }

    // Special map adjustments if ID doesn't directly map to grapheme
    if (patternId === 'th-soft' || patternId === 'th-hard') target = 'th';
    
    if (target.length > 0) {
        let pos = lowerWord.indexOf(target);
        while (pos !== -1) {
            for (let i = 0; i < target.length; i++) {
                indices.push(pos + i);
            }
            pos = lowerWord.indexOf(target, pos + 1);
        }
    }

    return indices;
  };

  // Calculate highlighted indices once per word/pattern
  const highlightedIndices = useMemo(() => {
    if (!data) return new Set<number>();
    
    // Strict Mode: If a pattern is selected from the sidebar, match ONLY that pattern
    if (activePatternId) {
        return new Set(getStrictPatternIndices(data.word, activePatternId));
    }
    
    // Custom Mode: Fallback to AI's general detection if no specific pattern selected
    const aiIndices = data.phonicsMatches.flatMap(m => m.indices);
    return new Set(aiIndices);
  }, [data, activePatternId]);

  if (isLoading) {
    return (
      <div className="w-full h-80 bg-white rounded-3xl shadow-sm border border-slate-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Analyzing sounds...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-80 bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-slate-400">
        <div className="p-4 bg-slate-50 rounded-full mb-4">
             <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        </div>
        <p className="text-lg font-medium">Ready to learn?</p>
        <p className="text-sm">Select a pattern or type a word.</p>
      </div>
    );
  }

  let globalCharIndex = 0;

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 relative transition-all duration-500">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      {/* Main Visualization Area */}
      <div className="p-8 md:p-12 flex flex-col items-center relative z-10">
        
        {/* Play Button - Floating centered top */}
        <button 
          onClick={() => speak(data.word, 0.7)}
          className={`mb-10 p-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
            activeAudio 
              ? 'bg-indigo-50 text-indigo-600 ring-2 ring-indigo-200' 
              : 'bg-white text-indigo-600 shadow-lg border border-indigo-50'
          }`}
          title="Listen to word"
        >
          {activeAudio ? (
             <div className="flex gap-1 h-8 items-center px-1">
               <span className="w-1.5 h-4 bg-indigo-500 rounded-full animate-[bounce_1s_infinite]"></span>
               <span className="w-1.5 h-8 bg-indigo-500 rounded-full animate-[bounce_1s_infinite_0.2s]"></span>
               <span className="w-1.5 h-6 bg-indigo-500 rounded-full animate-[bounce_1s_infinite_0.4s]"></span>
             </div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
            </svg>
          )}
        </button>

        {/* Word Breakdown */}
        <div className="flex flex-wrap justify-center gap-x-1 md:gap-x-2 mb-10 select-none items-end">
          {data.syllables.map((syl, i) => {
            const startIdx = globalCharIndex;
            globalCharIndex += syl.length;
            
            return (
              <div 
                key={i} 
                className="flex flex-col items-center group cursor-pointer relative" 
                onClick={() => speak(syl, 0.8)}
              >
                <div className="relative px-3 py-2 transition-transform duration-300 group-hover:-translate-y-2">
                   <span className="text-5xl md:text-7xl font-display font-medium tracking-wide relative z-10 flex">
                    {syl.split('').map((char, localIdx) => {
                      const globalIdx = startIdx + localIdx;
                      const isHighlighted = highlightedIndices.has(globalIdx);
                      
                      return (
                        <span key={localIdx} className="relative">
                            {/* Background Highlight Shape */}
                            {isHighlighted && (
                                <span className="absolute inset-0 bg-rose-100 rounded-lg -z-10 scale-125 transform rotate-1"></span>
                            )}
                            {/* Text Styling */}
                            <span className={`relative transition-colors duration-300 ${isHighlighted ? "text-rose-500 font-bold" : "text-slate-700"}`}>
                                {char}
                            </span>
                        </span>
                      )
                    })}
                  </span>
                </div>
                
                {/* SVG Syllable Arc Animation */}
                <div className="w-full px-1 h-6 flex justify-center items-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path 
                        d="M 5,0 Q 50,25 95,0" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="5" 
                        className="text-slate-200 group-hover:text-indigo-400 transition-colors duration-300"
                        strokeLinecap="round"
                    />
                    </svg>
                </div>
                
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Tap
                </span>
              </div>
            );
          })}
        </div>

        {/* Sentence Container */}
        <div className="w-full max-w-3xl">
            <div className="relative bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 rounded-full text-xs font-bold text-slate-400 uppercase tracking-widest border border-slate-100 shadow-sm">
                    Example
                </div>
                
                <p className="text-xl md:text-2xl text-slate-600 font-sans leading-relaxed">
                    {data.sentence.split(' ').map((word, i) => {
                    const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
                    const cleanTarget = data.word.toLowerCase();
                    const isTarget = cleanWord === cleanTarget || cleanWord.includes(cleanTarget); 
                    
                    return (
                        <span key={i} className={`inline-block mx-1 ${isTarget ? "text-indigo-600 font-bold scale-105 transform" : ""}`}>
                        {word}
                        </span>
                    );
                    })}
                </p>

                <div className="mt-6 flex justify-center">
                    <button 
                        onClick={() => speak(data.sentence)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors text-sm font-semibold"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Read Sentence
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default WordStage;