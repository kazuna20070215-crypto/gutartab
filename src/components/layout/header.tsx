"use client";

import Link from "next/link";
import { Search, Bell, Plus, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Demo mode - Clerk disabled
const isLoggedIn = true; // Set to false to show login buttons

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-colors" />
            <Sparkles className="relative h-7 w-7 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline-block">
            TAB GENIE
          </span>
        </Link>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="TAB、アーティスト、ユーザーを検索..."
              className="pl-10 bg-secondary/50 border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            asChild
          >
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          {isLoggedIn ? (
            <>
              {/* Create Button */}
              <Button
                size="sm"
                className="gap-2 gradient-primary text-primary-foreground font-semibold"
                asChild
              >
                <Link href="/tabs/new">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">作成</span>
                </Link>
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/notifications">
                  <Bell className="h-5 w-5" />
                  {/* Notification badge */}
                  <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
                </Link>
              </Button>

              {/* User Menu - Demo */}
              <Link href="/profile/guitar_master">
                <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">ログイン</Link>
              </Button>
              <Button size="sm" className="gradient-primary" asChild>
                <Link href="/sign-up">新規登録</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

