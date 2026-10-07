import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Вход в админку — Avicenna" },
      {
        name: "description",
        content: "Вход для администраторов сайта медицинского центра Avicenna.",
      },
      { property: "og:title", content: "Вход в админку — Avicenna" },
      {
        property: "og:description",
        content: "Авторизация администратора медицинского центра Avicenna.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const login = email.trim();
    const fullEmail = login.includes("@") ? login : `${login}@avicenna.kg`;
    const result = await supabase.auth.signInWithPassword({ email: fullEmail, password });
    setLoading(false);
    if (result.error) {
      toast.error("Неверный логин или пароль");
      return;
    }
    navigate({ to: "/admin" });
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-5">
      <Toaster />
      <div className="border-border w-full max-w-sm rounded-2xl border p-8">
        <h1 className="text-foreground text-2xl font-semibold">Вход администратора</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Управление слайдами Hero-баннера
        </p>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Логин</Label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <Button
            className="bg-brand-green text-brand-white w-full hover:brightness-110"
            disabled={loading}
            onClick={() => submit()}
          >
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
}
