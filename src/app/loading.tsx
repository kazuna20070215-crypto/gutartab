import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
          <Sparkles className="relative h-12 w-12 text-primary mx-auto animate-pulse" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground animate-pulse">
          読み込み中...
        </p>
      </div>
    </div>
  );
}


