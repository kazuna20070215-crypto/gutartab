"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Bookmark, Play, Guitar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatNumber, getDifficultyColor, getDifficultyLabel, formatDate } from "@/lib/utils";
import type { TabWithUser } from "@/lib/supabase/types";

interface TabCardProps {
  tab: TabWithUser;
  onLike?: () => void;
  onSave?: () => void;
  isLiked?: boolean;
  isSaved?: boolean;
  className?: string;
}

export function TabCard({
  tab,
  onLike,
  onSave,
  isLiked = false,
  isSaved = false,
  className,
}: TabCardProps) {
  return (
    <article
      className={cn(
        "group relative rounded-xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      {/* Thumbnail */}
      <Link href={`/tabs/${tab.id}`} className="block relative aspect-video">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent" />
        {tab.thumbnail_url ? (
          <Image
            src={tab.thumbnail_url}
            alt={tab.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <Guitar className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
          <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
            <Play className="h-6 w-6 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          <Badge
            variant="secondary"
            className={cn("text-[10px]", getDifficultyColor(tab.difficulty))}
          >
            {getDifficultyLabel(tab.difficulty)}
          </Badge>
          {tab.is_ai_generated && (
            <Badge variant="secondary" className="text-[10px] bg-accent/20 text-accent">
              AI生成
            </Badge>
          )}
        </div>

        {/* Instrument badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="text-[10px] capitalize">
            {tab.instrument}
          </Badge>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Title & Artist */}
        <Link href={`/tabs/${tab.id}`} className="block">
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {tab.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {tab.artist_name}
          </p>
        </Link>

        {/* User & Stats */}
        <div className="flex items-center justify-between mt-3">
          <Link
            href={`/profile/${tab.user.username}`}
            className="flex items-center gap-2 group/user"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={tab.user.avatar_url || undefined} />
              <AvatarFallback className="text-[10px]">
                {tab.user.display_name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground group-hover/user:text-foreground transition-colors">
              {tab.user.display_name}
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                onLike?.();
              }}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isLiked ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
                )}
              />
            </Button>
            <span className="text-xs text-muted-foreground min-w-[1.5rem]">
              {formatNumber(tab.likes_count)}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                onSave?.();
              }}
            >
              <Bookmark
                className={cn(
                  "h-4 w-4 transition-colors",
                  isSaved ? "fill-primary text-primary" : "text-muted-foreground"
                )}
              />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

// Skeleton for loading state
export function TabCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      <div className="aspect-video bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
            <div className="h-3 bg-muted rounded animate-pulse w-16" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-4 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}


