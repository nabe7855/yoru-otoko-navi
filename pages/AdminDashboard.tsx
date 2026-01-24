import {
  AlertTriangle,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Edit3,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { jobService } from "../services/jobService";
import { Article, Employer, Job, Profile } from "../types";

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();

  // Data State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // UI State
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "content" | "articles"
  >("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(
    null,
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [allJobs, allEmployers, allUsers, allArticles] = await Promise.all([
      jobService.getJobs(),
      jobService.getEmployers(),
      jobService.getProfiles(),
      jobService.getArticles(),
    ]);

    setJobs(allJobs);
    setEmployers(allEmployers);
    setUsers(allUsers);
    setArticles(allArticles);
    setLoading(false);
  };

  // Job & Employer Actions
  const handleApproveJob = async (jobId: string) => {
    await jobService.updateJobStatus(jobId, "published");
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: "published" } : j)),
    );
  };

  const handleRejectJob = async (jobId: string) => {
    await jobService.updateJobStatus(jobId, "draft");
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: "draft" } : j)),
    );
  };

  const handleApproveEmployer = async (id: string) => {
    await jobService.updateEmployerStatus(id, "approved");
    setEmployers((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "approved" } : e)),
    );
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      !confirm("本当にこのユーザーを削除しますか？この操作は取り消せません。")
    )
      return;
    try {
      await jobService.deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      alert("ユーザーを削除しました");
    } catch (e) {
      alert("削除に失敗しました");
    }
  };

  // Article Actions
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    const newArticle = {
      ...editingArticle,
      id: editingArticle.id || crypto.randomUUID(),
      status: editingArticle.status || "published",
      published_at: editingArticle.published_at || new Date().toISOString(),
      author: editingArticle.author || "編集部",
      is_featured: editingArticle.is_featured || false,
    } as Article;

    if (editingArticle.id) {
      setArticles((prev) =>
        prev.map((a) => (a.id === editingArticle.id ? newArticle : a)),
      );
    } else {
      setArticles((prev) => [newArticle, ...prev]);
    }

    setIsArticleModalOpen(false);
    setEditingArticle(null);
  };

  const handleDeleteArticle = (id: string) => {
    if (!confirm("記事を削除しますか？")) return;
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const pendingJobs = jobs.filter((j) => j.status === "pending");
  const pendingEmployers = employers.filter((e) => e.status === "pending");

  const NavItem = ({
    id,
    label,
    icon: Icon,
    alert,
  }: {
    id: string;
    label: string;
    icon: any;
    alert?: number;
  }) => (
    <button
      onClick={() => {
        setActiveTab(id as any);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center justify-between px-6 py-4 transition-all duration-200 border-l-4 ${
        activeTab === id
          ? "border-indigo-500 bg-slate-800/50 text-white"
          : "border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200"
      }`}
    >
      <div className="flex items-center gap-3 font-bold">
        <Icon size={20} />
        <span>{label}</span>
      </div>
      {alert ? (
        <span className="bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
          {alert}
        </span>
      ) : activeTab === id ? (
        <ChevronRight size={16} className="text-indigo-500" />
      ) : null}
    </button>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-72 bg-slate-900 z-30 transform transition-transform duration-300 md:transform-none flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 pb-4">
          <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Admin Console
          </h1>
          <p className="text-slate-500 text-xs font-bold mt-1 tracking-widest uppercase">
            Management System
          </p>
        </div>

        <nav className="flex-1 mt-8 space-y-1 overflow-y-auto">
          <div className="px-6 pb-2 text-xs font-black text-slate-600 uppercase tracking-widest">
            Main Menu
          </div>
          <NavItem
            id="overview"
            label="ダッシュボード"
            icon={LayoutDashboard}
          />
          <NavItem
            id="content"
            label="審査・コンテンツ"
            icon={CheckCircle}
            alert={pendingJobs.length + pendingEmployers.length}
          />
          <NavItem id="articles" label="記事・特集管理" icon={FileText} />

          <div className="px-6 pb-2 mt-8 text-xs font-black text-slate-600 uppercase tracking-widest">
            System
          </div>
          <NavItem id="users" label="ユーザー管理" icon={Users} />
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button
            onClick={async () => {
              await logout();
              router.push("/");
            }}
            className="w-full py-3 bg-slate-800 hover:bg-rose-900/30 text-slate-400 hover:text-rose-400 rounded-xl font-bold transition flex items-center justify-center gap-2 group"
          >
            <LogOut
              size={16}
              className="group-hover:-translate-x-1 transition"
            />
            ログアウト
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-100 p-4 flex md:hidden justify-between items-center shadow-sm">
          <div className="flex items-center gap-2 font-black text-slate-800">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              A
            </span>
            Admin Console
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Desktop Header / Breadcrumb Area */}
        <div className="hidden md:flex bg-white border-b border-slate-100 px-8 py-4 justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            {activeTab === "overview" && (
              <>
                <LayoutDashboard className="text-indigo-500" /> ダッシュボード
              </>
            )}
            {activeTab === "content" && (
              <>
                <CheckCircle className="text-amber-500" /> 審査・コンテンツ管理
              </>
            )}
            {activeTab === "articles" && (
              <>
                <FileText className="text-emerald-500" /> 記事・特集管理
              </>
            )}
            {activeTab === "users" && (
              <>
                <Users className="text-rose-500" /> ユーザー管理
              </>
            )}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-500">
                System Online
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
              A
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto pb-20">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {[
                  {
                    label: "総ユーザー数",
                    value: users.length,
                    icon: Users,
                    color: "indigo",
                  },
                  {
                    label: "掲載店舗数",
                    value: employers.length,
                    icon: Briefcase,
                    color: "amber",
                  },
                  {
                    label: "公開求人数",
                    value: jobs.filter((j) => j.status === "published").length,
                    icon: FileText,
                    color: "emerald",
                  },
                  {
                    label: "審査待ち",
                    value: pendingJobs.length + pendingEmployers.length,
                    icon: AlertTriangle,
                    color: "rose",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition group"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 mb-4 group-hover:scale-110 transition`}
                    >
                      <stat.icon size={24} />
                    </div>
                    <h3 className="text-4xl font-black text-slate-800 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Articles Tab */}
            {activeTab === "articles" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <p className="text-slate-500 font-bold">
                    特集記事やコラムの管理を行います。
                  </p>
                  <button
                    onClick={() => {
                      setEditingArticle({ type: "column", status: "draft" });
                      setIsArticleModalOpen(true);
                    }}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 flex items-center gap-2 transition active:scale-95"
                  >
                    <Plus size={20} />
                    新規記事作成
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition group"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={article.thumbnail_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase text-white shadow-lg ${
                              article.status === "published"
                                ? "bg-emerald-500"
                                : article.status === "scheduled"
                                  ? "bg-amber-500"
                                  : "bg-slate-500"
                            }`}
                          >
                            {article.status}
                          </span>
                          {article.is_featured && (
                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-rose-500 text-white shadow-lg">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                            {article.category}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            {new Date(
                              article.published_at,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2 line-clamp-2 min-h-[3rem]">
                          {article.title}
                        </h3>
                        <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-50">
                          <button
                            onClick={() => {
                              setEditingArticle(article);
                              setIsArticleModalOpen(true);
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(article.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Tab (Approval) */}
            {activeTab === "content" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
                {/* Employers Panel */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <Briefcase className="text-amber-500" />
                    店舗審査 ({pendingEmployers.length})
                  </h3>
                  <div className="space-y-4">
                    {pendingEmployers.map((emp) => (
                      <div
                        key={emp.id}
                        className="p-4 bg-slate-50 rounded-2xl flex flex-col sm:flex-row justify-between gap-4"
                      >
                        <div>
                          <h4 className="font-bold text-slate-800">
                            {emp.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-bold mt-1">
                            {emp.area_pref} {emp.area_city} |{" "}
                            {emp.business_type}
                          </p>
                        </div>
                        <button
                          onClick={() => handleApproveEmployer(emp.id)}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-200 transition"
                        >
                          承認する
                        </button>
                      </div>
                    ))}
                    {pendingEmployers.length === 0 && (
                      <div className="text-center py-10 text-slate-400 font-bold bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
                        審査待ちはありません
                      </div>
                    )}
                  </div>
                </div>

                {/* Jobs Panel */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <FileText className="text-indigo-500" />
                    求人審査 ({pendingJobs.length})
                  </h3>
                  <div className="space-y-4">
                    {pendingJobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-4 bg-slate-50 rounded-2xl flex flex-col sm:flex-row justify-between gap-4"
                      >
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 line-clamp-1">
                            {job.title}
                          </h4>
                          <p className="text-xs text-indigo-600 font-bold mt-1">
                            {job.employer_name}
                          </p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handleApproveJob(job.id)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-200 transition"
                          >
                            公開
                          </button>
                          <button
                            onClick={() => handleRejectJob(job.id)}
                            className="px-4 py-2 bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 text-xs font-bold rounded-xl transition"
                          >
                            却下
                          </button>
                        </div>
                      </div>
                    ))}
                    {pendingJobs.length === 0 && (
                      <div className="text-center py-10 text-slate-400 font-bold bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
                        審査待ちはありません
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-500">
                <div className="p-6 border-b border-slate-100 flex gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="ユーザー検索..."
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                      <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Joined</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-slate-50/50 transition"
                        >
                          <td className="px-6 py-4 font-bold text-slate-800">
                            {user.display_name}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                                user.role === "admin"
                                  ? "bg-rose-50 text-rose-600"
                                  : user.role === "employer"
                                    ? "bg-amber-50 text-amber-600"
                                    : "bg-indigo-50 text-indigo-600"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-400">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Article Modal */}
      {isArticleModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 max-h-[90vh] overflow-y-auto">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-2xl font-black text-slate-800">
                {editingArticle.id ? "記事を編集" : "新規記事作成"}
              </h2>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-full">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    タイトル
                  </label>
                  <input
                    type="text"
                    required
                    value={editingArticle.title || ""}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-lg focus:border-indigo-500 focus:bg-white outline-none transition"
                    placeholder="記事のタイトルを入力..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    カテゴリー
                  </label>
                  <select
                    value={editingArticle.category || ""}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-indigo-500 focus:bg-white outline-none transition appearance-none cursor-pointer"
                  >
                    <option value="">選択してください</option>
                    <option value="エリア特集">エリア特集</option>
                    <option value="お仕事ガイド">お仕事ガイド</option>
                    <option value="稼ぐテクニック">稼ぐテクニック</option>
                    <option value="自己分析">自己分析</option>
                    <option value="インタビュー">インタビュー</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    タイプ
                  </label>
                  <div className="flex gap-4">
                    <label
                      className={`flex-1 cursor-pointer p-4 rounded-2xl border-2 font-bold text-center transition ${editingArticle.type === "column" ? "border-indigo-500 bg-indigo-50 text-indigo-600" : "border-slate-100 text-slate-400"}`}
                    >
                      <input
                        type="radio"
                        name="type"
                        className="hidden"
                        onClick={() =>
                          setEditingArticle({
                            ...editingArticle,
                            type: "column",
                          })
                        }
                      />
                      コラム
                    </label>
                    <label
                      className={`flex-1 cursor-pointer p-4 rounded-2xl border-2 font-bold text-center transition ${editingArticle.type === "special" ? "border-amber-500 bg-amber-50 text-amber-600" : "border-slate-100 text-slate-400"}`}
                    >
                      <input
                        type="radio"
                        name="type"
                        className="hidden"
                        onClick={() =>
                          setEditingArticle({
                            ...editingArticle,
                            type: "special",
                          })
                        }
                      />
                      特集
                    </label>
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    サムネイル画像URL
                  </label>
                  <input
                    type="text"
                    value={editingArticle.thumbnail_url || ""}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        thumbnail_url: e.target.value,
                      })
                    }
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 focus:border-indigo-500 focus:bg-white outline-none transition"
                    placeholder="https://..."
                  />
                  {editingArticle.thumbnail_url && (
                    <div className="mt-4 h-40 rounded-2xl overflow-hidden bg-slate-100">
                      <img
                        src={editingArticle.thumbnail_url}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="col-span-full">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    本文
                  </label>
                  <textarea
                    rows={10}
                    value={editingArticle.content || ""}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        content: e.target.value,
                      })
                    }
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-medium leading-relaxed focus:border-indigo-500 focus:bg-white outline-none transition resize-none"
                    placeholder="記事の本文を入力..."
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingArticle.is_featured || false}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          is_featured: e.target.checked,
                        })
                      }
                      className="w-5 h-5 accent-indigo-600"
                    />
                    <span className="font-bold text-slate-700">
                      おすすめ記事にする
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition active:scale-95"
                >
                  保存する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
