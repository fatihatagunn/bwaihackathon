import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db, loginWithGoogle, logout } from './lib/firebase';
import { Project } from './types';
import { Navbar } from './components/Navbar';
import { ProjectGrid } from './components/ProjectGrid';
import { AddProjectModal } from './components/AddProjectModal';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Layout, ExternalLink } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Sync user to Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(userRef, {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          lastLogin: serverTimestamp()
        }, { merge: true });
      }
      setLoading(false);
    });

    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribeProjects = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Project, 'id'>)
      }));
      setProjects(projectsData);
    }, (error) => {
      console.error("Firestore error:", error);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProjects();
    };
  }, []);

  const handleAddProject = async (projectData: { title: string; url: string; description: string }) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdBy: user.uid,
        creatorName: user.displayName || 'Anonim',
        createdAt: serverTimestamp(),
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Proje eklenirken bir hata oluştu.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E4E3E0] flex items-center justify-center font-sans">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#141414] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans">
      <Navbar user={user} onLogin={loginWithGoogle} onLogout={logout} />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#141414] pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Layout className="w-5 h-5 opacity-40" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] opacity-40">2026 Hackathon Vitrini</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-none italic font-serif">
              Geleceği İnşa Et.
            </h1>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <a 
              href="https://bwai.gdgtrabzon.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-widest font-mono opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2"
            >
              Etkinlik Sayfasına Git <ExternalLink className="w-3 h-3" />
            </a>
            {user && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-8 py-4 bg-[#141414] text-[#E4E3E0] rounded-full hover:scale-105 transition-transform active:scale-95 text-sm font-medium tracking-tight"
              >
                <Plus className="w-4 h-4" />
                Proje Ekle
              </button>
            )}
          </div>
        </header>

        <ProjectGrid projects={projects} />
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <AddProjectModal 
            onClose={() => setIsModalOpen(false)} 
            onSubmit={handleAddProject} 
          />
        )}
      </AnimatePresence>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-[#141414] mt-24 opacity-40 flex justify-between items-center text-[10px] uppercase tracking-widest font-mono">
        <span>© 2026 Hackathon Sergi</span>
        <div className="flex gap-8">
          <a href="#" className="hover:opacity-100 transition-opacity">Kurallar</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Hakkında</a>
        </div>
      </footer>
    </div>
  );
}
