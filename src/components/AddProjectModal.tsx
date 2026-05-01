import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Globe, Type, AlignLeft } from 'lucide-react';

interface AddProjectModalProps {
  onClose: () => void;
  onSubmit: (data: { title: string; url: string; description: string }) => void;
}

export function AddProjectModal({ onClose, onSubmit }: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;
    
    // Simple URL validation
    try {
      new URL(formData.url);
    } catch {
      alert("Geçerli bir URL giriniz.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#E4E3E0]/80 backdrop-blur-xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-xl bg-[#141414] text-[#E4E3E0] rounded-3xl p-10 shadow-[0_0_80px_rgba(0,0,0,0.1)]"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 hover:bg-[#E4E3E0]/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <header className="mb-12">
          <div className="text-[10px] uppercase font-mono tracking-[0.4em] opacity-40 mb-3 italic">Yeni Sunum</div>
          <h2 className="text-4xl font-medium tracking-tight font-serif italic">Projeyi Sahneye Çıkar.</h2>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-widest opacity-40 flex items-center gap-2">
              <Type className="w-3 h-3" />
              Proje Adı
            </label>
            <input 
              required
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Göz alıcı bir isim..."
              className="w-full bg-transparent border-b border-[#E4E3E0]/20 pb-4 text-xl outline-none focus:border-[#E4E3E0] transition-colors placeholder:opacity-20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-widest opacity-40 flex items-center gap-2">
              <Globe className="w-3 h-3" />
              Site URL (Live Link)
            </label>
            <input 
              required
              type="url"
              value={formData.url}
              onChange={e => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://projeniz.com"
              className="w-full bg-transparent border-b border-[#E4E3E0]/20 pb-4 text-xl outline-none focus:border-[#E4E3E0] transition-colors placeholder:opacity-20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-widest opacity-40 flex items-center gap-2">
              <AlignLeft className="w-3 h-3" />
              Kısa Açıklama
            </label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Bu proje dünyayı nasıl değiştiriyor?"
              rows={3}
              className="w-full bg-transparent border-b border-[#E4E3E0]/20 pb-4 text-lg outline-none focus:border-[#E4E3E0] transition-colors placeholder:opacity-20 resize-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-[#E4E3E0] text-[#141414] rounded-2xl font-bold tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-transform text-lg"
          >
            Sisteme Kaydet
          </button>
        </form>
      </motion.div>
    </div>
  );
}
