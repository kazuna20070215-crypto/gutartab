"use client";

import Link from "next/link";
import { Heart, MessageCircle, Clock, Music } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, formatNumber, formatDate } from "@/lib/utils";
import type { PracticeLogWithUser } from "@/lib/supabase/types";

interface PracticeLogCardProps {
  log: PracticeLogWithUser;
  onLike?: () => void;
  isLiked?: boolean;
  className?: string;
}

export function PracticeLogCard({
  log,
  onLike,
  isLiked = false,
  className,
}: PracticeLogCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-border/50 bg-card p-4 transition-all duration-200 hover:border-border",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <Link href={`/profile/${log.user.username}`}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={log.user.avatar_url || undefined} />
            <AvatarFallback>
              {log.user.display_name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${log.user.username}`}
              className="font-medium text-sm hover:text-primary transition-colors"
            >
              {log.user.display_name}
            </Link>
            <span className="text-xs text-muted-foreground">
              {formatDate(log.created_at)}
            </span>
          </div>

          {/* Practice duration */}
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{log.practice_duration}分練習</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3">
        <p className="text-sm whitespace-pre-wrap">{log.content}</p>
      </div>

      {/* Linked Tab */}
      {log.tab && (
        <Link
          href={`/tabs/${log.tab.id}`}
          className="mt-3 flex items-center gap-2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
        >
          <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
            <Music className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium line-clamp-1">{log.tab.title}</p>
            <p className="text-[10px] text-muted-foreground line-clamp-1">
              {log.tab.artist_name}
            </p>
          </div>
        </Link>
      )}

      {/* Media */}
      {log.media_url && (
        <div className="mt-3 rounded-lg overflow-hidden bg-muted aspect-video">
          <video
            src={log.media_url}
            controls
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/50">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 h-8 px-2"
          onClick={onLike}
        >
          <Heart
            className={cn(
              "h-4 w-4",
              isLiked ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
            )}
          />
          <span className="text-xs text-muted-foreground">
            {formatNumber(log.likes_count)}
          </span>
        </Button>

        <Link href={`/practice/${log.id}`}>
          <Button variant="ghost" size="sm" className="gap-1.5 h-8 px-2">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">コメント</span>
          </Button>
        </Link>
      </div>
    </article>
  );
}

// Skeleton for loading state
export function PracticeLogCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-24" />
          <div className="h-3 bg-muted rounded animate-pulse w-16" />
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-full" />
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
      </div>
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/50">
        <div className="h-8 w-16 bg-muted rounded animate-pulse" />
        <div className="h-8 w-20 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}


