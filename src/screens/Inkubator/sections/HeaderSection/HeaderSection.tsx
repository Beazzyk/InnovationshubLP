import { ArrowRightIcon } from "lucide-react";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";

/* ============ CSS ============ */
const styles = `
@keyframes marqueeLoop {
  from { transform: translate3d(0,0,0); }
  to   { transform: translate3d(calc(var(--segW, 0px) * -1), 0, 0); }
}
.mask-fade-x {
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
}
.marquee-wrapper { overflow: hidden; position: relative; }
.marquee-track {
  display: flex;
  will-change: transform;
  animation: marqueeLoop var(--speed,30s) linear infinite;
  animation-direction: reverse; /* kierunek → w prawo */
}
.marquee-paused:hover .marquee-track { animation-play-state: paused; }
`;

/* pojedyncza karta */
const StartupCard = ({
  logo, title, description, logoClass = "",
}: {
  logo: string; title: string; description: string; logoClass?: string;
}) => (
  <Card className="flex-shrink-0 w-[280px] bg-white rounded-2xl shadow-card-shadow">
    <CardContent className="flex flex-col items-start gap-0.5 p-4">
      <div className="flex flex-col items-center justify-center gap-1 w-full">
        <div className="flex items-center gap-4 w-full">
          <img className={`w-[90px] h-10 ${logoClass}`} alt="Company logo" src={logo} />
          <div className="[display:-webkit-box] items-center justify-center flex-1 h-10 [font-family:'Montserrat',Helvetica] font-semibold text-ui-black text-sm tracking-[-0.28px] leading-[19.6px] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] whitespace-pre-line">
            {title}
          </div>
        </div>
        <div className="flex items-end gap-2 w-full">
          <div className="flex-1 font-body-information font-[number:var(--body-information-font-weight)] text-ui-dark-blue text-[length:var(--body-information-font-size)] tracking-[var(--body-information-letter-spacing)] leading-[var(--body-information-line-height)] [font-style:var(--body-information-font-style)] whitespace-pre-line">
            {description}
          </div>
          <div className="inline-flex h-[18px] items-center gap-2.5">
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

/* pasek z pętlą – mierzymy pierwszy segment, renderujemy 2x */
function MarqueeRow({
  items,
  speed = 30, // s
  gap = 20,   // px
  className = "",
}: {
  items: Array<{logo:string; title:string; description:string; logoClass?:string}>;
  speed?: number;
  gap?: number;
  className?: string;
}) {
  const segRef = useRef<HTMLDivElement | null>(null);
  const [segW, setSegW] = useState(0);

  useLayoutEffect(() => {
    const el = segRef.current;
    if (!el) return;

    const compute = () => {
      const styleGap = gap;
      const w = el.getBoundingClientRect().width + styleGap; // segment + odstęp
      setSegW(Math.round(w));
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [gap, items.length]);

  return (
    <div className={`marquee-wrapper mask-fade-x marquee-paused ${className}`}>
      <div
        className="marquee-track"
        style={{
          gap: `${gap}px`,
          ["--speed" as any]: `${speed}s`,
          ["--segW" as any]: `${segW}px`,
        }}
      >
        {/* segment A */}
        <div ref={segRef} className="flex" style={{ gap: `${gap}px` }}>
          {items.map((c, i) => <StartupCard key={`A-${i}`} {...c} />)}
        </div>
        {/* segment B (kopiuj 1:1) */}
        <div className="flex" style={{ gap: `${gap}px` }} aria-hidden>
          {items.map((c, i) => <StartupCard key={`B-${i}`} {...c} />)}
        </div>
      </div>
    </div>
  );
}

export const HeaderSection = (): JSX.Element => {
  const startupCards = [
    { logo: "/rectangle-4174-19.png", title: "Polska Nagroda\nInnowacyjności 2021", description: "nominacja za MedBiz Inovations Program", logoClass: "object-cover" },
    { logo: "/rectangle-4176-4.png",  title: "Upmedic", description: "#MedTech #HealthTech\nAutomatyczne tworzenie dokumentacji medycznej" },
    { logo: "/rectangle-4174-19.png", title: "Gridaly", description: "nominacja za MedBiz Inovations Program", logoClass: "object-cover" },
    { logo: "/rectangle-4174-19.png", title: "Redstone Oracles", description: "nominacja za MedBiz Inovations Program", logoClass: "object-cover" },
    { logo: "/rectangle-4174-4.png",  title: "Logoplan", description: "nominacja za MedBiz Inovations Program" },
    { logo: "/rectangle-4174-19.png", title: "Polska Nagroda\nInnowacyjności 2021", description: "nominacja za MedBiz Inovations Program", logoClass: "object-cover" },
  ];

  const secondRowCards = [
    { logo: "/rectangle-4176-3.png", title: "NIRBY", description: "nominacja za MedBiz Inovations Program", logoClass: "object-cover" },
    { logo: "/rectangle-4176-1.png", title: "Calmsie", description: "nominacja za MedBiz Inovations Program" },
    { logo: "/rectangle-4176-2.png", title: "Binderless", description: "nominacja za MedBiz Inovations Program", logoClass: "object-cover" },
    { logo: "/rectangle-4174-19.png", title: "OpenGrant", description: "nominacja za MedBiz Inovations Program", logoClass: "object-cover" },
    { logo: "/rectangle-4174-19.png", title: "pieces.market", description: "nominacja za MedBiz Inovations Program", logoClass: "object-cover" },
    { logo: "/rectangle-4174-19.png", title: "Polska Nagroda\nInnowacyjności 2021", description: "nominacja za MedBiz Inovations Program", logoClass: "object-cover" },
  ];

  return (
    <section className="flex flex-col w-full items-start pt-0 pb-10 px-0">
      <style>{styles}</style>

      <div className="flex items-center justify-around gap-[171px] px-0 py-[60px] w-full">
        <div className="flex flex-col items-center justify-center gap-10 flex-1">
          <h2 className="w-[595px] font-header-h2 font-[number:var(--header-h2-font-weight)] text-ui-black text-[length:var(--header-h2-font-size)] text-center tracking-[var(--header-h2-letter-spacing)] leading-[var(--header-h2-line-height)] [font-style:var(--header-h2-font-style)]">
            Poznaj start-upy tworzone przez nową generację founderów
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-start gap-6 w-full">
        <MarqueeRow items={startupCards}  speed={32} gap={20} className="py-1" />
        <MarqueeRow items={secondRowCards} speed={38} gap={20} className="py-1" />
      </div>
    </section>
  );
};
