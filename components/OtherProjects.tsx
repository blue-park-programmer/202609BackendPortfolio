
import React from 'react';
import { Link } from 'react-router-dom';
import { OTHER_PROJECTS } from '../constants';

const OtherProjects: React.FC = () => {
  if (OTHER_PROJECTS.length === 0) {
    return null;
  }

  return (
    <section className="px-6 mt-8 pb-32">
      <h3 className="text-lg font-bold mb-4 tracking-tight">Other Projects</h3>
      <div className="space-y-4">
        {OTHER_PROJECTS.map((project) => (
          <Link
            key={project.id}
            to={`/project/${project.id}?origin=other`}
            className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100/50 shadow-sm active:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 bg-slate-100/60 rounded-xl flex items-center justify-center overflow-hidden">
              {project.icon.startsWith('/') || project.icon.startsWith('http') ? (
                <img src={project.icon} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <span className="material-icons-round text-slate-400 text-2xl">{project.icon}</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-[15px] text-slate-900 truncate">{project.title}</h4>
              <p className="text-slate-500 text-xs mt-0.5">{project.description}</p>
              <div className="flex gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <span className="material-icons-round text-slate-300">chevron_right</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OtherProjects;
