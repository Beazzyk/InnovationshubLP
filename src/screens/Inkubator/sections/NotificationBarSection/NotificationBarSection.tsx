import { HeartIcon, MailIcon, PhoneIcon } from "lucide-react";
import React from "react";

export const NotificationBarSection = (): JSX.Element => {
  const contactItems = [
    {
      icon: PhoneIcon,
      text: "Zadzwoń",
    },
    {
      icon: MailIcon,
      text: "Napisz do nas",
    },
    {
      icon: HeartIcon,
      text: "Wesprzyj nas",
    },
  ];

  return (
    <section className="w-full h-[50px] bg-uiblue">
      <div className="flex justify-between items-center h-full px-4 sm:px-8 lg:px-[130px]">
        <div className="flex items-center gap-2 sm:gap-4">
          {contactItems.map((item, index) => (
            <React.Fragment key={index}>
              <div className="inline-flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="hidden sm:inline font-XXX-12-medium font-[number:var(--XXX-12-medium-font-weight)] text-white text-[length:var(--XXX-12-medium-font-size)] tracking-[var(--XXX-12-medium-letter-spacing)] leading-[var(--XXX-12-medium-line-height)] whitespace-nowrap [font-style:var(--XXX-12-medium-font-style)]">
                  {item.text}
                </span>
              </div>
              {index < contactItems.length - 1 && (
                <img
                  className="hidden sm:block w-px h-[34px] object-cover"
                  alt="Line"
                  src="/line-2.svg"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <img className="w-6 h-6 sm:w-7 sm:h-7" alt="Group" src="/group-1.png" />
          <span className="font-XXX-12-medium font-[number:var(--XXX-12-medium-font-weight)] text-white text-[length:var(--XXX-12-medium-font-size)] tracking-[var(--XXX-12-medium-letter-spacing)] leading-[var(--XXX-12-medium-line-height)] whitespace-nowrap [font-style:var(--XXX-12-medium-font-style)]">
            PL
          </span>
        </div>
      </div>
    </section>
  );
};
