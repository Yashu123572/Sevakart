
import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-100 rounded-2xl leading-5 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 sm:text-sm transition-all shadow-sm"
        placeholder="Search for 'Plumber', 'AC Repair'..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button 
        type="button"
        className="absolute inset-y-0 right-0 pr-4 flex items-center"
      >
        <Mic className="h-5 w-5 text-blue-600" />
      </button>
    </form>
  );
};

export default SearchBar;
