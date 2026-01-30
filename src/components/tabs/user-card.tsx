"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatNumber } from "@/lib/utils";
import type { User } from "@/lib/supabase/types";

interface UserCardProps {
  user: User & {
    followers_count?: number;
    tabs_count?: number;
  };
  onFollow?: () => void;
  isFollowing?: boolean;
  showFollowButton?: boolean;
  className?: string;
}

export function UserCard({
  user,
  onFollow,
  isFollowing = false,
  showFollowButton = true,
  className,
}: UserCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card hover:border-border transition-colors",
        className
      )}
    >
      <Link href={`/profile/${user.username}`}>
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar_url || undefined} />
          <AvatarFallback>{user.display_name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          href={`/profile/${user.username}`}
          className="font-medium text-sm hover:text-primary transition-colors line-clamp-1"
        >
          {user.display_name}
        </Link>
        <p className="text-xs text-muted-foreground">@{user.username}</p>

        <div className="flex items-center gap-2 mt-1">
          {user.instruments?.slice(0, 2).map((instrument) => (
            <Badge
              key={instrument}
              variant="secondary"
              className="text-[10px] px-1.5 py-0"
            >
              {instrument}
            </Badge>
          ))}
          {user.followers_count !== undefined && (
            <span className="text-[10px] text-muted-foreground">
              {formatNumber(user.followers_count)} フォロワー
            </span>
          )}
        </div>
      </div>

      {showFollowButton && (
        <Button
          variant={isFollowing ? "secondary" : "default"}
          size="sm"
          className={cn(
            "shrink-0",
            !isFollowing && "gradient-primary"
          )}
          onClick={onFollow}
        >
          {isFollowing ? "フォロー中" : "フォロー"}
        </Button>
      )}
    </div>
  );
}

// Compact version for lists
export function UserCardCompact({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  return (
    <Link
      href={`/profile/${user.username}`}
      className={cn(
        "flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors",
        className
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar_url || undefined} />
        <AvatarFallback className="text-xs">
          {user.display_name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="text-sm font-medium line-clamp-1">{user.display_name}</p>
        <p className="text-xs text-muted-foreground">@{user.username}</p>
      </div>
    </Link>
  );
}

// Skeleton
export function UserCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card">
      <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-24" />
        <div className="h-3 bg-muted rounded animate-pulse w-16" />
      </div>
      <div className="h-8 w-20 bg-muted rounded animate-pulse" />
    </div>
  );
}


