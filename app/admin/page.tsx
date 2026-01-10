"use client";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "@/pages/AdminDashboard";

export default function Admin() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return (
      <div className="p-20 text-center text-gray-400">権限がありません。</div>
    );
  }

  return <AdminDashboard />;
}
