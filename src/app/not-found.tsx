import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <Sparkles className="relative h-20 w-20 text-primary mx-auto" />
        </div>

        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-4">ページが見つかりません</h2>
        <p className="text-muted-foreground mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>

        <div className="flex items-center justify-center gap-4">
          <Button className="gradient-primary gap-2" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              ホームへ
            </Link>
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/explore">
              <Search className="h-4 w-4" />
              TABを探す
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


