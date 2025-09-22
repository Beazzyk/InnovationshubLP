import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ContentWrapperSection = (): JSX.Element => {
  const companies = useMemo(
    () => [
      { id: 1, src: "/rectangle-164.png", alt: "Innovations Hub 2025" },
      { id: 2, src: "/rectangle-164-1.png", alt: "Akademia Przyszłości" },
      { id: 3, src: "/rectangle-164-2.png", alt: "Innovations Incubator" },
      { id: 4, src: "/rectangle-164-3.png", alt: "Innovations Incubator 2" },
      { id: 5, src: "/rectangle-164-1.png", alt: "Calmsie" },
      { id: 6, src: "/rectangle-164-2.png", alt: "Binderless" },
      { id: 7, src: "/rectangle-164-3.png", alt: "OpenGrant" },
    ],
    []
  );

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const VISIBLE = isMobile ? 1 : 4;
  const GAP_PX = isMobile ? 16 : 20;

  const [index, setIndex] = useState(0);
  const total = companies.length;

  const visible = useMemo(() => {
    const out: typeof companies = [];
    for (let i = 0; i < VISIBLE; i++) out.push(companies[(index + i) % total]);
    return out;
  }, [companies, index, total, VISIBLE]);

  const goNext = () => setIndex((i) => (i + 1) % total);
  const goPrev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <section className="w-full h-[350px] sm:h-[400px] lg:h-[431px] relative">
      {/* Nagłówek */}
      <div className="flex flex-col w-full max-w-[320px] sm:max-w-[600px] lg:max-w-[780px] items-center gap-2 absolute top-[40px] sm:top-[50px] lg:top-[60px] left-1/2 -translate-x-1/2 px-4">
        <div className="flex flex-col items-start gap-2 w-full">
          <div className="mt-[-1px] [font-family:'Montserrat',Helvetica] font-normal text-uiblue text-lg sm:text-xl lg:text-2xl text-center leading-6 w-full">
            <span className="leading-[var(--header-h3-line-height)] font-header-h3 [font-style:var(--header-h3-font-style)] font-[number:var(--header-h3-font-weight)] tracking-[var(--header-h3-letter-spacing)] text-[length:var(--header-h3-font-size)]">
              Szukasz wdrożenia?
            </span>
          </div>
          <div className="font-header-h2 font-[number:var(--header-h2-font-weight)] text-ui-dark-blue text-xl sm:text-2xl lg:text-[length:var(--header-h2-font-size)] text-center tracking-[var(--header-h2-letter-spacing)] leading-[var(--header-h2-line-height)] [font-style:var(--header-h2-font-style)] w-full">
            Poznaj firmy otwarte na innowacje
          </div>
        </div>
      </div>

      {/* Poświata */}
      <svg
        className="pointer-events-none absolute z-0 left-1/2 -translate-x-1/2"
        width={isMobile ? 300 : 1180}
        height="58"
        viewBox={`0 0 ${isMobile ? 300 : 1180} 58`}
        fill="none"
        style={{ top: isMobile ? "220px" : "300px" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#4EBFEE" stopOpacity="0.20" />
            <stop offset="45%" stopColor="#4EBFEE" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#4EBFEE" stopOpacity="0.00" />
          </radialGradient>
          <linearGradient id="sideFade" x1="0" y1="0" x2="1180" y2="0">
            <stop offset="0" stopColor="black" stopOpacity="0" />
            <stop offset="0.08" stopColor="black" stopOpacity="1" />
            <stop offset="0.92" stopColor="black" stopOpacity="1" />
            <stop offset="1" stopColor="black" stopOpacity="0" />
          </linearGradient>
          <mask id="softSides" x="0" y="0" width={isMobile ? 300 : 1180} height="58">
            <rect x="0" y="0" width={isMobile ? 300 : 1180} height="58" fill="url(#sideFade)" />
          </mask>
        </defs>
        <rect x="0" y="0" width={isMobile ? 300 : 1180} height="58" rx="28" fill="url(#glow)" mask="url(#softSides)" />
      </svg>

      {/* Karty */}
      <div
        className="relative z-10 absolute top-[140px] sm:top-[170px] lg:top-[191px] left-1/2 -translate-x-1/2 flex justify-center"
        style={{ width: isMobile ? 300 : 1180, height: 124 }}
      >
        <div className="flex" style={{ gap: GAP_PX }}>
          {visible.map((logo) => (
            <Card
              key={logo.id}
              className="w-[280px] bg-white rounded-2xl border border-[#F5FAFD] shadow-card-shadow cursor-pointer transition-transform hover:-translate-y-[2px]"
            >
              <CardContent className="flex flex-col items-start gap-1 p-4">
                <img className="w-full h-[100px] object-contain" alt={logo.alt} src={logo.src} loading="lazy" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Kropki + licznik — DESKTOP/TABLET */}
      <div className="hidden md:inline-flex items-center gap-3 absolute top-[320px] lg:top-[355px] left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2">
          {companies.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                aria-label={`Przejdź do pozycji ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${active ? "w-6 bg-[#4EBFEE]" : "w-2 bg-uigrey-blue/80"}`}
                style={{ outline: "none" }}
              />
            );
          })}
        </div>
        <div className="font-raleway-14-semibold text-ui-dark-blue text-sm">
          {index + 1}/{total}
        </div>
      </div>

      {/* STRZAŁKI — DESKTOP */}
      <Button
        variant="outline"
        size="icon"
        className="hidden md:inline-flex absolute top-[210px] lg:top-[231px] left-8 lg:left-[77px] w-10 h-10 lg:w-11 lg:h-11 border-2 border-[#0F5575] rounded-[5px]"
        aria-label="Poprzednie"
        onClick={goPrev}
      >
        <ChevronLeftIcon className="w-5 h-5 lg:w-6 lg:h-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="hidden md:inline-flex absolute top-[210px] lg:top-[231px] right-8 lg:right-[77px] w-10 h-10 lg:w-11 lg:h-11 border-2 border-[#0F5575] rounded-[5px]"
        aria-label="Następne"
        onClick={goNext}
      >
        <ChevronRightIcon className="w-5 h-5 lg:w-6 lg:h-6" />
      </Button>

      {/* STEROWANIE — MOBILE: niżej + licznik między strzałkami */}
      <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-[300px] w-[300px] px-2 flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 border-2 border-[#0F5575] rounded-[5px]"
          aria-label="Poprzednie"
          onClick={goPrev}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        {/* środek: kropki + licznik w jednej belce */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            {companies.map((_, i) => {
              const active = i === index;
              return (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all ${active ? "w-6 bg-[#4EBFEE]" : "w-2 bg-uigrey-blue/80"}`}
                />
              );
            })}
          </div>
          <div className="font-raleway-14-semibold text-ui-dark-blue text-xs">
            {index + 1}/{total}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 border-2 border-[#0F5575] rounded-[5px]"
          aria-label="Następne"
          onClick={goNext}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
};
