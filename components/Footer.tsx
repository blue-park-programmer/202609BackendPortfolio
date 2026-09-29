
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 bg-gradient-to-t from-background to-transparent pointer-events-none">
      <a
        href="/resume_0324.pdf"
        download
        className="pointer-events-auto w-full bg-slate-900 text-white py-5 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-xl shadow-slate-900/20"
      >
        <span className="material-symbols-outlined font-bold text-xl">download</span>
        이력서 다운로드
      </a>
    </div>
  );
};

export default Footer;
