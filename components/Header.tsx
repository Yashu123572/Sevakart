
import React from 'react';
import { MapPin, Bell, Menu, UserPlus } from 'lucide-react';

interface HeaderProps {
  onJoinAsPro?: () => void;
  onHomeClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onJoinAsPro, onHomeClick }) => {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 px-4 py-3 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onHomeClick}>
          <div className="bg-blue-600 p-1.5 rounded-lg">
             <span className="text-white font-black text-xl tracking-tighter">SK</span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-blue-600 tracking-tight leading-none">SevaKart</h1>
            <div className="flex items-center gap-1 mt-0.5 text-gray-500 hover:text-blue-500 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-semibold uppercase tracking-wider">Ghazipur, UP</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onJoinAsPro}
            className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all border border-blue-100"
          >
            <UserPlus className="w-4 h-4" />
            Join as Professional
          </button>
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all sm:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
