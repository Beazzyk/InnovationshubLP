import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

/**
 * Karuzela: 4 karty widoczne, krok = 1 karta, pętla nieskończona.
 * Szerokość toru: 1180 px; karta: 280 px; gap: 20 px => 4*280 + 3*20 = 1180.
 */
export const ContentWrapperSection = (): JSX.Element => {
  // Możesz dodać własne logotypy — używam istniejących assetów w projekcie.
  const companies = useMemo(
    () => [
      { id: 1, src: "/rectangle-164.png", alt: "Innovations Hub 2025" },
      { id: 2, src: "/rectangle-164-1.png", alt: "Akademia Przyszłości" },
      { id: 3, src: "/rectangle-164-2.png", alt: "Innovations Incubator" },
      { id: 4, src: "/rectangle-164-3.png", alt: "Innovations Incubator 2" },
      // mokowane – ponownie wykorzystujemy istniejące pliki, by nie było 404:
      { id: 5, src: "/rectangle-164-1.png", alt: "Calmsie" },
      { id: 6, src: "/rectangle-164-2.png", alt: "Binderless" },
      { id: 7, src: "/rectangle-164-3.png", alt: "OpenGrant" },
    ],
    []
  );

  const VISIBLE = 4; // ile kart na ekranie
  const GAP_PX = 20; // gap-5
  const CARD_W = 280;

  const [index, setIndex] = useState(0); // indeks karty „pierwszej z lewej”

  const total = companies.length;

  // Zwraca 4 elementy zaczynając od index, owinięte modulo (infinite loop)
  const visible = useMemo(() => {
    const out: typeof companies = [];
    for (let i = 0; i < VISIBLE; i++) {
      const at = (index + i) % total;
      out.push(companies[at]);
    }
    return out;
  }, [companies, index, total]);

  const goNext = () => setIndex((i) => (i + 1) % total);
  const goPrev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <section className="w-full h-[431px] relative">
      {/* Nagłówek */}
      <div className="flex flex-col w-[780px] items-center gap-2 absolute top-[60px] left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-start gap-2 w-full">
          <div className="mt-[-1px] [font-family:'Montserrat',Helvetica] font-normal text-uiblue text-2xl text-center leading-6">
            <span className="leading-[var(--header-h3-line-height)] font-header-h3 [font-style:var(--header-h3-font-style)] font-[number:var(--header-h3-font-weight)] tracking-[var(--header-h3-letter-spacing)] text-[length:var(--header-h3-font-size)]">
              Szukasz wdrożenia?
            </span>
          </div>
          <div className="font-header-h2 font-[number:var(--header-h2-font-weight)] text-ui-dark-blue text-[length:var(--header-h2-font-size)] text-center tracking-[var(--header-h2-letter-spacing)] leading-[var(--header-h2-line-height)] [font-style:var(--header-h2-font-style)]">
            Poznaj firmy otwarte na innowacje
          </div>
        </div>
      </div>

      {/* Poświata TYLKO pod kartami — SVG */}
      <svg
        className="pointer-events-none absolute z-0 left-1/2 -translate-x-1/2"
        width="1180"
        height="58"
        viewBox="0 0 1180 58"
        fill="none"
        style={{ top: "300px" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#4EBFEE" stopOpacity="0.20" />
            <stop offset="45%" stopColor="#4EBFEE" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#4EBFEE" stopOpacity="0.00" />
          </radialGradient>
          <linearGradient id="sideFade" x1="0" y1="0" x2="1180" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="black" stopOpacity="0" />
            <stop offset="0.08" stopColor="black" stopOpacity="1" />
            <stop offset="0.92" stopColor="black" stopOpacity="1" />
            <stop offset="1" stopColor="black" stopOpacity="0" />
          </linearGradient>
          <mask id="softSides" maskUnits="userSpaceOnUse" x="0" y="0" width="1180" height="58">
            <rect x="0" y="0" width="1180" height="58" fill="url(#sideFade)" />
          </mask>
        </defs>
        <rect x="0" y="0" width="1180" height="58" rx="28" fill="url(#glow)" mask="url(#softSides)" />
      </svg>

      {/* Rząd kart – precyzyjne wymiary, by NIC się nie ucinało */}
      <div
        className="relative z-10 absolute top-[191px] left-1/2 -translate-x-1/2 flex justify-center"
        style={{ width: 1180, height: 124 }}
      >
        <div className="flex" style={{ gap: GAP_PX }}>
          {visible.map((logo) => (
            <Card
              key={logo.id}
              className="w-[280px] bg-white rounded-2xl border border-[#F5FAFD] shadow-card-shadow cursor-pointer transition-transform hover:-translate-y-[2px]"
              onClick={() => {
                // np. klik w kartę — tutaj możesz otworzyć modal lub przejść gdzieś:
                // console.log("Clicked company:", logo.alt);
              }}
            >
              <CardContent className="flex flex-col items-start gap-1 p-4">
                <img
                  className="w-full h-[100px] object-contain"
                  alt={logo.alt}
                  src={logo.src}
                  loading="lazy"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Kropki + licznik */}
      <div className="inline-flex items-center gap-3 absolute top-[355px] left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2">
          {companies.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                aria-label={`Przejdź do pozycji ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  active ? "w-6 bg-[#4EBFEE]" : "w-2 bg-uigrey-blue/80"
                }`}
                style={{ outline: "none" }}
              />
            );
          })}
        </div>
        <div className="font-raleway-14-semibold text-ui-dark-blue">{index + 1}/{total}</div>
      </div>

      {/* Strzałki – zawinięcie modulo, zawsze ten sam kierunek */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-[231px] left-[77px] w-11 h-11 border-2 border-[#0F5575] rounded-[5px] h-auto"
        aria-label="Poprzednie"
        onClick={goPrev}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-[231px] right-[77px] w-11 h-11 border-2 border-[#0F5575] rounded-[5px] h-auto"
        aria-label="Następne"
        onClick={goNext}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </Button>
    </section>
  );
};
