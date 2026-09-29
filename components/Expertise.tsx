
import React from 'react';

const Expertise: React.FC = () => {
  return (
    <section className="px-6 mt-8 pb-40">
      <h3 className="text-lg font-bold mb-4 tracking-tight">Social & Docs</h3>
      <div className="grid grid-cols-2 gap-4">
        <a
          href="https://github.com/blue-park-programmer"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-2xl border border-slate-100/50 shadow-sm hover:shadow-md transition-shadow active:scale-[0.98]"
        >
          <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl">code</span>
          </div>
          <span className="font-bold text-sm text-slate-800">Github</span>
        </a>

        <a
          href="https://velog.io/@bluepark/posts"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-2xl border border-slate-100/50 shadow-sm hover:shadow-md transition-shadow active:scale-[0.98]"
        >
          <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
            <span className="material-symbols-outlined text-2xl">description</span>
          </div>
          <span className="font-bold text-sm text-slate-800">Velog</span>
        </a>
      </div>
    </section>
  );
};

export default Expertise;
