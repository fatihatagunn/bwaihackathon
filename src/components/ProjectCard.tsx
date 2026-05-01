import React from 'react';
import { Project } from '../types';
import { motion } from 'motion/react';
import { ExternalLink, User, Calendar } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  key?: string;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const date = project.createdAt?.toDate?.()?.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) || 'Az önce';

  // Extract domain for a cleaner look
  const domain = new URL(project.url).hostname.replace('www.', '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <a 
        href={project.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative aspect-[16/10] bg-[#141414] rounded-lg overflow-hidden mb-6 shadow-2xl transition-transform group-hover:scale-[1.02]">
          {/* Iframe Preview Attempt - Many sites block this, but for dev projects it might work */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-white/5 z-10" />
          
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-[#141414]">
             <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#E4E3E0]/20 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-[#E4E3E0]" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#E4E3E0] opacity-30">{domain}</span>
             </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 flex gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
            <div className="w-2 h-2 rounded-full bg-[#E4E3E0]/20" />
            <div className="w-2 h-2 rounded-full bg-[#E4E3E0]/20" />
            <div className="w-2 h-2 rounded-full bg-[#E4E3E0]/30" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-medium tracking-tight leading-none group-hover:italic transition-all">
              {project.title}
            </h3>
            <span className="text-[11px] font-mono opacity-30 mt-1 uppercase tracking-tighter">0{index + 1}</span>
          </div>

          {project.description && (
            <p className="text-sm opacity-60 leading-relaxed line-clamp-2 italic font-serif">
              "{project.description}"
            </p>
          )}

          <div className="pt-4 border-t border-[#141414]/10 flex items-center justify-between">
            <div className="flex items-center gap-2 opacity-50">
              <User className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono uppercase tracking-widest">{project.creatorName}</span>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono uppercase tracking-widest">{date}</span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
