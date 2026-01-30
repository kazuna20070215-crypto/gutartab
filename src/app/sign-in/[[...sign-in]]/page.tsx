import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles, Guitar, Music, Users } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-accent/10 to-background p-12 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl">TAB GENIE</span>
          </Link>
        </div>

        <div className="space-y-8">
          <h1 className="text-4xl font-bold leading-tight">
            ギター・ベースの
            <br />
            <span className="text-primary">TAB譜</span>を
            <br />
            みんなで共有
          </h1>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">AI TAB生成</p>
                <p className="text-sm text-muted-foreground">
                  曲名を入力するだけでTABを自動生成
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Guitar className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-medium">TAB共有</p>
                <p className="text-sm text-muted-foreground">
                  作成したTABを世界中のプレイヤーと共有
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Music className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="font-medium">練習ログ</p>
                <p className="text-sm text-muted-foreground">
                  練習の記録を残してモチベーションアップ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="font-medium">コミュニティ</p>
                <p className="text-sm text-muted-foreground">
                  同じ曲を練習する仲間とつながる
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2024 TAB GENIE SOCIAL. All rights reserved.
        </p>
      </div>

      {/* Right side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl">TAB GENIE</span>
            </Link>
          </div>

          <SignIn
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


