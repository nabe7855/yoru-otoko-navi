"use client";
import { useAuth } from "@/context/AuthContext";
import MyProfilePage from "@/pages/MyProfilePage";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user)
    return (
      <div className="p-20 text-center text-gray-400">ログインが必要です。</div>
    );

  return <MyProfilePage userId={user.id} onSave={() => router.push("/")} />;
}
