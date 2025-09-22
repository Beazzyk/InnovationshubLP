import React from "react";
import { BannerSection } from "./sections/BannerSection/BannerSection";
import { ContentWrapperSection } from "./sections/ContentWrapperSection/ContentWrapperSection";
import { FooterSection } from "./sections/FooterSection/FooterSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import JoinUsSection from "./sections/JoinUsSection/JoinUsSection";
import { JoinToEcoSection } from "./sections/JoinToEco/JoinToEco"; // <— TU
import { NavigationBarSection } from "./sections/NavigationBarSection/NavigationBarSection";
import { NotificationBarSection } from "./sections/NotificationBarSection/NotificationBarSection";

export const Inkubator = (): JSX.Element => {
  return (
    <div className="bg-[#ffffff] overflow-hidden w-full min-w-[1440px] relative">
      <NotificationBarSection />
      <NavigationBarSection />
      <HeroSection />
      <HeaderSection />
      <BannerSection />
      <JoinToEcoSection /> 
      <ContentWrapperSection />
      <JoinUsSection />
      <FooterSection />
    </div>
  );
};
