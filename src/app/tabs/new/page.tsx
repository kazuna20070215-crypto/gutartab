"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Music,
  Upload,
  Wand2,
  Guitar,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const difficulties = [
  { value: "beginner", label: "初級", description: "基本コード・簡単なリフ" },
  { value: "intermediate", label: "中級", description: "バレーコード・ソロ" },
  { value: "advanced", label: "上級", description: "速弾き・複雑なテクニック" },
];

const instruments = [
  { value: "guitar", label: "ギター", icon: Guitar },
  { value: "bass", label: "ベース", icon: Music },
];

export default function NewTabPage() {
  const searchParams = useSearchParams();
  const isAIMode = searchParams.get("mode") === "ai";

  const [mode, setMode] = useState<"manual" | "ai">(isAIMode ? "ai" : "manual");
  const [selectedDifficulty, setSelectedDifficulty] = useState("intermediate");
  const [selectedInstrument, setSelectedInstrument] = useState("guitar");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="container max-w-3xl px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">TABを作成</h1>
          <p className="text-sm text-muted-foreground mt-1">
            手動で作成するか、AIに生成してもらいましょう
          </p>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setMode("manual")}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all",
              mode === "manual"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-border/80"
            )}
          >
            <Music className="h-8 w-8 mb-2 text-primary" />
            <h3 className="font-semibold">手動で作成</h3>
            <p className="text-sm text-muted-foreground mt-1">
              エディタを使って自分でTABを入力
            </p>
          </button>

          <button
            onClick={() => setMode("ai")}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden",
              mode === "ai"
                ? "border-accent bg-accent/5"
                : "border-border hover:border-border/80"
            )}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full" />
            <Sparkles className="h-8 w-8 mb-2 text-accent" />
            <h3 className="font-semibold">AI生成</h3>
            <p className="text-sm text-muted-foreground mt-1">
              曲名を入力してAIにTABを生成
            </p>
          </button>
        </div>

        {/* Manual Mode */}
        {mode === "manual" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">TAB情報を入力</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    曲名 *
                  </label>
                  <Input placeholder="例: Smoke on the Water" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    アーティスト名 *
                  </label>
                  <Input placeholder="例: Deep Purple" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">楽器</label>
                <div className="flex gap-2">
                  {instruments.map((inst) => (
                    <Button
                      key={inst.value}
                      variant={
                        selectedInstrument === inst.value ? "default" : "outline"
                      }
                      onClick={() => setSelectedInstrument(inst.value)}
                      className="gap-2"
                    >
                      <inst.icon className="h-4 w-4" />
                      {inst.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">難易度</label>
                <div className="grid grid-cols-3 gap-2">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.value}
                      onClick={() => setSelectedDifficulty(diff.value)}
                      className={cn(
                        "p-3 rounded-lg border text-left transition-all",
                        selectedDifficulty === diff.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-border/80"
                      )}
                    >
                      <p className="font-medium text-sm">{diff.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {diff.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">説明</label>
                <textarea
                  className="w-full h-24 px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="TABの説明やポイントを入力..."
                />
              </div>

              <Button className="w-full gradient-primary" size="lg">
                エディタを開く
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* AI Mode */}
        {mode === "ai" && (
          <Card className="border-accent/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                AI TAB生成
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  曲名を入力 *
                </label>
                <Input
                  placeholder="例: Hotel California - Eagles"
                  className="text-lg h-12"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  曲名とアーティスト名を入力すると、より正確なTABが生成されます
                </p>
              </div>

              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-2">または</p>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  音源をアップロード
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  MP3, WAV, M4A（最大10MB）
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">楽器</label>
                <div className="flex gap-2">
                  {instruments.map((inst) => (
                    <Button
                      key={inst.value}
                      variant={
                        selectedInstrument === inst.value ? "default" : "outline"
                      }
                      onClick={() => setSelectedInstrument(inst.value)}
                      className="gap-2"
                    >
                      <inst.icon className="h-4 w-4" />
                      {inst.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  希望の難易度
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.value}
                      onClick={() => setSelectedDifficulty(diff.value)}
                      className={cn(
                        "p-3 rounded-lg border text-left transition-all",
                        selectedDifficulty === diff.value
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-border/80"
                      )}
                    >
                      <p className="font-medium text-sm">{diff.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {diff.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    TABを生成
                  </>
                )}
              </Button>

              <div className="text-center">
                <Badge variant="secondary" className="text-xs">
                  無料プラン: 残り3回/月
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}


