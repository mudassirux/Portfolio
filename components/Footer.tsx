
import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

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
    <footer className="w-full px-4 md:px-8 pb-12 pt-32 bg-white dark:bg-[#18181B] transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40">
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
                        className="text-lg md:text-xl font-medium text-zinc-900 dark:text-[#FFFFFF] relative group overflow-hidden"
                    >
                        <span className="relative z-10">{link.name}</span>
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900 dark:bg-[#FFFFFF] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </a>
                ))}
             </nav>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-end text-sm font-secondary text-zinc-500 dark:text-[#71717A] uppercase tracking-widest pt-8 border-t border-zinc-200 dark:border-[#3f3f46] transition-colors duration-300">
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
