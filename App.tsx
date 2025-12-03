import React, { useState } from 'react';
import { PHONICS_CATEGORIES } from './constants';
import { analyzeWordWithGemini } from './services/gemini';
import WordStage from './components/WordStage';
import { WordAnalysis, PhonicsPattern } from './types';

function App() {
  const [selectedPattern, setSelectedPattern] = useState<PhonicsPattern | null>(PHONICS_CATEGORIES[0].patterns[0]);
  const [currentWord, setCurrentWord] = useState<WordAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Initial load simulation
  React.useEffect(() => {
    if (selectedPattern) {
      handleWordSelect(selectedPattern.examples[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWordSelect = async (word: string) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const data = await analyzeWordWithGemini(word);
      setCurrentWord(data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to analyze word. Please check your network or API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    
    setSelectedPattern(null);
    handleWordSelect(customInput.trim());
    setCustomInput('');
  };

  const handlePatternClick = (pattern: PhonicsPattern) => {
    setSelectedPattern(pattern);
    // Auto-load first example
    if (pattern.examples.length > 0) {
      handleWordSelect(pattern.examples[0]);
    }
  };

  return (
    <div className="h-screen flex flex-col font-sans text-slate-800 bg-[#f8fafc] overflow-hidden">
      
      {/* Top Navbar */}
      <header className="flex-none bg-white z-20 border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center text-white font-display font-bold text-2xl shadow-md">
              W
            </div>
            <div className="flex flex-col justify-center leading-none">
              <h1 className="text-xl font-display font-bold text-slate-800 tracking-tight">
                新知旺豆
              </h1>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                PhonicsFlow
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-auto">
             <form onSubmit={handleCustomSubmit} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Try any word (e.g. 'extraordinary')..."
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
              />
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden max-w-screen-2xl mx-auto w-full">
        
        {/* Sidebar - Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200 overflow-y-auto hidden lg:block custom-scrollbar">
          <div className="p-4 space-y-6">
            {PHONICS_CATEGORIES.map((category) => (
              <div key={category.id}>
                <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {category.title}
                </h3>
                <div className="space-y-0.5">
                  {category.patterns.map((pattern) => (
                    <button
                      key={pattern.id}
                      onClick={() => handlePatternClick(pattern)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center justify-between group ${
                        selectedPattern?.id === pattern.id
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="font-display text-base">{pattern.label}</span>
                      {selectedPattern?.id === pattern.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center - Stage */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-slate-50/50">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Context Header */}
            <div className="flex items-end justify-between">
              <div>
                {selectedPattern ? (
                  <>
                    <h2 className="text-3xl font-display font-bold text-slate-800">{selectedPattern.label}</h2>
                    <p className="text-slate-500 mt-1">{selectedPattern.description}</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-display font-bold text-slate-800">Custom Analysis</h2>
                    <p className="text-slate-500 mt-1">Analyzing "{currentWord?.word}"</p>
                  </>
                )}
              </div>
            </div>

            {/* The Main Stage - Passing selectedPattern.id for strict highlighting */}
            <WordStage 
              data={currentWord} 
              isLoading={isLoading} 
              activePatternId={selectedPattern?.id} 
            />
            
            {errorMsg && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center border border-red-100">
                {errorMsg}
              </div>
            )}

            {/* Example List */}
            {selectedPattern && (
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-bold text-slate-700">Practice Words</h3>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {selectedPattern.examples.map((ex) => {
                    const isActive = currentWord?.word.toLowerCase() === ex.toLowerCase();
                    return (
                      <button
                        key={ex}
                        onClick={() => handleWordSelect(ex)}
                        disabled={isLoading}
                        className={`relative group px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200 border text-center ${
                          isActive
                          ? 'bg-slate-800 text-white border-slate-800 shadow-lg scale-105 z-10'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5'
                        }`}
                      >
                        {ex}
                        {isActive && (
                           <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;