import type { TrustItem } from "@/app/content/landing/price-section-types";
import { Icon } from "@/app/components/Icon";

interface TrustBarProps {
  items: TrustItem[];
  title: string;
}

export function TrustBar({ items, title }: TrustBarProps) {
  const colCount = items.length;
  return (
    <div className="bg-card border border-border rounded-2xl px-8 py-7 mb-14 shadow-sm flex flex-col items-center">
      <p className="text-center text-xs font-bold text-muted-foreground tracking-widest uppercase mb-5">{title}</p>
      <div
        className="w-full grid gap-2.5 grid-cols-[repeat(var(--trust-cols),minmax(0,1fr))] max-sm:grid-cols-2"
        style={{ "--trust-cols": colCount } as React.CSSProperties}
      >
        {items.map(({ icon, label }, i) => (
          <div key={`${label}-${i}`} className="flex flex-col items-center justify-center gap-1.5 py-4 px-3 min-w-0 bg-muted border border-border rounded-2xl text-center text-xs font-bold text-muted-foreground">
            <Icon emoji={icon} className="w-6 h-6 mb-1" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
