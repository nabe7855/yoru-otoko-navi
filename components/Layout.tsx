
import React from 'react';
import { Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userRole: Role;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, userRole, onNavigate, currentPage }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-moon text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              NightJob JP
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onNavigate('jobs')} 
              className={`text-sm font-medium ${currentPage === 'jobs' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              求人を探す
            </button>
            {userRole === 'jobseeker' && (
              <>
                <button onClick={() => onNavigate('my-apps')} className={`text-sm font-medium ${currentPage === 'my-apps' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>応募履歴</button>
                <button onClick={() => onNavigate('my-profile')} className={`text-sm font-medium ${currentPage === 'my-profile' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>プロフィール設定</button>
              </>
            )}
            {userRole === 'employer' && (
              <>
                <button onClick={() => onNavigate('employer-dashboard')} className={`text-sm font-medium ${currentPage === 'employer-dashboard' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>求人・応募管理</button>
                <button onClick={() => onNavigate('talent-pool')} className={`text-sm font-medium ${currentPage === 'talent-pool' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>タレントを探す</button>
              </>
            )}
            {userRole === 'admin' && (
              <button onClick={() => onNavigate('admin-dashboard')} className={`text-sm font-medium ${currentPage === 'admin-dashboard' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>管理者ツール</button>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {userRole === 'guest' ? (
              <button 
                onClick={() => onNavigate('login')}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition"
              >
                ログイン
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                  {userRole[0].toUpperCase()}
                </div>
                <button 
                   onClick={() => onNavigate('logout')}
                   className="text-xs text-gray-400 hover:text-red-500"
                >
                  ログアウト
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content with bottom padding on mobile to account for fixed bar */}
      <main className="flex-grow bg-slate-50/30 pb-24 md:pb-0">
        {children}
      </main>

      {/* Mobile Fixed Bottom Navigation - Updated to include Job Matcher */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="container mx-auto max-w-md flex items-center justify-between gap-2">
          <button 
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center flex-1 py-1.5 rounded-xl transition ${currentPage === 'home' ? 'text-indigo-600 bg-indigo-50/50' : 'text-gray-400'}`}
          >
            <i className="fas fa-home text-lg"></i>
            <span className="text-[9px] font-black mt-1">ホーム</span>
          </button>
          
          <button 
            onClick={() => onNavigate('job-matcher')}
            className={`flex flex-col items-center flex-[1.5] py-2.5 rounded-2xl transition shadow-lg ${
              currentPage === 'job-matcher' 
              ? 'bg-indigo-600 text-white shadow-indigo-200' 
              : 'bg-white border border-gray-100 text-indigo-600 shadow-gray-200/50'
            }`}
          >
            <div className="relative">
              <i className="fas fa-bolt text-lg"></i>
              {!['job-matcher'].includes(currentPage) && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
              )}
            </div>
            <span className="text-[10px] font-black mt-0.5">30秒診断</span>
          </button>

          <button 
            onClick={() => window.open('https://line.me/', '_blank')}
            className="flex flex-col items-center flex-1 py-1.5 text-[#06C755]"
          >
            <i className="fab fa-line text-2xl"></i>
            <span className="text-[9px] font-black mt-0.5">相談</span>
          </button>

          <button 
            onClick={() => onNavigate('jobs')}
            className={`flex flex-col items-center flex-1 py-1.5 rounded-xl transition ${currentPage === 'jobs' ? 'text-indigo-600 bg-indigo-50/50' : 'text-gray-400'}`}
          >
            <i className="fas fa-search text-lg"></i>
            <span className="text-[9px] font-black mt-1">探す</span>
          </button>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 pb-36 md:pb-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-moon text-indigo-400 text-2xl"></i>
              <span className="text-2xl font-bold">NightJob JP</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              水商売に特化した、安心・安全な求人プラットフォーム。
              AIによる審査と、厳しい店舗基準で、あなたの夜のスタートを支えます。
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">サービス</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>求人検索</li>
              <li>タレントマッチング</li>
              <li>求職者ガイド</li>
              <li>安心への取り組み</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">サポート</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>お問い合わせ</li>
              <li>利用規約</li>
              <li>プライバシーポリシー</li>
              <li>運営会社</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          © 2024 NightJob JP. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
