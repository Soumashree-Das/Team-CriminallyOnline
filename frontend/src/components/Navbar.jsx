import React, { useState } from 'react';
import { Flame, LogIn, LogOut, Search, Settings, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'DR';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <>
      <header className="bg-white text-[#22223B] border-b border-[#D7E3FC] shadow-sm sticky top-0 z-40 shrink-0">
        <div className="w-full px-4 sm:px-6">
          <div className="flex justify-between h-14 items-center gap-4">
            
            {/* Mobile Menu Toggle & Logo */}
            <div className="flex items-center space-x-3 shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#ABC4FF]/70 flex items-center justify-center shadow-sm shrink-0">
                  <img src="/images/education-logo.png" alt="" aria-hidden="true" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <span className="font-bold text-sm tracking-wider text-[#22223B] block leading-none">CAPACITY CONNECT</span>
                  <span className="text-[9px] uppercase font-bold text-[#22223B] tracking-widest mt-0.5 block">INSTITUTIONAL LMS & KG ENGINE</span>
                </div>
              </div>
            </div>

            {/* Middle Global Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-[#22223B]/70 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search learners, modules, or anything..."
                  className="w-full pl-9 pr-14 py-1.5 bg-[#EDF2FB] border border-[#D7E3FC] rounded-lg text-xs text-[#22223B] placeholder-[#22223B]/60 focus:outline-none focus:border-[#ABC4FF] transition-colors"
                />
                <span className="absolute right-2.5 top-2 text-[10px] font-mono text-[#22223B]/70 bg-white px-1.5 py-0.5 rounded border border-[#D7E3FC]">
                  Ctrl K
                </span>
              </div>
            </div>

            {/* Right Controls Panel */}
            <div className="flex items-center space-x-2.5 shrink-0">
              
              {/* Streak Badge (Trainee) */}
              {role === 'trainee' && user && (
                <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 bg-[#EDF2FB] border border-[#B6CCFE] text-[#22223B] text-xs font-semibold rounded-full" title="Active Learning Streak">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{user.streak_days ?? 1} Day Streak</span>
                </div>
              )}

              {/* Notification Bell */}
              <NotificationBell />

              {/* Settings & Sun Icons */}
              <button className="hidden sm:flex p-1.5 text-[#22223B]/70 hover:text-[#22223B] rounded-lg hover:bg-[#EDF2FB] transition-colors">
                <Settings className="w-4 h-4" />
              </button>
              <button className="hidden sm:flex p-1.5 text-[#22223B]/70 hover:text-[#22223B] rounded-lg hover:bg-[#EDF2FB] transition-colors">
                <Sun className="w-4 h-4" />
              </button>

              {/* Authenticated User Profile Chip */}
              {user ? (
                <div className="flex items-center space-x-2 pl-2 border-l border-[#D7E3FC]">
                  <div className="w-7 h-7 rounded-full bg-[#E2EAFC] text-[#22223B] flex items-center justify-center font-bold text-xs border border-[#ABC4FF]">
                    {getInitials(user.full_name)}
                  </div>
                  <div className="hidden xl:block text-left text-xs">
                    <p className="font-bold text-[#22223B] text-[11px] leading-tight truncate max-w-[130px]">
                      {user.full_name}
                    </p>
                    <p className="text-[10px] text-[#22223B] font-semibold capitalize">{role} Portal</p>
                  </div>
                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-1.5 text-[#22223B]/70 hover:text-red-600 hover:bg-[#EDF2FB] rounded-lg transition-colors ml-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-3 py-1 bg-[#ABC4FF] text-[#22223B] text-xs font-bold rounded-lg hover:bg-[#E2EAFC] transition-colors flex items-center space-x-1 shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Sign In / Register</span>
                </button>
              )}

            </div>

          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
