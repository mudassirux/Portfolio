import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const layoutContainer = 'max-w-screen-2xl mx-auto px-4 md:px-10 xl:px-16';
  const metaLabelClass = 'text-[11px] font-mono uppercase tracking-[0.15em] text-ink-secondary';

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
    <footer className="w-full pb-[60px] pt-[60px] bg-bg-page transition-colors duration-300">
      <div className={layoutContainer}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-24 md:mb-32">
          <div>
            <h2 className="text-[12vw] md:text-[6vw] leading-[0.9] font-bold tracking-tighter uppercase text-ink font-grotesk">
              LET'S WORK<br />TOGETHER
            </h2>
          </div>
          <div className="flex justify-end items-center">
            <nav className="flex flex-wrap gap-x-12 gap-y-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="group flex items-center gap-1.5 text-base md:text-lg font-medium text-ink relative overflow-hidden tracking-[0.1em] uppercase transition-colors"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="relative z-10 select-none">↗</span>
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
            <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-card rounded-full transition-colors duration-300">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_infinite]"></div>
              <span className="font-mono text-ink font-semibold">{time}</span>
            </div>
            <span>GMT+5:30</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
