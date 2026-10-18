// src/pages/shop/ThemePicker.tsx
import { Check } from "lucide-react";
import { THEME_LIST, ThemeId } from "./ShopTheme";

interface Props {
  value: ThemeId;
  onChange: (id: ThemeId) => void;
}

export default function ThemePicker({ value, onChange }: Props) {
  return (
    <div>
      <label className="block font-bold text-sm mb-2">Page design</label>
      <div className="grid grid-cols-2 gap-3">
        {THEME_LIST.map((t) => {
          const selected = t.id === value;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              aria-pressed={selected}
              className={`relative text-left rounded-2xl border-2 p-3 transition focus:outline-none focus:ring-2 focus:ring-black ${
                selected ? "border-black" : "border-black/10 hover:border-black/30"
              }`}
            >
              {/* mini preview built from the theme's own colours */}
              <div
                className="h-20 rounded-xl overflow-hidden flex items-end p-2 gap-1.5"
                style={{ background: t.colors.heroBg }}
              >
                <span className="h-2 w-10 rounded-full" style={{ background: t.colors.accent }} />
                <span className="h-2 w-6 rounded-full opacity-60" style={{ background: t.colors.heroInk }} />
                <span
                  className="ml-auto h-12 w-9"
                  style={{
                    background: t.colors.page,
                    borderRadius: t.hero === "arch" ? "999px 999px 4px 4px" : t.hero === "centered" ? "999px" : "6px",
                    transform: t.hero === "slant" ? "skewX(-10deg)" : undefined,
                  }}
                />
              </div>
              <p className="font-black text-sm mt-2">{t.label}</p>
              <p className="text-xs text-gray-500 leading-snug">{t.blurb}</p>
              {selected && (
                <span className="absolute top-2 right-2 bg-black text-white rounded-full p-1">
                  <Check size={12} />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-400 mt-1">
        Controls colours, fonts and layout of the public shop page. You can change it later.
      </p>
    </div>
  );
}