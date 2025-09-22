// /src/screens/Inkubator/sections/JoinToEco/JoinToEco.tsx
import React from "react";
import { Button } from "../../../../components/ui/button";

export const JoinToEcoSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-[#EAF6FB]">
      {/* Kontener */}
      <div className="relative mx-auto max-w-[1280px] min-h-[560px] px-6 lg:px-10 xl:px-12 py-16">
        {/* Layout: grid na dużych, układa się pionowo na małych */}
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
          {/* Lewa kolumna (tekst) */}
          <div className="relative z-[2] max-w-[720px] pr-0 lg:pr-6 xl:pr-10">
            <p className="[font-family:'Montserrat',Helvetica] font-semibold tracking-wide text-[18px] leading-[1.3] text-[#66B6CE] uppercase mb-3">
              Budujesz startup?
            </p>

            <h2 className="font-header-h1 [font-family:'Montserrat',Helvetica] font-extrabold text-ui-black text-[44px] leading-[1.15] mb-8">
              Dołącz do ekosystemu
              <br />
              Innovations Hub Foundation
            </h2>

            <ul className="space-y-3 text-[#0F5575] [font-family:'Montserrat',Helvetica] text-[18px] leading-[1.55] mb-8">
              <li className="list-disc ml-8">
                Wspieramy założycieli od pierwszych kroków działalności, bez względu na wiek.
              </li>
              <li className="list-disc ml-8">
                Organizujemy kolacje, wyjścia, wyjazdy, zamknięte imprezy i networkingi – łączymy founderów, by dzielili się wiedzą i doświadczeniem.
              </li>
              <li className="list-disc ml-8">
                Porównujemy ich działania z najlepszymi wzorcami, by mogli podejmować lepsze decyzje.
              </li>
              <li className="list-disc ml-8">
                Pomagamy w codziennych wyzwaniach, rozwoju sprzedaży i zdobywaniu kontaktów.
              </li>
              <li className="list-disc ml-8">
                Ułatwiamy pozyskiwanie finansowania, dbając o wysoki poziom inkubowanych spółek.
              </li>
              <li className="list-disc ml-8">
                Informujemy o grantach, dotacjach i programach, dając szansę na wybicie się z tłumu.
              </li>
            </ul>

            <Button className="h-[52px] px-6 bg-[#0F5575] hover:bg-[#0F5575]/90 text-white rounded-[8px] [font-family:'Montserrat',Helvetica] font-semibold">
              Nominuj do ekosystemu
            </Button>
          </div>

          {/* Prawa grafika */}
          <div className="relative">
            {/* Wrapper pozwalający „wyjechać” w prawo na szerokich ekranach */}
            <div className="relative lg:justify-self-end">
              <img
                src="/rectangle-4175.png"
                alt="Sieć founderów i partnerów"
                className={[
                  // bazowo responsywne, nie wchodzi pod tekst
                  "relative z-[1] pointer-events-none select-none",
                  "w-[520px] md:w-[580px] lg:w-[640px] xl:w-[700px] h-auto",
                  // na szerokich ekranach wysuwamy obrazek w prawo poza kontener
                  "lg:max-w-none",
                  "lg:translate-x-6 xl:translate-x-10 2xl:translate-x-16", // <— przesunięcie w prawo
                  // na bardzo dużych ekranach dodatkowo odsuwamy od tekstu
                  "lg:ml-auto",
                ].join(" ")}
              />

              {/* „bufor” niewidoczny – gwarantuje brak kolizji tekstu z obrazem */}
              <div className="hidden lg:block absolute inset-y-0 -right-12 w-12" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
