import type { Metadata } from "next";
import dynamic from "next/dynamic";
import type { StaticLanding } from "@/app/content/landing/types";
import Hero from "@/app/components/landing/hero/Hero";
import { HeroTrustBar } from "@/app/components/landing/hero/HeroTrustBar";
import WhyNowCalculator from "@/app/components/landing/Calculator/Calculator";
import HowItWorks from "@/app/components/landing/HowItWorks/HowItWorks";
import Outcomes from "@/app/components/landing/Outcomes/Outcomes";
import LandingJsonLd from "@/app/components/shared/LandingJsonLd";
import { getStaticLandingWithOverrides } from "@/app/content/landing/get-static-landing";
import {
  getCountryCodeFromSlug,
  isSupportedCountrySlug,
  SUPPORTED_COUNTRY_SLUGS,
} from "@/lib/country-config";
import { isAnnualFromBillingParam } from "@/lib/billing-search-param";
import { getLandingContent } from "@/lib/getLandingContent";
import { getWhatsAppLink } from "@/lib/site-links";
import { SUPPORTED_INDUSTRIES, type IndustryType } from "@/app/content/landing/industries";
import { notFound } from "next/navigation";

const sectionFallback = () => <section className="min-h-[200px]" aria-hidden />;

const SocialProof = dynamic(
  () => import("@/app/components/landing/SocialProof/SocialProof"),
  { loading: sectionFallback }
);
import ModontyPricing from "@/app/components/landing/price-section/price-section";
const FAQ = dynamic<{ staticLanding: StaticLanding; country: import("@/lib/landing-content.types").SupportedCountry; ctaLabel?: string; whatsappNumber?: string }>(
  () => import("@/app/components/landing/FAQ/FAQ"),
  { loading: sectionFallback }
);
const FinalCTA = dynamic<{ staticLanding: StaticLanding; country: import("@/lib/landing-content.types").SupportedCountry; ctaLabel?: string; ctaLink?: string; whatsappNumber?: string }>(
  () => import("@/app/components/landing/FinalCTA/FinalCTA"),
  { loading: sectionFallback }
);

function toAbsoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return "";
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jbrseo.com";
  return pathOrUrl.startsWith("/") ? `${base}${pathOrUrl}` : `${base}/${pathOrUrl}`;
}

export function generateStaticParams() {
  const params: { country: string; industry: string }[] = [];
  SUPPORTED_COUNTRY_SLUGS.forEach((country) => {
    SUPPORTED_INDUSTRIES.forEach((industry) => {
      params.push({ country, industry });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; industry: string }>;
}): Promise<Metadata> {
  const { country: raw, industry } = await params;
  const slug = raw?.toLowerCase();
  if (!isSupportedCountrySlug(slug) || !SUPPORTED_INDUSTRIES.includes(industry as IndustryType)) {
    return { title: "JBRSEO" };
  }
  const countryCode = getCountryCodeFromSlug(slug as "sa" | "eg");
  const content = await getLandingContent(countryCode, industry);
  const { seo: s } = content;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jbrseo.com";
  const canonical = `${siteUrl.replace(/\/$/, "")}/${slug}/${industry}`;
  const ogImageUrl = s.ogImage ? toAbsoluteUrl(s.ogImage) : "";
  const twitterImageUrl = s.twitterImage ? toAbsoluteUrl(s.twitterImage) : ogImageUrl;
  
  return {
    title: `${s.title} | ${industry === "clinics" ? "للعيادات" : industry === "real-estate" ? "للعقارات" : "للمتاجر"}`,
    description: s.description,
    alternates: {
      canonical,
      languages: { ar: canonical },
    },
    openGraph: {
      title: s.ogTitle || s.title,
      description: s.ogDescription || s.description,
      url: canonical,
      locale: s.ogLocale || "ar_SA",
      type: "website",
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
  };
}

export const revalidate = 60;

export default async function IndustryHome({
  params,
  searchParams,
}: {
  params: Promise<{ country: string; industry: string }>;
  searchParams: Promise<{ billing?: string }>;
}) {
  const { country: raw, industry } = await params;
  if (!SUPPORTED_INDUSTRIES.includes(industry as IndustryType)) {
    notFound();
  }
  
  const sp = await searchParams;
  const annual = isAnnualFromBillingParam(sp?.billing);
  const slug = raw?.toLowerCase();
  if (!isSupportedCountrySlug(slug)) {
    return null;
  }
  const countrySlug = slug as "sa" | "eg";
  const countryCode = getCountryCodeFromSlug(countrySlug);
  const basePath = `/${countrySlug}/${industry}`;
  const ctaLink = `${basePath}/signup`;
  const pricingCtaLink = `${basePath}#pricing`;
  const pricingCtaLabel = "شوف الأسعار والخطة المناسبة";
  const pricingHrefBase = `${basePath}/pricing`;
  const signupHrefBase = ctaLink;
  const outcomesCtaLink = pricingCtaLink;

  const [content, pricingSALanding, pricingEGLanding] = await Promise.all([
    getLandingContent(countryCode, industry),
    getStaticLandingWithOverrides("SA"),
    getStaticLandingWithOverrides("EG"),
  ]);
  
  const mergedStaticLanding = content.staticLanding!;
  const ctaLabel = content.siteSettings.ctaLabel || "ابدأ مجاناً — بدون بطاقة";
  const pricingSA = pricingSALanding.pricing;
  const pricingEG = pricingEGLanding.pricing;
  const initialLocale = countryCode === "EG" ? "eg" : "sa";
  const whatsappLink = getWhatsAppLink(countryCode, content.siteSettings?.whatsappNumber);

  return (
    <>
      <LandingJsonLd content={content} />
      <section className="relative">
        <Hero content={content} staticLanding={mergedStaticLanding} country={countryCode} ctaLink={pricingCtaLink} ctaLabel={pricingCtaLabel} />
        <HeroTrustBar />
      </section>
      <section className="relative">
        <HowItWorks staticLanding={mergedStaticLanding} ctaLabel={pricingCtaLabel} ctaLink={pricingCtaLink} />
      </section>
      <section className="relative">
        <WhyNowCalculator ctaLabel={pricingCtaLabel} ctaLink={pricingCtaLink} />
      </section>
      <section className="relative">
        <Outcomes staticLanding={mergedStaticLanding} ctaLabel={pricingCtaLabel} ctaLink={outcomesCtaLink} />
      </section>
      <section className="relative">
        <SocialProof staticLanding={mergedStaticLanding} />
      </section>
      <section className="relative">
        <div id="pricing">
          <ModontyPricing
            pricingSA={pricingSA}
            pricingEG={pricingEG}
            initialLocale={initialLocale}
            annual={annual}
            basePath={basePath}
            pricingHrefBase={pricingHrefBase}
            signupHrefBase={signupHrefBase}
            whatsappLink={whatsappLink}
          />
        </div>
      </section>
      <section className="relative">
        <FAQ staticLanding={mergedStaticLanding} country={countryCode} ctaLabel="تحدث معنا على واتساب" whatsappNumber={content.siteSettings?.whatsappNumber} />
      </section>
      <section className="relative">
        <FinalCTA staticLanding={mergedStaticLanding} country={countryCode} ctaLabel={ctaLabel} ctaLink={ctaLink} whatsappNumber={content.siteSettings?.whatsappNumber} />
      </section>
    </>
  );
}
