"use client";
import { useAuth } from "@/context/AuthContext";
import EmployerDashboard from "@/pages/EmployerDashboard";
import { jobService } from "@/services/jobService";
import type { Employer } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Employer() {
  const { user } = useAuth();
  const router = useRouter();
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployer = async () => {
      if (!user || user.role !== "employer") {
        setLoading(false);
        return;
      }
      setLoading(true);
      const employers = await jobService.getEmployers();
      const emp = employers.find((e) => e.owner_user_id === user.id);
      setEmployer(emp || null);
      setLoading(false);
    };
    fetchEmployer();
  }, [user]);

  const [isRegistering, setIsRegistering] = useState(false);
  const [newStore, setNewStore] = useState({
    name: "",
    business_type: "",
    area_pref: "",
    area_city: "",
    contact_email: user?.email || "",
    contact_phone: "",
  });

  const [prevUserEmail, setPrevUserEmail] = useState(user?.email);
  if (user?.email && user.email !== prevUserEmail) {
    setPrevUserEmail(user.email);
    if (!newStore.contact_email) {
      setNewStore((prev) => ({ ...prev, contact_email: user.email }));
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsRegistering(true);
    const result = await jobService.createEmployer({
      ...newStore,
      owner_user_id: user.id,
    });
    if (result) {
      setEmployer(result);
    } else {
      alert("登録に失敗しました。");
    }
    setIsRegistering(false);
  };

  if (!user || user.role !== "employer") {
    return (
      <div className="p-20 text-center text-gray-400">権限がありません。</div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return employer ? (
    <EmployerDashboard
      employer={employer}
      onPostJob={() => router.push("/employer/post")}
    />
  ) : (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-black mb-4 text-gray-900 text-center">
          店舗登録
        </h2>
        <p className="text-gray-500 text-center mb-10">
          求人を投稿するために、まずは店舗情報を登録しましょう。
        </p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
              店舗名
            </label>
            <input
              type="text"
              required
              value={newStore.name}
              onChange={(e) =>
                setNewStore({ ...newStore, name: e.target.value })
              }
              className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition font-bold"
              placeholder="店舗名を入力"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
              業態
            </label>
            <input
              type="text"
              required
              value={newStore.business_type}
              onChange={(e) =>
                setNewStore({ ...newStore, business_type: e.target.value })
              }
              className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition font-bold"
              placeholder="例: キャバクラ、ラウンジ等"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                都道府県
              </label>
              <input
                type="text"
                required
                value={newStore.area_pref}
                onChange={(e) =>
                  setNewStore({ ...newStore, area_pref: e.target.value })
                }
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition font-bold"
                placeholder="東京都"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                市区町村
              </label>
              <input
                type="text"
                required
                value={newStore.area_city}
                onChange={(e) =>
                  setNewStore({ ...newStore, area_city: e.target.value })
                }
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition font-bold"
                placeholder="新宿区歌舞伎町"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                連絡用メール
              </label>
              <input
                type="email"
                required
                value={newStore.contact_email}
                onChange={(e) =>
                  setNewStore({ ...newStore, contact_email: e.target.value })
                }
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                電話番号
              </label>
              <input
                type="text"
                required
                value={newStore.contact_phone}
                onChange={(e) =>
                  setNewStore({ ...newStore, contact_phone: e.target.value })
                }
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition font-bold"
                placeholder="03-xxxx-xxxx"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isRegistering}
            className={`w-full py-5 rounded-2xl font-black transition shadow-lg shadow-indigo-100 ${
              isRegistering
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
            }`}
          >
            {isRegistering ? "登録中..." : "店舗情報を登録して開始する"}
          </button>
        </form>
      </div>
    </div>
  );
}
