import type { StaticLanding } from "./types";

export type IndustryType = "clinics" | "real-estate" | "ecommerce";

export const SUPPORTED_INDUSTRIES: IndustryType[] = ["clinics", "real-estate", "ecommerce"];

export function getIndustryOverrides(industry: IndustryType, base: StaticLanding): Partial<StaticLanding> {
  switch (industry) {
    case "clinics":
      return {
        hero: {
          ...base.hero,
          h1Line1: "احصل على حجوزات لعيادتك",
          h1Line2: " من جوجل بلا إعلانات",
          sub: "نكتب المقالات المتخصصة طبياً، ننشرها، ونصعد بعيادتك لنتائج البحث الأولى — دورك تستقبل الحالات الجديدة.",
          benefits: [
            { objection: "المقالات طبية متخصصة؟", answer: "نعم، نكتب محتوى عالي الجودة يراجع طبياً ليناسب عيادتك المرموقة." },
            ...base.hero.benefits.slice(1),
          ],
        },
        outcomes: {
          ...base.outcomes,
          outcomes: base.outcomes.outcomes.map((o, idx) => 
            idx === 1 ? { ...o, title: "مرضى محتملون مؤهلون" } : o
          ),
        }
      };
    case "real-estate":
      return {
        hero: {
          ...base.hero,
          h1Line1: "جلب مشترين لعقاراتك",
          h1Line2: " عبر محركات البحث",
          sub: "نصنع المحتوى العقاري الذي يبحث عنه المستثمر، ننشر، ونتصدر — لتبني سلطتك الرقمية في السوق العقاري.",
          benefits: [
            { objection: "الجمهور يبحث عن عقار؟", answer: "٨٥٪ من مشتري العقار يبحثون في جوجل أولاً قبل التواصل مع الوكيل." },
            ...base.hero.benefits.slice(1),
          ],
        },
      };
    case "ecommerce":
      return {
        hero: {
          ...base.hero,
          h1Line1: "ضاعف مبيعات متجرك",
          h1Line2: " بتصدر نتائج جوجل",
          sub: "نكتب وصف المنتجات والمقالات البيعية التي تحول الباحث لمشتري — لنبني لك أصلاً رقمياً يدر عليك المبيعات تلقائياً.",
          benefits: [
            { objection: "الإعلانات مكلفة؟", answer: "SEO متجرك هو الحل الوحيد لخفض تكلفة الطلب (CAC) وزيادة الأرباح الصافية." },
            ...base.hero.benefits.slice(1),
          ],
        },
      };
    default:
      return {};
  }
}

export function applyIndustryOverrides(base: StaticLanding, industry?: string): StaticLanding {
  if (!industry || !SUPPORTED_INDUSTRIES.includes(industry as IndustryType)) return base;
  
  const overrides = getIndustryOverrides(industry as IndustryType, base);
  return {
    ...base,
    ...overrides,
    hero: overrides.hero ? { ...base.hero, ...overrides.hero } : base.hero,
    outcomes: overrides.outcomes ? { ...base.outcomes, ...overrides.outcomes } : base.outcomes,
  };
}
