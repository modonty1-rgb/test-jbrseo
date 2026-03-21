type FinalCTASeatsBarProps = {
  total: number;
  taken: number;
  label?: string;
};

export function FinalCTASeatsBar({ total, taken, label = "مقاعد التأسيس" }: FinalCTASeatsBarProps) {
  const remaining = total - taken;
  const pct = (taken / total) * 100;

  return (
    <div
      className="final-cta-seats-bar mx-auto mb-8 w-full max-w-md rounded-[16px] border p-4"
      style={{
        background: "color-mix(in oklch, var(--primary-foreground) 5%, transparent)",
        borderColor: "color-mix(in oklch, var(--primary-foreground) 10%, transparent)",
        animation: "fadeUp .4s .26s ease both",
        opacity: 0,
      }}
    >
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12px] font-bold text-primary-foreground/90 dark:text-primary-foreground">
          <span
            className="h-[7px] w-[7px] rounded-full bg-primary-foreground/70"
            style={{ animation: "pulse-dot 1.6s ease infinite" }}
            aria-hidden
          />
          {label}
        </div>
        <span className="text-[13px] font-black text-primary-foreground">
          تبقى <span className="text-primary-foreground font-black underline decoration-primary-foreground/30 underline-offset-2">{remaining}</span> من {total}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-primary-foreground/15">
        <div
          className="h-full rounded-full bg-primary-foreground/80 transition-all duration-800"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
