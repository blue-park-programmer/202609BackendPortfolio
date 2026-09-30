import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { MAIN_PROJECTS, OTHER_PROJECTS } from '../constants';

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const origin = queryParams.get('origin');
    const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

    // Find project in both lists
    const project = [...MAIN_PROJECTS, ...OTHER_PROJECTS].find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <h2 className="text-xl font-bold mb-4">Project not found</h2>
                <Link to="/" className="text-primary font-bold">Go back home</Link>
            </div>
        );
    }

    const isMainOrigin = origin === 'main';

    return (
        <div className="bg-background min-h-screen flex flex-col relative pb-28 sm:pb-0">
            {/* Header / Hero Illustration Area */}
            <div className="h-72 bg-slate-200 relative overflow-hidden flex items-end justify-center">
                <Link
                    to="/"
                    className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white z-20"
                >
                    <span className="material-icons-round">arrow_back_ios_new</span>
                </Link>
                {'externalUrl' in project && (project as any).externalUrl && (
                    <a
                        href={(project as any).externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white z-20"
                        aria-label="페이지로 이동"
                    >
                        <span className="material-icons-round">open_in_new</span>
                    </a>
                )}
                {project.heroImage ? (
                    <div className="absolute inset-0 w-full h-full p-6">
                        <img
                            src={project.heroImage}
                            alt={project.title}
                            className="w-full h-full object-contain drop-shadow-lg"
                        />
                    </div>
                ) : (
                    <div className="w-48 h-56 bg-white/10 rounded-t-full relative -bottom-4 overflow-hidden border-t-4 border-white/20">
                        <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.title}&backgroundColor=transparent`}
                            alt="Illustration"
                            className="w-full h-full object-cover scale-110 translate-y-4"
                        />
                    </div>
                )}
            </div>

            {/* Floating Info Card */}
            <div className="px-6 -mt-10 relative z-10">
                <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <h1 className="text-2xl font-bold text-slate-900 leading-tight">{project.title}</h1>
                    <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                        {'simpleDescription' in project && (project as any).simpleDescription
                            ? (project as any).simpleDescription
                            : project.description}
                    </p>
                </div>
            </div>

            <div className="px-6 py-10 space-y-10">
                {/* Core Technologies */}
                <section>
                    <h3 className="text-[17px] font-bold text-slate-900 mb-4 tracking-tight">핵심 기술</h3>
                    <div className="flex flex-wrap gap-2">
                        {'technologies' in project ? (project as any).technologies.map((tech: any) => (
                            <span
                                key={tech.name}
                                className={`px-4 py-2 ${tech.colorClass} text-[10px] font-extrabold rounded-full uppercase tracking-wider`}
                            >
                                {tech.name}
                            </span>
                        )) : (project as any).tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-4 py-2 bg-slate-100 text-slate-600 text-[10px] font-extrabold rounded-full uppercase tracking-wider"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Full Description */}
                {'fullDescription' in project && (
                    <section>
                        <h3 className="text-[17px] font-bold text-slate-900 mb-4 tracking-tight">서비스 소개</h3>
                        <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">
                            {(project as any).fullDescription}
                        </p>
                    </section>
                )}

                {/* Key Features (Other Projects) */}
                {'keyFeatures' in project && (project as any).keyFeatures && (
                    <section>
                        <h3 className="text-[17px] font-bold text-slate-900 mb-4 tracking-tight">주요 기능</h3>
                        <ul className="space-y-3">
                            {(project as any).keyFeatures.map((feature: string, idx: number) => (
                                <li key={idx} className="flex gap-3">
                                    <span className="material-icons-round text-primary text-sm mt-0.5">check_circle</span>
                                    <p className="text-slate-500 text-sm leading-relaxed">{feature}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Tech Stack details (Main Projects) */}
                {'techStack' in project && (project as any).techStack && (
                    <section>
                        <h3 className="text-[17px] font-bold text-slate-900 mb-4 tracking-tight">기술 스택</h3>
                        <div className="flex flex-wrap gap-2">
                            {(project as any).techStack.map((tech: string, idx: number) => (
                                <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-lg border border-slate-200">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Troubleshooting (Main Projects) */}
                {'troubleshooting' in project && (project as any).troubleshooting && (
                    <section>
                        <h3 className="text-[17px] font-bold text-slate-900 mb-4 tracking-tight">문제 해결 및 검증</h3>
                        <ul className="space-y-3">
                            {(project as any).troubleshooting.map((exp: string, idx: number) => (
                                <li key={idx} className="flex gap-3">
                                    <span className="material-icons-round text-primary text-sm mt-0.5">build</span>
                                    <p className="text-slate-500 text-sm leading-relaxed">{exp}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {'performanceResults' in project && (project as any).performanceResults && (
                    <section>
                        <h3 className="text-[17px] font-bold text-slate-900 mb-4 tracking-tight">성능 개선 결과</h3>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {(project as any).performanceResults.map((result: any) => (
                                <div key={result.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{result.label}</p>
                                    <p className="mt-2 text-[15px] font-bold leading-snug text-slate-900">{result.value}</p>
                                    <p className="mt-2 text-sm font-extrabold text-primary">{result.delta}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {'learnings' in project && (project as any).learnings && (
                    <section>
                        <h3 className="text-[17px] font-bold text-slate-900 mb-4 tracking-tight">배운 점</h3>
                        <ul className="space-y-3">
                            {(project as any).learnings.map((learning: string, idx: number) => (
                                <li key={idx} className="flex gap-3">
                                    <span className="material-icons-round text-primary text-sm mt-0.5">lightbulb</span>
                                    <p className="text-slate-500 text-sm leading-relaxed">{learning}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Implementation (Main Projects) */}
                {'implementation' in project && (project as any).implementation && (
                    <section>
                        <h3 className="text-[17px] font-bold text-slate-900 mb-4 tracking-tight">주요 구현 경험</h3>
                        <ul className="space-y-3">
                            {(project as any).implementation.map((exp: string, idx: number) => (
                                <li key={idx} className="flex gap-3">
                                    <span className="material-icons-round text-primary text-sm mt-0.5">add_circle</span>
                                    <p className="text-slate-500 text-sm leading-relaxed">{exp}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Responsibilities (Fallback for older main projects) */}
                {'responsibilities' in project && (project as any).responsibilities && !('troubleshooting' in project) && (
                    <section>
                        <h3 className="text-[17px] font-bold text-slate-900 mb-4 tracking-tight">Responsibilities</h3>
                        <ul className="space-y-3">
                            {(project as any).responsibilities.map((resp: string, idx: number) => (
                                <li key={idx} className="flex gap-3">
                                    <span className="material-icons-round text-primary text-sm mt-0.5">check_circle</span>
                                    <p className="text-slate-500 text-sm leading-relaxed">{resp}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Project Materials */}
                <section className="pb-10">
                    <h3 className="text-[17px] font-bold text-slate-900 mb-5 tracking-tight">프로젝트 자료</h3>
                    <div className="space-y-5">
                        {'screenshots' in project && (project as any).screenshots?.length > 0 ? (project as any).screenshots.map((ss: string, idx: number) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedScreenshot(ss)}
                                className="w-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm p-2 active:scale-[0.99] transition-transform"
                                aria-label={`프로젝트 자료 ${idx + 1} 확대 보기`}
                            >
                                <img src={ss} alt={`프로젝트 자료 ${idx + 1}`} className="w-full h-auto object-contain rounded-xl" />
                            </button>
                        )) : (
                            <div className="h-80 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs italic border border-dashed border-slate-300">
                                프로젝트 자료 준비 중
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Bottom Bar */}
            {isMainOrigin && 'githubUrl' in project && (project as any).githubUrl && 'demoUrl' in project && (project as any).demoUrl ? (
                <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 py-4 bg-slate-900 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-50 sm:static sm:mb-8 sm:bg-transparent sm:shadow-none sm:py-0">
                    <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-center sm:gap-6">
                        <a
                            href={(project as any).githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-3 py-3 text-white font-bold uppercase tracking-widest text-[11px] active:scale-95 transition-transform bg-primary/20 rounded-xl sm:bg-slate-900 sm:px-8 sm:min-w-36"
                        >
                            <span className="material-icons-round text-lg">code</span>
                            Github
                        </a>
                        <a
                            href={(project as any).demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-3 py-3 text-white font-bold uppercase tracking-widest text-[11px] active:scale-95 transition-transform bg-white/10 rounded-xl sm:bg-slate-800 sm:px-8 sm:min-w-36"
                        >
                            <span className="material-icons-round text-lg">play_circle</span>
                            Demo
                        </a>
                    </div>
                </div>
            ) : isMainOrigin && 'githubUrl' in project && (project as any).githubUrl && 'documentUrl' in project && (project as any).documentUrl ? (
                <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 py-4 bg-slate-900 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-50 sm:static sm:mb-8 sm:bg-transparent sm:shadow-none sm:py-0">
                    <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-center sm:gap-6">
                        <a
                            href={(project as any).githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-3 py-3 text-white font-bold uppercase tracking-widest text-[11px] active:scale-95 transition-transform bg-primary/20 rounded-xl sm:bg-slate-900 sm:px-8 sm:min-w-36"
                        >
                            <span className="material-icons-round text-lg">code</span>
                            Github
                        </a>
                        <a
                            href={(project as any).documentUrl}
                            download
                            className="flex items-center justify-center gap-2 px-3 py-3 text-white font-bold uppercase tracking-widest text-[11px] active:scale-95 transition-transform bg-white/10 rounded-xl sm:bg-slate-800 sm:px-8 sm:min-w-36"
                        >
                            <span className="material-icons-round text-lg">download</span>
                            PDF
                        </a>
                    </div>
                </div>
            ) : isMainOrigin && 'githubUrl' in project && (project as any).githubUrl ? (
                <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 py-4 bg-slate-900 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-50 sm:static sm:mb-8 sm:bg-transparent sm:shadow-none sm:py-0 sm:flex sm:justify-center">
                    <a
                        href={(project as any).githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-3 py-3 text-white font-bold uppercase tracking-widest text-xs active:scale-95 transition-transform bg-primary/20 rounded-xl sm:w-auto sm:bg-slate-900 sm:px-8 sm:min-w-36"
                    >
                        <span className="material-icons-round text-lg">code</span>
                        Github
                    </a>
                </div>
            ) : isMainOrigin && 'storeUrl' in project && (project as any).storeUrl ? (
                <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 py-4 bg-slate-900 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-50 sm:static sm:mb-8 sm:bg-transparent sm:shadow-none sm:py-0">
                    <a
                        href={(project as any).storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 uppercase tracking-widest text-xs active:scale-95 transition-transform bg-primary/20 rounded-xl sm:bg-slate-900"
                    >
                        <span className="material-icons-round text-lg">shop</span>
                        Google Store
                    </a>
                </div>
            ) : !isMainOrigin ? (
                <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 py-4 bg-slate-900 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-50 sm:static sm:mb-8 sm:bg-transparent sm:shadow-none sm:py-0">
                    {'githubUrl' in project && (project as any).githubUrl ? (
                        <a
                            href={(project as any).githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 uppercase tracking-widest text-xs active:scale-95 transition-transform bg-white/10 rounded-xl hover:bg-white/20 sm:bg-slate-900"
                        >
                            <span className="material-icons-round text-lg">code</span>
                            Github
                        </a>
                    ) : (
                        <button className="w-full flex items-center justify-center gap-2 text-slate-500 font-bold py-3 uppercase tracking-widest text-xs active:scale-95 transition-transform bg-white/5 rounded-xl cursor-not-allowed">
                            <span className="material-icons-round text-lg">code</span>
                            Private Repository
                        </button>
                    )}
                </div>
            ) : null}

            {selectedScreenshot && (
                <div className="fixed inset-0 z-[60] bg-slate-950/80 p-4 flex items-center justify-center" onClick={() => setSelectedScreenshot(null)}>
                    <button
                        type="button"
                        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center"
                        aria-label="확대 이미지 닫기"
                    >
                        <span className="material-icons-round">close</span>
                    </button>
                    <img src={selectedScreenshot} alt="확대된 프로젝트 자료" className="max-h-full max-w-full rounded-2xl object-contain bg-white" />
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;
