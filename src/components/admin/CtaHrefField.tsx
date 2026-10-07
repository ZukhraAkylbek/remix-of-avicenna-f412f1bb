import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { SITE_PAGES } from "@/lib/site-pages";

type Props = {
  value: string;
  onSave?: (v: string) => void;
  onChange?: (v: string) => void;
  id?: string;
};

/** Ссылка: выбор страницы сайта или своя ссылка. */
export function CtaHrefField({ value, onSave, onChange, id }: Props) {
  const [text, setText] = useState(value);
  useEffect(() => setText(value), [value]);
  const known = SITE_PAGES.some(([href]) => href === text);
  const set = (v: string) => {
    setText(v);
    onChange?.(v);
  };
  return (
    <div className="flex gap-2">
      <select
        aria-label="Страница сайта"
        className="border-input bg-background h-9 rounded-md border px-2 text-sm"
        value={known ? text : ""}
        onChange={(e) => {
          if (!e.target.value) return;
          set(e.target.value);
          onSave?.(e.target.value);
        }}
      >
        <option value="">Своя ссылка…</option>
        {SITE_PAGES.map(([href, label]) => (
          <option key={href} value={href}>
            {label}
          </option>
        ))}
      </select>
      <Input
        id={id}
        value={text}
        placeholder="Ссылка"
        onChange={(e) => set(e.target.value)}
        onBlur={() => onSave?.(text.trim())}
      />
    </div>
  );
}
