import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Linkedin, Mail } from 'lucide-react';

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const getIcon = (name: string) => {
  const iconProps = { className: "w-8 h-8 md:w-10 md:h-10 mb-3 stroke-[1.5]" };
  switch (name) {
    case 'LinkedIn':
      return <Linkedin {...iconProps} />;
    case 'Gmail':
      return <Mail {...iconProps} />;
    case 'X':
      return <XIcon {...iconProps} />;
    default:
      return null;
  }
};

const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const layoutContainer = 'max-w-screen-2xl mx-auto px-4 md:px-10 xl:px-16';
  const metaLabelClass = 'text-xs md:text-sm font-secondary text-zinc-500 dark:text-[#71717A] uppercase tracking-[0.18em]';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full pb-[60px] pt-[60px] bg-white dark:bg-[#18181B] transition-colors duration-300">
      <div className={layoutContainer}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 mb-24 md:mb-32">
          <div>
            <h2 className="text-[12vw] md:text-[8vw] leading-[0.9] font-bold tracking-tighter mb-8 uppercase text-zinc-900 dark:text-[#FFFFFF]">
              LET'S GET<br />IN TOUCH
            </h2>
          </div>
          <div className="flex flex-col justify-end items-start md:items-end">
            <nav className="flex flex-wrap gap-x-12 gap-y-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="flex flex-col items-center group"
                >
                  <div className="text-zinc-900 dark:text-[#FFFFFF] transition-transform duration-300 group-hover:-translate-y-1">
                    {getIcon(link.name)}
                  </div>
                  <div className="text-lg md:text-xl font-medium text-zinc-900 dark:text-[#FFFFFF] relative overflow-hidden">
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900 dark:bg-[#FFFFFF] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </div>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className={`flex flex-col md:flex-row justify-between items-end pt-8 transition-colors duration-300 ${metaLabelClass}`}>
          <div className="mb-4 md:mb-0 font-medium">
            &copy; {new Date().getFullYear()} Mudassir
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-[#27272A] rounded-full transition-colors duration-300">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_infinite]"></div>
              <span className="font-mono text-zinc-900 dark:text-[#FFFFFF] font-semibold">{time}</span>
            </div>
            <span>GMT+5:30</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
