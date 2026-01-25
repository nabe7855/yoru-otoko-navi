import React, { useEffect } from "react";
// @ts-ignore - Fixing "Module 'react-router-dom' has no exported member '...'" compiler errors
import { HelpCircle, Home as HomeIcon, Search, Star, User } from "lucide-react";
import {
  Link,
  NavLink,
  Route,
  HashRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Business from "./pages/Business";
import FAQ from "./pages/FAQ";
import Features from "./pages/Features";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import JobList from "./pages/JobList";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MemberMock: React.FC = () => (
  <div className="container mx-auto px-4 py-20 text-center">
    <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
      <User size={40} />
    </div>
    <h2 className="text-2xl font-black text-slate-900 mb-4">
      マイページ (開発中)
    </h2>
    <p className="text-slate-500 mb-8 font-medium">
      ログイン機能、キープ一覧、応募履歴がこちらで管理できるようになります。
    </p>
    <Link
      to="/"
      className="inline-block px-8 py-3 bg-indigo-600 text-white font-black rounded-xl shadow-lg hover:brightness-110 transition"
    >
      トップへ戻る
    </Link>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<JobList />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/features" element={<Features />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/business" element={<Business />} />
            <Route path="/member" element={<MemberMock />} />
          </Routes>
        </main>

        {/* Mobile Sticky Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 h-16 flex items-center justify-around px-2 z-[55] shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <NavLink
            to="/"
            className={({ isActive }: { isActive: boolean }) =>
              `flex flex-col items-center gap-1 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400"}`
            }
          >
            <HomeIcon size={20} />
            <span className="text-[10px] font-black uppercase tracking-tighter">
              ホーム
            </span>
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }: { isActive: boolean }) =>
              `flex flex-col items-center gap-1 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400"}`
            }
          >
            <Search size={20} />
            <span className="text-[10px] font-black uppercase tracking-tighter">
              求人探す
            </span>
          </NavLink>
          <NavLink
            to="/features"
            className={({ isActive }: { isActive: boolean }) =>
              `flex flex-col items-center gap-1 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400"}`
            }
          >
            <Star size={20} />
            <span className="text-[10px] font-black uppercase tracking-tighter">
              特集
            </span>
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }: { isActive: boolean }) =>
              `flex flex-col items-center gap-1 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400"}`
            }
          >
            <HelpCircle size={20} />
            <span className="text-[10px] font-black uppercase tracking-tighter">
              FAQ
            </span>
          </NavLink>
          <NavLink
            to="/member"
            className={({ isActive }: { isActive: boolean }) =>
              `flex flex-col items-center gap-1 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400"}`
            }
          >
            <User size={20} />
            <span className="text-[10px] font-black uppercase tracking-tighter">
              マイページ
            </span>
          </NavLink>
        </nav>

        <footer className="bg-slate-900 text-slate-400 py-16 lg:py-20 border-t border-slate-800 pb-28 lg:pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="sm:col-span-2">
                <span className="text-3xl font-black bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent mb-6 inline-block">
                  夜男ナビ{" "}
                  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-100">
                    -ヨルオナビ-
                  </span>
                </span>
                <p className="text-sm leading-relaxed max-w-sm font-medium">
                  夜男ナビ（よるおナビ）は、男性ナイトワークに特化した日本最大級の求人プラットフォームです。
                  全国の厳選された優良店舗のみを掲載し、あなたの「稼ぎたい」を全力でサポートします。
                </p>
              </div>
              <div>
                <h4 className="text-white font-black mb-6 tracking-widest uppercase text-sm">
                  サイトマップ
                </h4>
                <ul className="text-sm space-y-4 font-bold">
                  <li>
                    <Link
                      to="/search"
                      className="hover:text-amber-400 transition-colors"
                    >
                      求人を検索
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/features"
                      className="hover:text-amber-400 transition-colors"
                    >
                      求人特集
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      className="hover:text-amber-400 transition-colors"
                    >
                      よくある質問
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/business"
                      className="hover:text-amber-400 transition-colors"
                    >
                      店舗掲載について
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-black mb-6 tracking-widest uppercase text-sm">
                  法的情報
                </h4>
                <ul className="text-sm space-y-4 font-bold">
                  <li>
                    <Link
                      to="/business"
                      className="hover:text-amber-400 transition-colors"
                    >
                      利用規約
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/business"
                      className="hover:text-amber-400 transition-colors"
                    >
                      プライバシーポリシー
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/business"
                      className="hover:text-amber-400 transition-colors"
                    >
                      特定商取引法に基づく表記
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-800 text-[10px] md:text-xs text-center font-black tracking-widest text-slate-600">
              &copy; 2024 YAKAN NAVI. ALL RIGHTS RESERVED.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
