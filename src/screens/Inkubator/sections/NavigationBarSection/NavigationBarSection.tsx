import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../../../components/ui/navigation-menu";

const navigationItems = [
  { label: "O NAS" },
  { label: "PROJEKTY" },
  { label: "AKTUALNOŚCI" },
  { label: "INKUBATOR" },
];

export const NavigationBarSection = (): JSX.Element => {
  return (
    <nav className="relative w-full h-[60px] sm:h-[70px] lg:h-[82px] bg-white border-b border-[#c3dfeb]">
      {/* logo */}
      <img
        className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 lg:left-[9%] h-[50%] sm:h-[55%] lg:h-[60%] w-auto"
        alt="Innovations Hub Foundation"
        src="/obraz.png"
      />

      {/* menu + CTA */}
      <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 lg:right-[9%] flex items-center gap-2 sm:gap-4 lg:gap-10">
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="flex items-center gap-10">
            {navigationItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger
                  className="
                    flex items-center gap-1
                    bg-transparent hover:bg-transparent focus:bg-transparent
                    data-[active]:bg-transparent data-[state=open]:bg-transparent
                    p-0 h-auto font-bold text-base [font-family:'Montserrat',Helvetica] text-ui-dark-blue
                    [&>svg:last-child]:h-5 [&>svg:last-child]:w-5
                  "
                >
                  {item.label}
                  {/* UWAGA: nie dodajemy tu własnego <ChevronDownIcon />.
                      Wbudowany chevron NavigationMenuTrigger zostaje
                      i powyżej sterujemy jego rozmiarem. */}
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button className="h-[40px] sm:h-[48px] lg:h-[55px] px-3 sm:px-4 lg:px-6 py-2 bg-[#0f5575] hover:bg-[#0f5575]/90 text-uiblue-tint rounded-[5px] font-bold text-sm sm:text-base [font-family:'Montserrat',Helvetica] tracking-[-0.32px] leading-6">
          <span className="hidden sm:inline">Dołącz do Inkubatora!</span>
          <span className="sm:hidden">Dołącz</span>
        </Button>
      </div>
    </nav>
  );
};
