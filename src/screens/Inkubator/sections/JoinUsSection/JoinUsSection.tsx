import React from "react";
import { Button } from "../../../../components/ui/button";

const JoinUsSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      {/* tło: pół na pół */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-[#EAF6FB]" />
        <div className="w-1/2 bg-[#0F5575]" />
      </div>

      {/* zawartość */}
      <div className="relative mx-auto max-w-[1280px] h-[380px] flex items-stretch">
        {/* lewy blok */}
        <div className="relative z-10 flex-1 flex items-center justify-end pr-[180px]">
          <div className="max-w-[520px]">
            {/* Budujesz startup? */}
            <p className="text-[#0F5575] mb-3 [font-family:'Montserrat',Helvetica] font-semibold text-[18px] leading-[1.3] whitespace-nowrap">
              Budujesz startup?
            </p>

            {/* Dołącz do ekosystemu / Innovations Hub / Foundation */}
            <div className="[font-family:'Montserrat',Helvetica] font-extrabold text-[40px] leading-[1.18] text-[#0F5575] mb-6">
              <span className="block whitespace-nowrap">Dołącz do ekosystemu</span>
              <span className="block whitespace-nowrap">Innovations Hub</span>
              <span className="block whitespace-nowrap">Foundation</span>
            </div>

            <Button className="h-[48px] px-5 bg-[#0F5575] hover:bg-[#0F5575]/90 text-white rounded-[6px] [font-family:'Montserrat',Helvetica] font-semibold">
              Dołącz do ekosystemu
            </Button>
          </div>
        </div>

        {/* prawy blok */}
        <div className="relative z-10 flex-1 flex items-center pl-[220px]">
          <div className="max-w-[520px]">
            {/* Podoba Ci się co tworzymy? */}
            <p className="text-white mb-3 [font-family:'Montserrat',Helvetica] font-semibold text-[18px] leading-[1.3] whitespace-nowrap">
              Podoba Ci się co tworzymy?
            </p>

            {/* Chcesz zostać naszym / partnerem? */}
            <div className="[font-family:'Montserrat',Helvetica] font-extrabold text-[40px] leading-[1.18] text-white mb-6">
              <span className="block whitespace-nowrap">Chcesz zostać naszym</span>
              <span className="block whitespace-nowrap">partnerem?</span>
            </div>

            <Button
              variant="outline"
              className="h-[48px] px-5 border-white text-[#0F5575] bg-white hover:bg-white/90 rounded-[6px] [font-family:'Montserrat',Helvetica] font-semibold"
            >
              Zostań Partnerem
            </Button>
          </div>
        </div>

        {/* postać na środku */}
        <img
          src="/fundacja-okuniewski.png"
          alt="Postać"
          loading="eager"
          className="absolute z-20 bottom-0 left-1/2 -translate-x-1/2 h-[380px] w-auto pointer-events-none select-none"
        />
      </div>
    </section>
  );
};

export default JoinUsSection;
