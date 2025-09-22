import React from "react";
import { Button } from "../../../../components/ui/button";

const JoinUsSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      {/* tło: pół na pół */}
      <div className="absolute inset-0 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-[#EAF6FB]" />
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-[#0F5575]" />
      </div>

      {/* zawartość */}
      <div className="relative mx-auto max-w-[1280px] min-h-[600px] lg:h-[380px] flex flex-col lg:flex-row items-stretch">
        {/* lewy blok */}
        <div className="relative z-10 flex-1 flex items-center justify-center lg:justify-end px-4 sm:px-8 lg:pr-[180px] py-8 lg:py-0">
          <div className="max-w-full sm:max-w-[400px] lg:max-w-[520px] text-center lg:text-left">
            <p className="text-[#0F5575] mb-3 [font-family:'Montserrat',Helvetica] font-semibold text-base sm:text-[18px] leading-[1.3]">
              Budujesz startup?
            </p>

            <div className="[font-family:'Montserrat',Helvetica] font-extrabold text-2xl sm:text-3xl lg:text-[40px] leading-[1.18] text-[#0F5575] mb-6">
              <span className="block">Dołącz do ekosystemu</span>
              <span className="block">Innovations Hub</span>
              <span className="block">Foundation</span>
            </div>

            <Button className="h-[44px] sm:h-[48px] px-4 sm:px-5 bg-[#0F5575] hover:bg-[#0F5575]/90 text-white rounded-[6px] [font-family:'Montserrat',Helvetica] font-semibold text-sm sm:text-base">
              Dołącz do ekosystemu
            </Button>
          </div>
        </div>

        {/* >>> POSTAĆ – wersja mobilna (pomiędzy blokami) <<< */}
        <div className="lg:hidden flex justify-center -mt-4 mb-2">
          <img
            src="/fundacja-okuniewski.png"
            alt="Postać"
            loading="eager"
            className="h-[220px] sm:h-[260px] w-auto pointer-events-none select-none drop-shadow-md"
          />
        </div>

        {/* prawy blok */}
        <div className="relative z-10 flex-1 flex items-center justify-center lg:justify-start px-4 sm:px-8 lg:pl-[220px] py-8 lg:py-0">
          <div className="max-w-full sm:max-w-[400px] lg:max-w-[520px] text-center lg:text-left">
            <p className="text-white mb-3 [font-family:'Montserrat',Helvetica] font-semibold text-base sm:text-[18px] leading-[1.3]">
              Podoba Ci się co tworzymy?
            </p>

            <div className="[font-family:'Montserrat',Helvetica] font-extrabold text-2xl sm:text-3xl lg:text-[40px] leading-[1.18] text-white mb-6">
              <span className="block">Chcesz zostać naszym</span>
              <span className="block">partnerem?</span>
            </div>

            <Button
              variant="outline"
              className="h-[44px] sm:h-[48px] px-4 sm:px-5 border-white text-[#0F5575] bg-white hover:bg-white/90 rounded-[6px] [font-family:'Montserrat',Helvetica] font-semibold text-sm sm:text-base"
            >
              Zostań Partnerem
            </Button>
          </div>
        </div>

        {/* >>> POSTAĆ – wersja desktopowa (jak wcześniej) <<< */}
        <img
          src="/fundacja-okuniewski.png"
          alt="Postać"
          loading="eager"
          className="hidden lg:block absolute z-20 bottom-0 left-1/2 -translate-x-1/2 h-[380px] w-auto pointer-events-none select-none"
        />
      </div>
    </section>
  );
};

export default JoinUsSection;
