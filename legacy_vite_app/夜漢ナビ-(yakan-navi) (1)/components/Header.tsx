import React from 'react';
import { Menu, Search, User, LogIn } from 'lucide-react';
// @ts-ignore - Fixing "Module 'react-router-dom' has no exported member 'Link'" compiler error
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-lg h-14 md:h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent group-hover:brightness-110 transition">夜漢ナビ</span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold">
          <Link to="/search" className="hover:text-amber-400 transition-colors">求人を探す</Link>
          <Link to="/features" className="hover:text-amber-400 transition-colors">特集</Link>
          <Link to="/faq" className="hover:text-amber-400 transition-colors">よくある質問</Link>
          <Link to="/business" className="hover:text-amber-400 transition-colors border-l border-slate-700 pl-8">店舗様向け</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link to="/member" className="p-2 hover:bg-slate-800 rounded-lg lg:hidden">
            <Search size={20} />
          </Link>
          <Link to="/member" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-700 hover:bg-slate-800 transition text-xs font-bold">
            <User size={14} />
            <span>マイページ</span>
          </Link>
          <Link to="/member" className="flex items-center gap-1.5 px-3 md:px-5 py-1.5 md:py-2 rounded-full gradient-gold text-slate-900 font-black hover:brightness-110 transition text-xs md:text-sm shadow-lg shadow-amber-500/20">
            <LogIn size={16} />
            <span>ログイン</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;