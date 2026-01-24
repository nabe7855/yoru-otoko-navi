"use client";

import { HelpCircle, Home, Search, Star, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "ホーム", href: "/", icon: Home },
    { label: "求人探す", href: "/jobs", icon: Search },
    { label: "30秒診断", href: "/matcher", icon: Star },
    { label: "FAQ", href: "/faq", icon: HelpCircle },
    { label: "マイページ", href: "/profile", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 h-16 flex items-center justify-around px-2 z-[55] shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400"}`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-black uppercase tracking-tighter">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
