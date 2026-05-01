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
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#141414] rounded-sm flex items-center justify-center">
          <span className="text-[#E4E3E0] font-bold text-xs">H</span>
        </div>
        <span className="font-bold tracking-tighter text-lg">HACKATHON<span className="opacity-30">VİTRİNİ</span></span>
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
            className="flex items-center gap-2 px-5 py-2.5 bg-[#141414] text-[#E4E3E0] rounded-full text-sm font-medium hover:bg-[#252525] transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Giriş Yap
          </button>
        )}
      </div>
    </nav>
  );
}
