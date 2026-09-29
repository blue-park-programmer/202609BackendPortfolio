
import React from 'react';
import { Link } from 'react-router-dom';
import { MAIN_PROJECTS } from '../constants';

const MainProjects: React.FC = () => {
  return (
    <section className="mt-8">
      <div className="flex justify-between items-end px-6 mb-4">
        <h3 className="text-lg font-bold tracking-tight">Main Projects</h3>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 px-6 no-scrollbar">
        {MAIN_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="min-w-[280px] max-w-[280px] bg-white rounded-2xl p-5 shadow-sm border border-slate-100/50"
          >
            <div className="flex justify-between items-start mb-5">
              <div className={`w-14 h-14 ${project.iconBg} rounded-xl flex items-center justify-center text-white shadow-inner overflow-hidden`}>
                {project.icon.startsWith('/') || project.icon.startsWith('http') ? (
                  <img src={project.icon} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-icons-round text-3xl">{project.icon}</span>
                )}
              </div>
              <div className="flex gap-2">
                {'storeUrl' in project && project.storeUrl && (
                  <a
                    href={project.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <span className="material-icons-round text-xl">shop</span>
                  </a>
                )}
                <Link
                  to={`/project/${project.id}?origin=main`}
                  className="w-10 h-10 flex items-center justify-center bg-primary rounded-full text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                >
                  <span className="material-icons-round text-xl">arrow_forward</span>
                </Link>
              </div>
            </div>

            <h4 className="font-bold text-lg text-slate-900">{project.title}</h4>
            <p className="text-slate-500 text-sm mt-1 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {project.technologies.map((tech) => (
                <span
                  key={tech.name}
                  className={`px-3 py-1.5 ${tech.colorClass} text-[9px] font-extrabold rounded-full uppercase tracking-wider`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainProjects;
