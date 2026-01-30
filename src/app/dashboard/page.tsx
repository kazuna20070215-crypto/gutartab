import { MainLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Music,
  Heart,
  Bookmark,
  Clock,
  TrendingUp,
  Calendar,
  Target,
  Award,
} from "lucide-react";

// Mock stats data
const stats = [
  {
    label: "投稿TAB",
    value: "12",
    change: "+2",
    icon: Music,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "獲得いいね",
    value: "1,234",
    change: "+156",
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    label: "保存された数",
    value: "567",
    change: "+43",
    icon: Bookmark,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    label: "総練習時間",
    value: "48h",
    change: "+5h",
    icon: Clock,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
];

// Mock weekly practice data
const weeklyPractice = [
  { day: "月", minutes: 45 },
  { day: "火", minutes: 30 },
  { day: "水", minutes: 60 },
  { day: "木", minutes: 0 },
  { day: "金", minutes: 90 },
  { day: "土", minutes: 120 },
  { day: "日", minutes: 75 },
];

const maxMinutes = Math.max(...weeklyPractice.map((d) => d.minutes));

// Mock achievements
const achievements = [
  { label: "初投稿", description: "最初のTABを投稿", completed: true },
  { label: "人気者", description: "100いいねを獲得", completed: true },
  { label: "継続は力", description: "7日連続で練習", completed: false },
  { label: "AI使い", description: "AI TABを10回生成", completed: false },
];

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="container max-w-6xl px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">ダッシュボード</h1>
          <p className="text-sm text-muted-foreground mt-1">
            あなたのアクティビティと統計
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-emerald-500 mt-1">
                      {stat.change} 今月
                    </p>
                  </div>
                  <div className={`h-12 w-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Practice Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                今週の練習時間
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-40 gap-2">
                {weeklyPractice.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-secondary rounded-t-lg relative" style={{ height: "120px" }}>
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all duration-500"
                        style={{
                          height: `${(day.minutes / maxMinutes) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                    <span className="text-xs font-medium">{day.minutes}分</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">今週の合計</p>
                  <p className="text-xl font-bold">
                    {weeklyPractice.reduce((acc, d) => acc + d.minutes, 0)}分
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  詳細を見る
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                実績
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.label}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      achievement.completed
                        ? "bg-amber-500/10"
                        : "bg-secondary/50"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        achievement.completed
                          ? "bg-amber-500 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {achievement.completed ? (
                        <Award className="h-4 w-4" />
                      ) : (
                        <Target className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{achievement.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Practice Calendar */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              練習カレンダー
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>練習カレンダーは近日公開予定</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}


