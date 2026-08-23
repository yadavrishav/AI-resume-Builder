import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, History, PlusCircle, LogOut, User, Menu, X } from 'lucide-react'

const Navbar = () => {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const onLogout = async () => {
    await handleLogout()
    setMobileMenuOpen(false)
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-[#07090e]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20"
          >
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </div>
          </motion.div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
              Interview<span className="text-cyan-400">AI</span>
            </span>
            <span className="text-[9px] font-semibold tracking-wider text-slate-400 uppercase -mt-1">
              Smart Prep Assistant
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <nav className="flex items-center gap-2">
                <Link to="/" className="relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all">
                  {isActive('/') && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-lg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-1.5 ${isActive('/') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}>
                    <PlusCircle className="w-4 h-4" />
                    <span>New Assessment</span>
                  </span>
                </Link>

                <Link to="/history" className="relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all">
                  {isActive('/history') && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-lg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-1.5 ${isActive('/history') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}>
                    <History className="w-4 h-4" />
                    <span>Past Reports</span>
                  </span>
                </Link>
              </nav>

              <div className="h-5 w-px bg-slate-800" />

              {/* User Profile Badge */}
              <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {user.username ? user.username[0].toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-semibold text-slate-200 max-w-[130px] truncate">
                  {user.username}
                </span>
              </div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onLogout}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </motion.button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-lg shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-800 bg-[#07090e]/95 backdrop-blur-2xl px-4 py-4 space-y-3"
          >
            {user ? (
              <>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                    {user.username ? user.username[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{user.username}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>

                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive('/') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>New Assessment</span>
                </Link>

                <Link
                  to="/history"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive('/history') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span>Past Reports</span>
                </Link>

                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-cyan-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
