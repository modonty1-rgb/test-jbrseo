import Image from "next/image";
import Link from "@/app/components/link";
import type { StaticLanding, TrustBarClient } from "@/app/content/landing/types";

const FALLBACK_CLIENTS = [
  "آفاق للاستشارات",
  "زوايا العقارية",
  "عيادات النور",
  "منصة إدراك",
  "رحلاتي للسياحة",
  "نخبة المحاسبين",
];

const FALLBACK_HEADLINE = "يثق بنا +١٢٠ نشاط تجاري في السعودية ومصر";

type HeroTrustBarProps = {
  hero?: StaticLanding["hero"];
};

function isSvgUrl(url: string): boolean {
  return /\.svg(\?|#|$)/i.test(url);
}

function LogoItem({ client }: { client: TrustBarClient }) {
  const unoptimized = isSvgUrl(client.logoUrl);
  const inner = (
    <span className="flex flex-col items-center gap-1">
      <span className="relative block h-6 w-[100px] shrink-0 sm:h-7 sm:w-[120px]">
        <Image
          src={client.logoUrl}
          alt={client.name}
          fill
          sizes="(max-width: 640px) 100px, 120px"
          loading="eager"
          unoptimized={unoptimized}
          className="object-contain object-center opacity-60 transition-opacity hover:opacity-90"
        />
      </span>
      <span className="text-[10px] font-medium text-muted-foreground/60">{client.name}</span>
    </span>
  );

  if (client.href) {
    return (
      <Link
        href={client.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={client.name}
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

function PillItem({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full border border-border/50 bg-background px-4 py-1.5 text-[12px] font-semibold text-muted-foreground/80 shadow-sm">
      {name}
    </span>
  );
}

export function HeroTrustBar({ hero }: HeroTrustBarProps) {
  const headline = hero?.trustBarHeadline || FALLBACK_HEADLINE;
  const clients = hero?.trustBarClients;

  const hasLogos = Array.isArray(clients) && clients.some((c) => c.logoUrl);
  const hasNames = Array.isArray(clients) && clients.length > 0;

  return (
    <div className="w-full border-t border-border/40 mt-6 py-5">
      <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
        {headline}
      </p>
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 px-5 sm:px-8">
        {hasLogos ? (
          clients!
            .filter((c) => c.logoUrl)
            .map((client, i) => (
              <LogoItem key={`${client.logoUrl}-${client.name}-${i}`} client={client} />
            ))
        ) : hasNames ? (
          clients!.map((c, i) => <PillItem key={`${c.name}-${i}`} name={c.name} />)
        ) : (
          FALLBACK_CLIENTS.map((name, i) => <PillItem key={`${name}-${i}`} name={name} />)
        )}
      </div>
    </div>
  );
}
