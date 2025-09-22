import { ChevronDownIcon } from "lucide-react";
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
    <nav className="relative w-full h-[82px] bg-white border-b border-[#c3dfeb]">
      {/* logo: ~9% od lewej, centrowane pionowo */}
      <img
        className="absolute top-1/2 -translate-y-1/2 left-[9%] h-[60%] w-auto"
        alt="Innovations Hub Foundation"
        src="/obraz.png"
      />

      {/* menu + CTA: ~9% od prawej, centrowane pionowo */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[9%] flex items-center gap-10">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-10">
            {navigationItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger className="flex items-center gap-1 bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent p-0 h-auto font-bold text-base [font-family:'Montserrat',Helvetica] text-ui-dark-blue">
                  {item.label}
                  <ChevronDownIcon className="w-6 h-6" />
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button className="h-[55px] px-6 py-2 bg-[#0f5575] hover:bg-[#0f5575]/90 text-uiblue-tint rounded-[5px] font-bold text-base [font-family:'Montserrat',Helvetica] tracking-[-0.32px] leading-6 whitespace-nowrap">
          Dołącz do Inkubatora!
        </Button>
      </div>
    </nav>
  );
};
