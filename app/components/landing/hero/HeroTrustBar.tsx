import { Building2, Landmark, Briefcase, GraduationCap, Plane } from "lucide-react";

export function HeroTrustBar() {
  return (
    <div className="w-full flex flex-col items-center justify-center opacity-70 mt-6 md:mt-10 pb-16">
      <p className="text-sm text-muted-foreground font-semibold mb-6">وثق بنا +١٢٠ نشاط تجاري سعودي ومصري</p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center text-muted-foreground grayscale">
        <div className="flex items-center gap-2 font-bold"><Landmark className="w-6 h-6" /> آفاق للاستشارات</div>
        <div className="flex items-center gap-2 font-bold"><Briefcase className="w-6 h-6" /> زوايا العقارية</div>
        <div className="flex items-center gap-2 font-bold"><Building2 className="w-6 h-6" /> عيادات النور</div>
        <div className="flex items-center gap-2 font-bold"><GraduationCap className="w-6 h-6" /> منصة إدراك</div>
        <div className="flex items-center gap-2 font-bold"><Plane className="w-6 h-6" /> رحلاتي للسياحة</div>
      </div>
    </div>
  );
}
