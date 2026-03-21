const CLIENTS = [
  "آفاق للاستشارات",
  "زوايا العقارية",
  "عيادات النور",
  "منصة إدراك",
  "رحلاتي للسياحة",
  "نخبة المحاسبين",
  "ديار التطوير",
  "رواد التجارة",
];

export function HeroTrustBar() {
  return (
    <div className="w-full border-t border-border/40 mt-6 py-5">
      <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
        يثق بنا +١٢٠ نشاط تجاري في السعودية ومصر
      </p>
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2.5 px-5 sm:px-8">
        {CLIENTS.slice(0, 6).map((name) => (
          <span
            key={name}
            className="inline-flex items-center whitespace-nowrap rounded-full border border-border/50 bg-background px-4 py-1.5 text-[12px] font-semibold text-muted-foreground/80 shadow-sm"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
