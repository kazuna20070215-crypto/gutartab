import Link from "next/link";
import { notFound } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Bookmark,
  Share2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Settings2,
  MessageCircle,
  Edit,
  Music,
  Clock,
  Sparkles,
} from "lucide-react";
import { getTabById, dummyTabs } from "@/lib/dummy-data";
import { formatNumber, getDifficultyColor, getDifficultyLabel, formatDate } from "@/lib/utils";
import { TabCard } from "@/components/tabs/tab-card";

interface TabDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TabDetailPage({ params }: TabDetailPageProps) {
  const { id } = await params;
  const tab = getTabById(id);

  if (!tab) {
    notFound();
  }

  // Related tabs (same genre or artist)
  const relatedTabs = dummyTabs
    .filter((t) => t.id !== tab.id && (t.genre === tab.genre || t.artist_name === tab.artist_name))
    .slice(0, 4);

  return (
    <MainLayout>
      <div className="container max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="secondary"
                  className={getDifficultyColor(tab.difficulty)}
                >
                  {getDifficultyLabel(tab.difficulty)}
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {tab.instrument}
                </Badge>
                {tab.is_ai_generated && (
                  <Badge variant="secondary" className="bg-accent/20 text-accent">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI生成
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{tab.title}</h1>
              <p className="text-lg text-muted-foreground mt-1">
                {tab.artist_name}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Author */}
          <Link
            href={`/profile/${tab.user.username}`}
            className="inline-flex items-center gap-2 mt-4 group"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={tab.user.avatar_url || undefined} />
              <AvatarFallback>{tab.user.display_name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium group-hover:text-primary transition-colors">
                {tab.user.display_name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(tab.created_at)}
              </p>
            </div>
          </Link>
        </div>

        {/* TAB Viewer */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-br from-secondary to-muted p-8 min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <Music className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">TABビューア</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                （実装予定）
              </p>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="border-t border-border p-4">
            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="icon">
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="h-12 w-12 rounded-full gradient-primary"
              >
                <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
              </Button>
              <Button variant="ghost" size="icon">
                <SkipForward className="h-5 w-5" />
              </Button>
              <div className="ml-4 flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">100%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-card border border-border/50">
          <div className="flex items-center gap-6">
            <Button variant="ghost" className="gap-2">
              <Heart className="h-5 w-5" />
              <span>{formatNumber(tab.likes_count)}</span>
            </Button>
            <Button variant="ghost" className="gap-2">
              <Bookmark className="h-5 w-5" />
              <span>{formatNumber(tab.saves_count)}</span>
            </Button>
            <Button variant="ghost" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              <span>12</span>
            </Button>
          </div>

          <Button className="gradient-primary gap-2">
            <Clock className="h-4 w-4" />
            練習ログを作成
          </Button>
        </div>

        {/* Description */}
        {tab.description && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="font-semibold mb-2">説明</h2>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {tab.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Meta Info */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="font-semibold mb-4">詳細情報</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">ジャンル</p>
                <p className="text-sm font-medium">{tab.genre || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">チューニング</p>
                <p className="text-sm font-medium">{tab.tuning}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">楽器</p>
                <p className="text-sm font-medium capitalize">{tab.instrument}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">難易度</p>
                <p className="text-sm font-medium">
                  {getDifficultyLabel(tab.difficulty)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="font-semibold mb-4">コメント</h2>
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">まだコメントはありません</p>
              <Button variant="outline" size="sm" className="mt-4">
                最初のコメントを投稿
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Tabs */}
        {relatedTabs.length > 0 && (
          <section>
            <h2 className="font-semibold mb-4">関連TAB</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTabs.map((relatedTab) => (
                <TabCard key={relatedTab.id} tab={relatedTab} />
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
}

