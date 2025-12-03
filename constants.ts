import { PhonicsCategory } from './types';

export const PHONICS_CATEGORIES: PhonicsCategory[] = [
  {
    id: 'short-vowels',
    title: 'Short Vowels (单元音)',
    patterns: [
      { id: 'short-a', label: 'Short a /æ/', description: 'As in "cat"', examples: ['cat', 'apple', 'map', 'bat', 'sand', 'fan', 'hat', 'bag'] },
      { id: 'short-e', label: 'Short e /e/', description: 'As in "bed"', examples: ['bed', 'egg', 'pen', 'hen', 'red', 'net', 'ten', 'leg'] },
      { id: 'short-i', label: 'Short i /ɪ/', description: 'As in "pig"', examples: ['pig', 'fish', 'sit', 'win', 'milk', 'big', 'six', 'kid'] },
      { id: 'short-o', label: 'Short o /ɒ/', description: 'As in "dog"', examples: ['dog', 'box', 'hot', 'pot', 'lock', 'fox', 'top', 'sock'] },
      { id: 'short-u', label: 'Short u /ʌ/', description: 'As in "sun"', examples: ['sun', 'bus', 'cup', 'duck', 'run', 'bug', 'nut', 'jug'] },
    ]
  },
  {
    id: 'long-vowels-magic-e',
    title: 'Magic E (Silent E)',
    patterns: [
      { id: 'a_e', label: 'a_e', description: '/eɪ/ Make A long', examples: ['cake', 'snake', 'game', 'plate', 'face', 'lake', 'name'] },
      { id: 'i_e', label: 'i_e', description: '/aɪ/ Make I long', examples: ['bike', 'kite', 'time', 'smile', 'slide', 'five', 'rice'] },
      { id: 'o_e', label: 'o_e', description: '/əʊ/ Make O long', examples: ['bone', 'home', 'rose', 'nose', 'stone', 'rope', 'hope'] },
      { id: 'u_e', label: 'u_e', description: '/juː/ or /uː/ Make U long', examples: ['cute', 'cube', 'tube', 'huge', 'mule', 'fume', 'tune'] },
    ]
  },
  {
    id: 'vowel-teams-polymorphic',
    title: 'Vowel Teams (Variations)',
    patterns: [
      { id: 'ea-long', label: 'ea /iː/', description: 'Long E as in "meat"', examples: ['meat', 'tea', 'leaf', 'beach', 'team', 'read', 'speak', 'clean'] },
      { id: 'ea-short', label: 'ea /e/', description: 'Short E as in "bread"', examples: ['bread', 'head', 'sweat', 'ready', 'heavy', 'weather', 'feather'] },
      { id: 'ea-break', label: 'ea /eɪ/', description: 'Long A as in "steak"', examples: ['steak', 'break', 'great', 'yeah'] },
      
      { id: 'ow-cow', label: 'ow /aʊ/', description: 'As in "cow"', examples: ['cow', 'town', 'brown', 'flower', 'clown', 'down', 'owl'] },
      { id: 'ow-snow', label: 'ow /əʊ/', description: 'As in "snow"', examples: ['snow', 'slow', 'grow', 'window', 'yellow', 'show', 'low'] },
      
      { id: 'oo-long', label: 'oo /uː/', description: 'Long sound as in "moon"', examples: ['moon', 'zoo', 'food', 'room', 'spoon', 'cool', 'pool'] },
      { id: 'oo-short', label: 'oo /ʊ/', description: 'Short sound as in "book"', examples: ['book', 'look', 'good', 'foot', 'cook', 'wood', 'wool'] },
      
      { id: 'ou-cloud', label: 'ou /aʊ/', description: 'As in "cloud"', examples: ['cloud', 'house', 'mouse', 'sound', 'round', 'ground', 'out'] },
      { id: 'ou-soup', label: 'ou /uː/', description: 'As in "soup"', examples: ['soup', 'group', 'you', 'youth', 'wound'] },
      
      { id: 'ie-pie', label: 'ie /aɪ/', description: 'Long I as in "pie"', examples: ['pie', 'lie', 'tie', 'die', 'fried'] },
      { id: 'ie-chief', label: 'ie /iː/', description: 'Long E as in "field"', examples: ['field', 'shield', 'chief', 'thief', 'piece', 'believe'] },
    ]
  },
  {
    id: 'y-endings',
    title: 'Y as a Vowel',
    patterns: [
      { id: 'y-cry', label: 'y /aɪ/', description: 'End of 1-syllable word', examples: ['cry', 'fly', 'sky', 'try', 'dry', 'fry', 'shy', 'my'] },
      { id: 'y-happy', label: 'y /i/', description: 'End of 2+ syllable word', examples: ['happy', 'baby', 'funny', 'puppy', 'sunny', 'party', 'candy'] },
    ]
  },
  {
    id: 'consonant-rules',
    title: 'Consonant Rules (C/G/CH)',
    patterns: [
      { id: 'c-hard', label: 'Hard C /k/', description: 'Before a, o, u', examples: ['cat', 'cup', 'cake', 'coat', 'cute', 'car', 'color'] },
      { id: 'c-soft', label: 'Soft C /s/', description: 'Before e, i, y', examples: ['city', 'ice', 'face', 'pencil', 'cycle', 'dance', 'rice'] },
      { id: 'g-hard', label: 'Hard G /g/', description: 'Before a, o, u', examples: ['game', 'go', 'gum', 'gate', 'goat', 'gas', 'garden'] },
      { id: 'g-soft', label: 'Soft G /dʒ/', description: 'Before e, i, y', examples: ['gem', 'giant', 'giraffe', 'gym', 'gentle', 'magic', 'cage'] },
      { id: 'ch-chair', label: 'ch /tʃ/', description: 'As in "chair"', examples: ['chair', 'cheese', 'lunch', 'chicken', 'beach', 'rich'] },
      { id: 'ch-school', label: 'ch /k/', description: 'As in "school"', examples: ['school', 'stomach', 'ache', 'chorus', 'chemistry', 'echo'] },
      { id: 'ch-chef', label: 'ch /ʃ/', description: 'As in "chef"', examples: ['chef', 'machine', 'brochure', 'parachute'] },
    ]
  },
  {
    id: 'common-digraphs',
    title: 'Other Digraphs',
    patterns: [
      { id: 'sh', label: 'sh', description: 'As in "ship"', examples: ['ship', 'fish', 'shop', 'shoe', 'brush', 'wash', 'sheep'] },
      { id: 'th-soft', label: 'th (soft)', description: 'Unvoiced /θ/', examples: ['think', 'thin', 'bath', 'math', 'path', 'three', 'thank'] },
      { id: 'th-hard', label: 'th (hard)', description: 'Voiced /ð/', examples: ['that', 'this', 'brother', 'mother', 'father', 'with', 'they'] },
      { id: 'ph', label: 'ph', description: 'Sounds like F', examples: ['phone', 'photo', 'dolphin', 'elephant', 'graph'] },
      { id: 'wh', label: 'wh', description: 'As in "whale"', examples: ['whale', 'white', 'wheel', 'when', 'whip', 'whisper'] },
      { id: 'ck', label: 'ck', description: 'End of short vowel', examples: ['duck', 'clock', 'sock', 'truck', 'black', 'kick', 'back'] },
      { id: 'ng', label: 'ng', description: 'Nasal sound', examples: ['king', 'ring', 'song', 'long', 'wing', 'sing', 'strong'] },
      { id: 'nk', label: 'nk', description: 'Nasal blend', examples: ['pink', 'bank', 'sink', 'drink', 'thank', 'wink', 'honk'] },
    ]
  },
  {
    id: 'r-blends',
    title: 'R-Blends',
    patterns: [
      { id: 'br', label: 'br', description: 'As in "brown"', examples: ['brown', 'bread', 'brick', 'brush', 'broom', 'bridge', 'brave'] },
      { id: 'cr', label: 'cr', description: 'As in "crab"', examples: ['crab', 'cry', 'cross', 'crown', 'cream', 'crowd', 'crazy'] },
      { id: 'dr', label: 'dr', description: 'As in "drum"', examples: ['drum', 'drink', 'dress', 'drive', 'dragon', 'drop', 'dream'] },
      { id: 'fr', label: 'fr', description: 'As in "frog"', examples: ['frog', 'fruit', 'friend', 'fresh', 'free', 'frame', 'friday'] },
      { id: 'gr', label: 'gr', description: 'As in "green"', examples: ['green', 'grass', 'grape', 'grow', 'great', 'ground', 'grand'] },
      { id: 'pr', label: 'pr', description: 'As in "prize"', examples: ['prize', 'print', 'pretty', 'price', 'proud', 'press', 'present'] },
      { id: 'tr', label: 'tr', description: 'As in "tree"', examples: ['tree', 'train', 'truck', 'trip', 'true', 'track', 'try'] },
    ]
  },
  {
    id: 'l-blends',
    title: 'L-Blends',
    patterns: [
      { id: 'bl', label: 'bl', description: 'As in "blue"', examples: ['blue', 'black', 'block', 'blow', 'blind', 'blanket'] },
      { id: 'cl', label: 'cl', description: 'As in "clock"', examples: ['clock', 'cloud', 'clean', 'class', 'clown', 'clap'] },
      { id: 'fl', label: 'fl', description: 'As in "flower"', examples: ['flower', 'fly', 'flag', 'float', 'floor', 'flame'] },
      { id: 'gl', label: 'gl', description: 'As in "glue"', examples: ['glue', 'glass', 'globe', 'glove', 'glad', 'glow'] },
      { id: 'pl', label: 'pl', description: 'As in "play"', examples: ['play', 'plane', 'plant', 'plate', 'plum', 'plug'] },
      { id: 'sl', label: 'sl', description: 'As in "sleep"', examples: ['sleep', 'slow', 'slide', 'sled', 'slip', 'slice'] },
    ]
  },
  {
    id: 's-blends',
    title: 'S-Blends',
    patterns: [
      { id: 'sc', label: 'sc', description: 'As in "scale"', examples: ['scale', 'scan', 'scare', 'score', 'scout'] },
      { id: 'sk', label: 'sk', description: 'As in "sky"', examples: ['sky', 'skip', 'skin', 'skate', 'desk', 'mask'] },
      { id: 'sm', label: 'sm', description: 'As in "smile"', examples: ['smile', 'small', 'smell', 'smoke', 'smart'] },
      { id: 'sn', label: 'sn', description: 'As in "snake"', examples: ['snake', 'snow', 'snap', 'snack', 'snail'] },
      { id: 'sp', label: 'sp', description: 'As in "spoon"', examples: ['spoon', 'sport', 'spot', 'space', 'spider', 'spin'] },
      { id: 'st', label: 'st', description: 'As in "star"', examples: ['star', 'stop', 'stone', 'step', 'stand', 'fast'] },
      { id: 'sw', label: 'sw', description: 'As in "swim"', examples: ['swim', 'sweet', 'swan', 'swing', 'sweep'] },
    ]
  },
  {
    id: 'silent-letters',
    title: 'Silent Letters',
    patterns: [
      { id: 'kn', label: 'kn', description: 'Silent k', examples: ['knee', 'know', 'knife', 'knock', 'knot', 'knight'] },
      { id: 'wr', label: 'wr', description: 'Silent w', examples: ['write', 'wrist', 'wrong', 'wrap', 'wreck'] },
      { id: 'mb', label: 'mb', description: 'Silent b', examples: ['lamb', 'comb', 'thumb', 'climb', 'crumb'] },
      { id: 'gn', label: 'gn', description: 'Silent g', examples: ['gnat', 'sign', 'design', 'gnaw'] },
    ]
  },
  {
    id: 'special-endings',
    title: 'Special Endings',
    patterns: [
      { id: 'ture', label: 'ture', description: '/tʃə/', examples: ['nature', 'picture', 'future', 'adventure', 'capture', 'creature'] },
      { id: 'tion', label: 'tion', description: '/ʃən/', examples: ['action', 'station', 'vacation', 'nation', 'motion'] },
      { id: 'sion', label: 'sion', description: '/ʃən/ or /ʒən/', examples: ['vision', 'mission', 'television', 'decision'] },
      { id: 'ous', label: 'ous', description: '/əs/', examples: ['famous', 'nervous', 'dangerous', 'joyous'] },
    ]
  },
  {
    id: 'r-controlled',
    title: 'R-Controlled Vowels',
    patterns: [
      { id: 'ar', label: 'ar', description: 'As in "car"', examples: ['car', 'star', 'park', 'farm', 'dark', 'shark'] },
      { id: 'er', label: 'er', description: 'As in "teacher"', examples: ['teacher', 'water', 'flower', 'winter', 'sister'] },
      { id: 'ir', label: 'ir', description: 'As in "bird"', examples: ['bird', 'girl', 'shirt', 'skirt', 'dirt', 'circle'] },
      { id: 'or', label: 'or', description: 'As in "corn"', examples: ['corn', 'fork', 'horse', 'storm', 'sport', 'short'] },
      { id: 'ur', label: 'ur', description: 'As in "nurse"', examples: ['nurse', 'turn', 'burn', 'purple', 'surf', 'hurt'] },
    ]
  },
];