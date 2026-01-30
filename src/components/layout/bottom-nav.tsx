"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Library, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "ホーム" },
  { href: "/explore", icon: Compass, label: "探索" },
  { href: "/tabs/new", icon: Plus, label: "作成", isCreate: true },
  { href: "/library", icon: Library, label: "ライブラリ" },
];

export function BottomNav() {
  const pathname = usePathname();

  // Demo mode - hardcoded user
  const items = [
    ...navItems,
    {
      href: "/profile/guitar_master",
      icon: User,
      label: "プロフィール",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/40 bg-background/80 backdrop-blur-xl safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          if (item.isCreate) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-4"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full gradient-primary shadow-lg shadow-primary/25">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon
                className={cn("h-5 w-5", isActive && "fill-primary/20")}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

