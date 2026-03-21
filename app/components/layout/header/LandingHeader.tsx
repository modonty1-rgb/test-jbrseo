import Link from "@/app/components/link";
import NextLink from "next/link";
import type { StaticLanding } from "@/app/content/landing/types";
import type { LandingContent, SupportedCountry } from "@/lib/landing-content.types";
import { getNavLinks } from "@/lib/site-links";
import { HeaderLogo } from "@/app/components/layout/HeaderLogo";
import { ThemeToggle } from "@/app/components/layout/header/ThemeToggle";
import { HeaderMobileMenuLazy } from "@/app/components/layout/header/HeaderMobileMenuLazy";

type NavLinkItem = { href: string; label: string };

function DesktopNav({ navLinks }: { navLinks: NavLinkItem[] }) {
  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="القائمة الرئيسية">
      {navLinks.map(({ href, label }) => (
        <NextLink
          key={href}
          href={href}
          className="
            relative rounded-lg px-3 py-2
            text-sm font-semibold text-white/90
            transition-colors duration-200
            hover:bg-white/10 hover:text-white
            after:absolute after:bottom-1 after:start-3 after:end-3
            after:h-[2px] after:rounded-full after:bg-accent
            after:scale-x-0 after:transition-transform after:duration-200
            hover:after:scale-x-100
          "
        >
          {label}
        </NextLink>
      ))}
    </nav>
  );
}

const DEFAULT_CTA = "ابدأ مجاناً — بدون بطاقة";

type LandingHeaderProps = {
  content: LandingContent;
  staticLanding: StaticLanding;
  country: SupportedCountry;
  basePath?: string;
  pricingHref?: string;
  navLinks?: NavLinkItem[];
};

export function LandingHeader({
  content,
  staticLanding,
  country,
  basePath = "",
  pricingHref = "/signup",
  navLinks: navLinksProp,
}: LandingHeaderProps) {
  const { header } = staticLanding;
  const navLinks = navLinksProp ?? getNavLinks(country, basePath);
  const ctaLabel = content.siteSettings.ctaLabel || DEFAULT_CTA;
  const primaryCtaLabel =
    pricingHref.includes("#pricing") || pricingHref.endsWith("/pricing")
      ? "شوف الأسعار"
      : ctaLabel;
  type HeaderWithBookCta = StaticLanding["header"] & { bookCta?: string };
  const bookCta = (header as HeaderWithBookCta).bookCta || primaryCtaLabel;
  const headerBannerText = (header.bannerText ?? "").trim();
  const showBanner = headerBannerText.length > 0;
  const logoHref = basePath ? `${basePath}#hero` : "/#hero";

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "oklch(0.09 0.11 275)" }}
    >
      {showBanner && (
        <div
          className="
            flex flex-wrap items-center justify-center gap-1.5
            px-3 py-2 text-center text-sm font-bold
            sm:px-4 sm:py-2.5
          "
          style={{
            background: "var(--accent)",
            color: "#fff",
            letterSpacing: ".01em",
          }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-white/60"
            style={{ animation: "pulse-hdr 1.8s ease infinite" }}
            aria-hidden
          />
          <span>{headerBannerText}</span>
          <span className="hidden sm:inline mx-1 opacity-40">·</span>
          <Link
            href={pricingHref}
            className="
              inline-flex items-center gap-1 rounded-full
              border border-white/40 bg-white/15
              px-2.5 py-0.5 text-sm font-black
              transition-colors hover:bg-white/25
            "
          >
            <span>{bookCta}</span>
          </Link>
        </div>
      )}

      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between border-b border-white/8 px-5 py-3 sm:px-8 lg:px-10">
        <HeaderLogo logoHref={logoHref} />
        <DesktopNav navLinks={navLinks} />
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href={pricingHref}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-black text-white shadow-[0_4px_16px_color-mix(in_oklch,var(--accent)_40%,transparent)] transition-all duration-200 hover:bg-accent/90 hover:scale-[1.03] sm:px-5"
          >
            {primaryCtaLabel}
          </Link>
          <div className="lg:hidden">
            <HeaderMobileMenuLazy
              navLinks={navLinks}
              ctaLabel={primaryCtaLabel}
              pricingHref={pricingHref}
              bannerText={header.bannerText ?? ""}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-hdr {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .5; transform: scale(1.5); }
        }
      `}</style>
    </header>
  );
}

