import React from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[#141414]/5 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-xl font-medium mb-2 italic serif">Henüz proje eklenmemiş.</h3>
        <p className="text-sm opacity-50 max-w-xs uppercase tracking-tighter font-mono">
          İlk bu heyecanı sen başlat ve projeni hemen yükle.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
