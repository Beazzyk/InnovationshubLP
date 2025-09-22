// /src/screens/Inkubator/sections/Hero/HeroSection.tsx
import React from "react";
import { Button } from "../../../../components/ui/button";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-[500px] overflow-hidden bg-[#0F5575]">
      {/* Lewy gradient: jaśniejszy + subtelny biały veil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            // trochę jaśniejsze wartości i dłuższy fade
            "linear-gradient(90deg, rgba(21,117,160,1) 0%, rgba(21,117,160,0.92) 30%, rgba(21,117,160,0.72) 48%, rgba(21,117,160,0) 60%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03))",
        }}
      />

      {/* Prawa grafika: rectangle106.svg z miękką maską od lewej */}
      <div className="absolute top-0 right-0 h-full z-[5] pointer-events-none select-none">
        <img
          src="/rectangle106.svg"
          alt=""
          className="h-full w-auto object-cover [mask-image:linear-gradient(to_left,black_88%,transparent_100%)]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to left, black 88%, transparent 100%)",
          }}
        />
      </div>

      {/* Treść */}
      <div className="relative z-10 flex flex-col justify-center h-full px-[130px]">
        <div className="max-w-[800px]">
          {/* Label sekcji — większy */}
          <div className="mb-4">
            <span
              className="text-[#9ED6EA] font-section-name font-[number:var(--section-name-font-weight)] tracking-[var(--section-name-letter-spacing)] leading-[var(--section-name-line-height)] [font-style:var(--section-name-font-style)]"
              style={{
                fontSize: "calc(var(--section-name-font-size) * 1.12)",
              }}
            >
              Inkubator
            </span>
          </div>

          {/* H1 (jak było — zgodnie z design tokenami) */}
          <h1 className="text-white font-header-h1 font-[number:var(--header-h1-font-weight)] text-[length:var(--header-h1-font-size)] tracking-[var(--header-h1-letter-spacing)] leading-[var(--header-h1-line-height)] [font-style:var(--header-h1-font-style)] mb-6">
            Poznaj naszą społeczność - polski ekosystem startupowy
          </h1>

          {/* Lead — większy niż wcześniej i czytelny */}
          <p
            className="text-white font-body-body-2 font-[number:var(--body-body-2-font-weight)] tracking-[var(--body-body-2-letter-spacing)] leading-[var(--body-body-2-line-height)] [font-style:var(--body-body-2-font-style)] mb-8 max-w-[600px]"
            style={{ fontSize: "calc(var(--body-body-2-font-size) * 1.18)" }}
          >
            Dołącz do sieci founderów, inkubatorów i innowatorów, którzy zmieniają zasady gry!
          </p>

          {/* CTA */}
          <div className="flex gap-4">
            {/* 1) biały przycisk z ciemnoniebieskim tekstem */}
            <Button className="h-[55px] px-8 py-2 bg-white text-[#0F5575] border-2 border-white hover:bg-white/90 rounded-[5px] [font-family:'Montserrat',Helvetica] font-bold text-base tracking-[-0.32px] leading-6">
              Mapa ekosystemu
            </Button>

            {/* 2) transparentny z białą ramką/tekstem */}
            <Button className="h-[55px] px-8 py-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-ui-dark-blue rounded-[5px] [font-family:'Montserrat',Helvetica] font-bold text-base tracking-[-0.32px] leading-6">
              Dołącz do ekosystemu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
