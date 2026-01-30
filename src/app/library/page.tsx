import Link from "next/link";
import { MainLayout } from "@/components/layout";
import { TabCard } from "@/components/tabs/tab-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Music,
  Bookmark,
  FileEdit,
  Filter,
  SortAsc,
  Plus,
} from "lucide-react";
import { dummyTabs } from "@/lib/dummy-data";

const tabs = [
  { id: "my", label: "自分のTAB", icon: Music, count: 3 },
  { id: "saved", label: "保存したTAB", icon: Bookmark, count: 5 },
  { id: "drafts", label: "下書き", icon: FileEdit, count: 1 },
];

export default function LibraryPage() {
  // Mock data - in real app, this would be filtered by user
  const myTabs = dummyTabs.slice(0, 3);
  const savedTabs = dummyTabs.slice(3, 8);
  const draftTabs = dummyTabs.slice(0, 1);

  const currentTab = "my";
  const currentTabs = myTabs;

  return (
    <MainLayout>
      <div className="container max-w-6xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">ライブラリ</h1>
            <p className="text-sm text-muted-foreground mt-1">
              あなたのTABコレクション
            </p>
          </div>
          <Button className="gradient-primary gap-2" asChild>
            <Link href="/tabs/new">
              <Plus className="h-4 w-4" />
              TABを作成
            </Link>
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                currentTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>
              <Badge
                variant={currentTab === tab.id ? "secondary" : "outline"}
                className="ml-1"
              >
                {tab.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ライブラリ内を検索..."
              className="pl-10 bg-secondary/50 border-0"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <SortAsc className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        {currentTabs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentTabs.map((tab, index) => (
              <TabCard
                key={tab.id}
                tab={tab}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <Music className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="font-semibold mb-2">TABがありません</h3>
              <p className="text-sm text-muted-foreground mb-6">
                TABを作成するか、他のユーザーのTABを保存しましょう
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button className="gradient-primary" asChild>
                  <Link href="/tabs/new">TABを作成</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/explore">TABを探す</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}


