import Link from "next/link";
import { MainLayout } from "@/components/layout";
import { TabCard } from "@/components/tabs/tab-card";
import { UserCard } from "@/components/tabs/user-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Clock, Sparkles } from "lucide-react";
import { getTrendingTabs, getRecentTabs, dummyUsers } from "@/lib/dummy-data";

const genres = [
  "すべて",
  "Rock",
  "Metal",
  "J-Pop",
  "Jazz",
  "Blues",
  "Funk",
  "Classical",
];

const difficulties = [
  { value: "all", label: "すべて" },
  { value: "beginner", label: "初級" },
  { value: "intermediate", label: "中級" },
  { value: "advanced", label: "上級" },
];

export default function ExplorePage() {
  const trendingTabs = getTrendingTabs().slice(0, 4);
  const recentTabs = getRecentTabs().slice(0, 4);
  const recommendedUsers = dummyUsers.slice(0, 3);

  return (
    <MainLayout>
      <div className="container max-w-6xl px-4 py-6">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">探索</h1>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="TAB、アーティスト、ユーザーを検索..."
              className="pl-11 h-12 text-base bg-secondary/50 border-0"
            />
          </div>
        </div>

        {/* Genre Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {genres.map((genre) => (
              <Badge
                key={genre}
                variant={genre === "すべて" ? "default" : "secondary"}
                className="cursor-pointer whitespace-nowrap px-4 py-1.5 text-sm hover:bg-primary/80"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        {/* Trending Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">トレンド</h2>
            </div>
            <Link href="/explore/trending">
              <Button variant="ghost" size="sm">
                すべて見る
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-stagger">
            {trendingTabs.map((tab) => (
              <TabCard
                key={tab.id}
                tab={tab}
              />
            ))}
          </div>
        </section>

        {/* Recent Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">新着</h2>
            </div>
            <Link href="/explore/recent">
              <Button variant="ghost" size="sm">
                すべて見る
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-stagger">
            {recentTabs.map((tab) => (
              <TabCard
                key={tab.id}
                tab={tab}
              />
            ))}
          </div>
        </section>

        {/* AI Generated Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold">AI生成TAB</h2>
            </div>
            <Link href="/explore/ai">
              <Button variant="ghost" size="sm">
                すべて見る
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-stagger">
            {trendingTabs
              .filter((tab) => tab.is_ai_generated)
              .slice(0, 4)
              .map((tab) => (
                <TabCard
                  key={tab.id}
                  tab={tab}
                />
              ))}
          </div>
        </section>

        {/* Recommended Users */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">おすすめユーザー</h2>
            <Link href="/explore/users">
              <Button variant="ghost" size="sm">
                すべて見る
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-stagger">
            {recommendedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
              />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

