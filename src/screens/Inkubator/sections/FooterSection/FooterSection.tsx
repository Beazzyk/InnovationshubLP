import { FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import React from "react";
import { Separator } from "../../../../components/ui/separator";

const footerColumns = [
  {
    title: "O Fundacji",
    links: [
      "O nas",
      "Nasz zespół",
      "Kariera",
      "Dla partnerów",
      "Wesprzyj nas!",
      "Kontakt",
    ],
  },
  {
    title: "Program mentoringowy",
    links: [
      "O Programie",
      "Mentorzy",
      "Harmonogram",
      "Rejestracja",
      "Poprzednie edycje",
    ],
  },
  {
    title: "Akademia",
    links: ["O Akademii", "Edukacja", "Wywiady", "Warsztaty"],
  },
  {
    title: "Inkubator",
    links: [
      "O Inkubatorze",
      "Dla Studentów",
      "Dla Instytucji i Uczelni",
      "Dla Samorządów",
      "Dla Przedsiębiorców",
      "Dla Startupów",
      "Dla Inwestorów",
    ],
  },
];

const legalLinks = [
  "Polityka prywatności",
  "Regulamin Programu",
  "Statut Fundacji",
];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="w-full bg-transparent border-t border-[#5fa5c5] relative">
      <div className="container mx-auto px-4 sm:px-8 lg:px-[130px] py-8 sm:py-12 lg:py-[72px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {footerColumns.map((column, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h3 className="font-monsterrat-18-semibold font-[number:var(--monsterrat-18-semibold-font-weight)] text-base sm:text-[length:var(--monsterrat-18-semibold-font-size)] tracking-[var(--monsterrat-18-semibold-letter-spacing)] leading-[var(--monsterrat-18-semibold-line-height)] text-uidark-blue [font-style:var(--monsterrat-18-semibold-font-style)]">
                {column.title}
              </h3>
              <nav className="flex flex-col gap-3">
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href="#"
                    className="font-monsterrat-14-semibold font-[number:var(--monsterrat-14-semibold-font-weight)] text-uidark-blue text-sm sm:text-[length:var(--monsterrat-14-semibold-font-size)] tracking-[var(--monsterrat-14-semibold-letter-spacing)] leading-[var(--monsterrat-14-semibold-line-height)] [font-style:var(--monsterrat-14-semibold-font-style)] hover:opacity-80 transition-opacity"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          ))}

          <div className="flex flex-col gap-6 sm:gap-8 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-4">
              <h3 className="font-monsterrat-18-semibold font-[number:var(--monsterrat-18-semibold-font-weight)] text-uidark-blue text-base sm:text-[length:var(--monsterrat-18-semibold-font-size)] tracking-[var(--monsterrat-18-semibold-letter-spacing)] leading-[var(--monsterrat-18-semibold-line-height)] [font-style:var(--monsterrat-18-semibold-font-style)]">
                Zobacz co u nas słychać
              </h3>
              <div className="flex gap-4 sm:gap-6">
                <a
                  href="#"
                  className="text-uidark-blue hover:opacity-80 transition-opacity"
                >
                  <FacebookIcon size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a
                  href="#"
                  className="text-uidark-blue hover:opacity-80 transition-opacity"
                >
                  <LinkedinIcon size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a
                  href="#"
                  className="text-uidark-blue hover:opacity-80 transition-opacity"
                >
                  <InstagramIcon size={20} className="sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-monsterrat-18-semibold font-[number:var(--monsterrat-18-semibold-font-weight)] text-uidark-blue text-base sm:text-[length:var(--monsterrat-18-semibold-font-size)] tracking-[var(--monsterrat-18-semibold-letter-spacing)] leading-[var(--monsterrat-18-semibold-line-height)] [font-style:var(--monsterrat-18-semibold-font-style)]">
                Napisz do nas!
              </h3>
              <a
                href="mailto:hello@innovationshub.pl"
                className="font-monsterrat-14-semibold font-[number:var(--monsterrat-14-semibold-font-weight)] text-uidark-blue text-sm sm:text-[length:var(--monsterrat-14-semibold-font-size)] tracking-[var(--monsterrat-14-semibold-letter-spacing)] leading-[var(--monsterrat-14-semibold-line-height)] [font-style:var(--monsterrat-14-semibold-font-style)] hover:opacity-80 transition-opacity break-all"
              >
                hello@innovationshub.pl
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Separator className="w-full" />
        <div className="container mx-auto px-4 sm:px-8 lg:px-[130px] py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {legalLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <a
                    href="#"
                    className="font-raleway-14-semibold font-[number:var(--raleway-14-semibold-font-weight)] text-uidark-blue text-xs sm:text-[length:var(--raleway-14-semibold-font-size)] tracking-[var(--raleway-14-semibold-letter-spacing)] leading-[var(--raleway-14-semibold-line-height)] [font-style:var(--raleway-14-semibold-font-style)] hover:opacity-80 transition-opacity"
                  >
                    {link}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <div className="w-1 h-1 bg-uidark-blue rounded-sm hidden sm:block" />
                  )}
                </React.Fragment>
              ))}
            </nav>
            <div className="font-raleway-14-semibold font-[number:var(--raleway-14-semibold-font-weight)] text-uidark-blue text-xs sm:text-[length:var(--raleway-14-semibold-font-size)] tracking-[var(--raleway-14-semibold-letter-spacing)] leading-[var(--raleway-14-semibold-line-height)] [font-style:var(--raleway-14-semibold-font-style)] text-center sm:text-right">
              Copyright 2021 Innovations Hub
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
