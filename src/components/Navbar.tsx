import { User } from 'firebase/auth';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export function Navbar({ user, onLogin, onLogout }: NavbarProps) {
  return (
    <nav className="border-b border-[#141414] px-6 py-6 flex items-center justify-between sticky top-0 bg-[#E4E3E0]/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path fill="#4285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <circle cx="12" cy="12" r="5" fill="#34A853"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tighter text-lg leading-none uppercase">Build with AI</span>
            <span className="text-[10px] uppercase tracking-widest font-mono opacity-50">GDG Trabzon</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-medium">{user.displayName}</span>
              <span className="text-[10px] opacity-40 uppercase tracking-tighter">{user.email}</span>
            </div>
            {user.photoURL ? (
              <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-[#141414]/10" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#141414]/10 flex items-center justify-center">
                <UserIcon className="w-4 h-4 opacity-40" />
              </div>
            )}
            <button 
              onClick={onLogout}
              className="p-2 hover:bg-[#141414]/5 rounded-full transition-colors"
              title="Çıkış Yap"
            >
              <LogOut className="w-5 h-5 opacity-60" />
            </button>
          </div>
        ) : (
          <button 
            onClick={onLogin}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#4285F4] text-white rounded-full text-sm font-medium hover:bg-[#3367D6] transition-colors shadow-lg shadow-blue-500/20"
          >
            <div className="bg-white p-1 rounded-full">
              <svg viewBox="0 0 24 24" className="w-3 h-3">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            Giris Yap (GDG)
          </button>
        )}
      </div>
    </nav>
  );
}
