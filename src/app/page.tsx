import { MainLayout } from "@/components/layout";
import { TabCard } from "@/components/tabs/tab-card";
import { PracticeLogCard } from "@/components/tabs/practice-log-card";
import { getTimelinePosts, dummyTabs, dummyPracticeLogs } from "@/lib/dummy-data";
import type { TabWithUser, PracticeLogWithUser } from "@/lib/supabase/types";

function isTab(post: TabWithUser | PracticeLogWithUser): post is TabWithUser {
  return "title" in post && "artist_name" in post;
}

export default function HomePage() {
  const timelinePosts = getTimelinePosts();

  return (
    <MainLayout>
      <div className="container max-w-2xl px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">ホーム</h1>
          <p className="text-sm text-muted-foreground mt-1">
            フォロー中のユーザーの最新投稿
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-4 animate-stagger">
          {timelinePosts.map((post) => {
            if (isTab(post)) {
              return (
                <TabCard
                  key={`tab-${post.id}`}
                  tab={post}
                  className="animate-fade-in"
                />
              );
            } else {
              return (
                <PracticeLogCard
                  key={`log-${post.id}`}
                  log={post as PracticeLogWithUser}
                  className="animate-fade-in"
                />
              );
            }
          })}
        </div>

        {/* Empty State */}
        {timelinePosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              まだ投稿がありません。
              <br />
              ユーザーをフォローして最新のTABをチェックしましょう！
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}


