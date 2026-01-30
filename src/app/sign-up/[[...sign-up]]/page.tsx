import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles, Guitar, Music, Users } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent/20 via-primary/10 to-background p-12 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl">TAB GENIE</span>
          </Link>
        </div>

        <div className="space-y-8">
          <h1 className="text-4xl font-bold leading-tight">
            今すぐ始めよう
            <br />
            <span className="text-accent">無料</span>で
            <br />
            TABを作成・共有
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card/50 border border-border/50">
              <p className="text-3xl font-bold text-primary">10,000+</p>
              <p className="text-sm text-muted-foreground">TAB譜</p>
            </div>
            <div className="p-4 rounded-xl bg-card/50 border border-border/50">
              <p className="text-3xl font-bold text-accent">5,000+</p>
              <p className="text-sm text-muted-foreground">ユーザー</p>
            </div>
            <div className="p-4 rounded-xl bg-card/50 border border-border/50">
              <p className="text-3xl font-bold text-emerald-500">1,000+</p>
              <p className="text-sm text-muted-foreground">AI生成TAB</p>
            </div>
            <div className="p-4 rounded-xl bg-card/50 border border-border/50">
              <p className="text-3xl font-bold text-amber-500">50,000+</p>
              <p className="text-sm text-muted-foreground">練習ログ</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="font-medium mb-1">🎸 無料プランでできること</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• TABの閲覧・保存 無制限</li>
              <li>• TABの作成・投稿 無制限</li>
              <li>• AI TAB生成 月3回</li>
              <li>• 練習ログの投稿 無制限</li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2024 TAB GENIE SOCIAL. All rights reserved.
        </p>
      </div>

      {/* Right side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl">TAB GENIE</span>
            </Link>
          </div>

          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-card border border-border shadow-xl",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                socialButtonsBlockButton:
                  "bg-secondary border-border hover:bg-secondary/80",
                socialButtonsBlockButtonText: "text-foreground",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground",
                formFieldLabel: "text-foreground",
                formFieldInput:
                  "bg-background border-input text-foreground focus:ring-primary",
                formButtonPrimary:
                  "bg-primary hover:bg-primary/90 text-primary-foreground",
                footerActionLink: "text-primary hover:text-primary/80",
                identityPreviewText: "text-foreground",
                identityPreviewEditButton: "text-primary",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}


