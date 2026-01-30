import Link from "next/link";
import { notFound } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TabCard } from "@/components/tabs/tab-card";
import { PracticeLogCard } from "@/components/tabs/practice-log-card";
import {
  Settings,
  Share2,
  Calendar,
  Music,
  FileText,
  Heart,
  Users,
} from "lucide-react";
import {
  getUserByUsername,
  getTabsByUserId,
  getPracticeLogsByUserId,
  dummyUsers,
} from "@/lib/dummy-data";
import { formatNumber, formatDate } from "@/lib/utils";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const userTabs = getTabsByUserId(user.id);
  const userLogs = getPracticeLogsByUserId(user.id);

  // Mock stats
  const stats = {
    tabs: userTabs.length,
    followers: 1234,
    following: 567,
    totalLikes: userTabs.reduce((acc, tab) => acc + tab.likes_count, 0),
  };

  return (
    <MainLayout>
      <div className="container max-w-4xl px-4 py-6">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Cover gradient */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-xl -z-10" />

          <div className="pt-16 flex flex-col md:flex-row items-start md:items-end gap-4">
            {/* Avatar */}
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-xl">
              <AvatarImage src={user.avatar_url || undefined} />
              <AvatarFallback className="text-2xl">
                {user.display_name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{user.display_name}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button className="gradient-primary">フォロー</Button>
                </div>
              </div>

              {/* Instruments */}
              <div className="flex items-center gap-2 mt-3">
                {user.instruments?.map((instrument) => (
                  <Badge key={instrument} variant="secondary" className="capitalize">
                    {instrument}
                  </Badge>
                ))}
                <Badge variant="outline" className="capitalize">
                  {user.plan}
                </Badge>
              </div>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="mt-4 text-sm text-muted-foreground max-w-xl">
              {user.bio}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 mt-4">
            <div className="text-center">
              <p className="font-bold">{formatNumber(stats.tabs)}</p>
              <p className="text-xs text-muted-foreground">TAB</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{formatNumber(stats.followers)}</p>
              <p className="text-xs text-muted-foreground">フォロワー</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{formatNumber(stats.following)}</p>
              <p className="text-xs text-muted-foreground">フォロー中</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{formatNumber(stats.totalLikes)}</p>
              <p className="text-xs text-muted-foreground">いいね</p>
            </div>
          </div>

          {/* Join date */}
          <div className="flex items-center gap-1 mt-4 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(user.created_at)} に参加</span>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center gap-1 border-b border-border mb-6">
          <button className="px-4 py-3 text-sm font-medium border-b-2 border-primary text-primary">
            <Music className="h-4 w-4 inline mr-2" />
            TAB ({userTabs.length})
          </button>
          <button className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
            <FileText className="h-4 w-4 inline mr-2" />
            練習ログ ({userLogs.length})
          </button>
          <button className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
            <Heart className="h-4 w-4 inline mr-2" />
            いいね
          </button>
        </div>

        {/* User's Tabs */}
        <section>
          {userTabs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userTabs.map((tab) => (
                <TabCard key={tab.id} tab={tab} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Music className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  まだTABを投稿していません
                </p>
                <Button className="mt-4 gradient-primary" asChild>
                  <Link href="/tabs/new">最初のTABを作成</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </MainLayout>
  );
}

