"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Library,
  User,
  Settings,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { href: "/", icon: Home, label: "ホーム" },
  { href: "/explore", icon: Compass, label: "探索" },
  { href: "/library", icon: Library, label: "ライブラリ" },
  { href: "/dashboard", icon: TrendingUp, label: "ダッシュボード" },
];

const secondaryNavItems = [
  { href: "/settings", icon: Settings, label: "設定" },
];

export function Sidebar() {
  const pathname = usePathname();
  // Demo mode - hardcoded user
  const user = { username: "guitar_master" };

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border/40 bg-background/50 h-[calc(100vh-4rem)] sticky top-16">
      <nav className="flex-1 p-4 space-y-1">
        {mainNavItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* AI TAB生成 - 特別なスタイル */}
        <Link
          href="/tabs/new?mode=ai"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mt-4",
            "bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20",
            "border border-primary/20"
          )}
        >
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-medium">AI TAB生成</span>
        </Link>

        {/* Profile Link */}
        {user && (
          <Link
            href={`/profile/${user.username || user.id}`}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mt-4",
              pathname.includes("/profile")
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <User className="h-5 w-5" />
            <span>プロフィール</span>
          </Link>
        )}
      </nav>

      {/* Secondary Nav */}
      <div className="p-4 border-t border-border/40">
        {secondaryNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

