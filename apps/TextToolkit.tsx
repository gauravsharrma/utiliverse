import React, { useState, useEffect, useMemo } from 'react';

const STORAGE_KEY = 'text-toolkit-content';

const TextToolkit: React.FC = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, text);
  }, [text]);

  const wordCount = useMemo(() => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [text]);

  const charCount = text.length;
  const charCountNoSpaces = useMemo(() => text.replace(/\s+/g, '').length, [text]);

  const update = (fn: (t: string) => string) => setText(t => fn(t));

  const removeDuplicateLines = () => update(t => Array.from(new Set(t.split(/\n/))).join('\n'));
  const removeDuplicateWords = () => update(t => Array.from(new Set(t.split(/\s+/))).join(' '));
  const sortLinesAsc = () => update(t => t.split(/\n/).sort((a,b) => a.localeCompare(b)).join('\n'));
  const sortLinesDesc = () => update(t => t.split(/\n/).sort((a,b) => b.localeCompare(a)).join('\n'));
  const removeExtraSpaces = () => update(t => t.replace(/\s+/g, ' ').trim());
  const toUpper = () => update(t => t.toUpperCase());
  const toLower = () => update(t => t.toLowerCase());
  const toCapitalize = () => update(t => t.replace(/\b\w+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()));
  const reverseText = () => update(t => t.split('').reverse().join(''));
  const reverseLines = () => update(t => t.split('\n').reverse().join('\n'));
  const removeBlankLines = () => update(t => t.split('\n').filter(l => l.trim() !== '').join('\n'));
  const copyToClipboard = async () => { await navigator.clipboard.writeText(text); };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <textarea
        className="w-full min-h-[200px] p-3 border rounded dark:bg-gray-800"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button onClick={removeDuplicateLines} className="px-3 py-2 bg-indigo-600 text-white rounded">Dedup Lines</button>
        <button onClick={removeDuplicateWords} className="px-3 py-2 bg-indigo-600 text-white rounded">Dedup Words</button>
        <button onClick={sortLinesAsc} className="px-3 py-2 bg-indigo-600 text-white rounded">Sort A-Z</button>
        <button onClick={sortLinesDesc} className="px-3 py-2 bg-indigo-600 text-white rounded">Sort Z-A</button>
        <button onClick={removeExtraSpaces} className="px-3 py-2 bg-indigo-600 text-white rounded">Clean Spaces</button>
        <button onClick={removeBlankLines} className="px-3 py-2 bg-indigo-600 text-white rounded">Remove Blank</button>
        <button onClick={toUpper} className="px-3 py-2 bg-indigo-600 text-white rounded">UPPER</button>
        <button onClick={toLower} className="px-3 py-2 bg-indigo-600 text-white rounded">lower</button>
        <button onClick={toCapitalize} className="px-3 py-2 bg-indigo-600 text-white rounded">Capitalize</button>
        <button onClick={reverseText} className="px-3 py-2 bg-indigo-600 text-white rounded">Reverse Text</button>
        <button onClick={reverseLines} className="px-3 py-2 bg-indigo-600 text-white rounded">Reverse Lines</button>
        <button onClick={copyToClipboard} className="px-3 py-2 bg-green-600 text-white rounded">Copy</button>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 flex justify-between">
        <span>Words: {wordCount}</span>
        <span>Chars: {charCount} ({charCountNoSpaces} no spaces)</span>
      </div>
    </div>
  );
};

export default TextToolkit;
