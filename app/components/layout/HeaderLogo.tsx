import Image from "next/image";
import Link from "@/app/components/link";
import { SITE_LOGO_URL } from "@/lib/constants";

const MODONTY_LOGO_URL =
  "https://res.cloudinary.com/dfegnpgwx/image/upload/v1769683590/modontyLogo_ftf4yf.png";

type HeaderLogoProps = { logoHref?: string };

export function HeaderLogo({ logoHref = "/#hero" }: HeaderLogoProps) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <Link href={logoHref} aria-label="الرئيسية">
        <Image
          src={SITE_LOGO_URL}
          alt="JBRSEO"
          width={110}
          height={34}
          className="h-8 w-auto md:h-9"
          preload
        />
      </Link>

      <span className="h-5 w-px bg-white/20" aria-hidden />

      <Link
        href="https://modonty.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="مدونتي"
        className="opacity-60 transition-opacity hover:opacity-90"
      >
        <Image
          src={MODONTY_LOGO_URL}
          alt="مدونتي"
          width={90}
          height={28}
          className="h-6 w-auto md:h-7"
        />
      </Link>
    </div>
  );
}
