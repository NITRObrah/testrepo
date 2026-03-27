'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home as HomeIcon, Gamepad2, Film, Users, Settings, Heart, Scale, 
  Play, RotateCcw, Code, ExternalLink, GraduationCap, 
  Search, X, ChevronLeft, Clock, Zap, Eye, Shield, 
  Palette, Gauge, Sparkles, AlertTriangle
} from 'lucide-react'

// Games data
const gamesData = [
  { name: "1v1lol", image: "logo.png", url: "1v1lol" },
  { name: "1v1space", image: "splash.png", url: "1v1space" },
  { name: "10 Minutes Till Dawn", image: "splash.png", url: "10-minutes-till-dawn" },
  { name: "2048", image: "2048.png", url: "2048" },
  { name: "Among Us", image: "red.png", url: "among-us" },
  { name: "BitLife", image: "splash.png", url: "bitlife" },
  { name: "Cookie Clicker", image: "cookie1.jpeg", url: "cookie-clicker" },
  { name: "Drift Boss", image: "logo.png", url: "drift-boss" },
  { name: "Drive Mad", image: "logo.jpg", url: "drive-mad" },
  { name: "Flappy Bird", image: "flappybird.jpg", url: "flappy-bird" },
  { name: "Friday Night Funkin'", image: "fnf-icon.jpg", url: "fridaynightfunkin" },
  { name: "Minecraft Classic", image: "pack.png", url: "minecraft-classic" },
  { name: "Moto X3M", image: "splash.jpg", url: "motox3m" },
  { name: "Paper.io 2", image: "images/icon512.png", url: "paperio2" },
  { name: "Retro Bowl", image: "img/icon.jpg", url: "retro-bowl" },
  { name: "Slope", image: "slope4.jpeg", url: "slope" },
  { name: "Smash Karts", image: "images/icon-512.png", url: "smashkarts" },
  { name: "Subway Surfers", image: "img/splash.jpg", url: "subway-surfers" },
  { name: "Vex 7", image: "assets/icon.png", url: "vex7" },
  { name: "Wordle", image: "img/logo_512x512.png", url: "wordle" },
  { name: "Krunker", image: "img/krunker-io.jpg", url: "krunker" },
  { name: "Shell Shockers", image: "img/favicon.png", url: "shellshockers" },
  { name: "Geometry Dash", image: "geoscratchicon.png", url: "geodash" },
  { name: "Doodle Jump", image: "doodle.png", url: "doodle-jump" },
  { name: "Crossy Road", image: "crossyroad.png", url: "crossyroad" },
  { name: "Temple Run 2", image: "img/temple-run-2-256.png", url: "temple-run-2" },
  { name: "Happy Hop", image: "splash.png", url: "happy-hop" },
  { name: "Stack", image: "stack.png", url: "stack" },
  { name: "Tunnel Rush", image: "img/tunnel.jpg", url: "tunnel-rush" },
  { name: "Death Run 3D", image: "img/death.png", url: "death-run-3d" },
]

const GAME_BASE = 'https://gms.parcoil.com'

const cloakConfig: Record<string, { title: string; favicon: string }> = {
  default: { title: 'sight.w', favicon: 'https://image2url.com/r2/default/images/1772114193046-733bfa71-77a7-4fdc-bce4-d3e8ebe17a29.png' },
  canvas: { title: 'Canvas LMS', favicon: 'https://canvas.instructure.com/favicon.ico' },
  google: { title: 'Google', favicon: 'https://www.google.com/favicon.ico' },
  drive: { title: 'Google Drive', favicon: 'https://drive.google.com/favicon.ico' }
}

const themes = ['dark', 'light', 'ocean', 'forest', 'sunset', 'neon']

// Storage helpers
const store = {
  get: (key: string) => { 
    if (typeof window === 'undefined') return null
    try { return localStorage.getItem(key) } catch { return null } 
  },
  set: (key: string, val: string) => { 
    if (typeof window === 'undefined') return
    try { localStorage.setItem(key, val) } catch {} 
  }
}

// Particles component
function Particles() {
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${15 + Math.random() * 10}s`,
      size: 2 + Math.random() * 4,
      color: ['#ff6b6b', '#4ecdc4', '#ffe66d'][Math.floor(Math.random() * 3)]
    }))
  , [])

  return (
    <div className="particles">
      {particles.map(p => (
        <div 
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            background: p.color,
          }}
        />
      ))}
    </div>
  )
}

// Loading Screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 300)
          return 100
        }
        return p + Math.random() * 15
      })
    }, 100)
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center aurora-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#ff6b6b] to-[#feca57] flex items-center justify-center mb-6 shadow-2xl"
      >
        <Sparkles className="w-12 h-12 text-white" />
      </motion.div>
      
      <motion.h1 
        className="text-4xl font-black neon-text mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        OPIUM BIRD
      </motion.h1>
      
      <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#4ecdc4] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      <motion.p 
        className="mt-4 text-white/50 text-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        loading experiences...
      </motion.p>
    </motion.div>
  )
}

// Panic Overlay
function PanicOverlay({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div 
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center bg-[#0a0a0f]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <GraduationCap className="w-24 h-24 text-red-500" />
          </motion.div>
          <motion.p 
            className="mt-6 text-2xl font-bold text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Redirecting to Classroom...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Dock Navigation
function Dock({ activePage, onNavigate, onSettings }: { 
  activePage: string
  onNavigate: (page: string) => void
  onSettings: () => void 
}) {
  const items = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'games', icon: Gamepad2, label: 'Games' },
    { id: 'movies', icon: Film, label: 'Movies' },
    { id: 'partners', icon: Users, label: 'Partners' },
  ]

  return (
    <motion.div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 dock"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring' }}
    >
      {items.map(({ id, icon: Icon, label }) => (
        <motion.button
          key={id}
          onClick={() => onNavigate(id)}
          className={`dock-item ${activePage === id ? 'active' : ''}`}
          whileHover={{ scale: 1.2, y: -12 }}
          whileTap={{ scale: 0.95 }}
          title={label}
        >
          <Icon className="w-6 h-6" />
        </motion.button>
      ))}
      <motion.button
        onClick={onSettings}
        className="dock-item"
        whileHover={{ scale: 1.2, y: -12 }}
        whileTap={{ scale: 0.95 }}
        title="Settings"
      >
        <Settings className="w-6 h-6" />
      </motion.button>
    </motion.div>
  )
}

// Home Page
function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-[#ff6b6b] via-[#feca57] to-[#4ecdc4] p-1 mb-8 shadow-2xl"
      >
        <div className="w-full h-full rounded-[1.8rem] bg-[#0a0a0f] flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-[#ff6b6b]" />
        </div>
      </motion.div>

      <motion.h1 
        className="text-6xl md:text-8xl font-black neon-text mb-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        OPIUM BIRD
      </motion.h1>
      
      <motion.p 
        className="text-white/50 text-lg mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        produced by sight.w
      </motion.p>

      {/* Time Widget */}
      <motion.div 
        className="glass-card px-8 py-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-4xl font-bold text-[#ff6b6b]">{time}</p>
        <p className="text-white/40 text-sm text-center mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </p>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-4 max-w-2xl w-full">
        <motion.div 
          className="glass-card-glow p-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -4 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b6b] to-[#feca57] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-lg">New Features</h3>
          </div>
          <ul className="text-white/60 text-sm space-y-2">
            <li>• Tab cloak - look like you're doing work</li>
            <li>• about:blank button - bypass filters</li>
            <li>• Panic button (P key) - instant redirect</li>
          </ul>
        </motion.div>

        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02, y: -4 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ecdc4] to-[#44a08d] flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-lg">Status</h3>
          </div>
          <p className="text-white/60 text-sm">Working on something new...</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 text-xs">All systems operational</span>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        className="flex gap-3 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <button 
          onClick={() => onNavigate('games')}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ff6b6b] to-[#feca57] text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-[#ff6b6b]/30 transition-shadow"
        >
          <Play className="w-5 h-5" /> Start Playing
        </button>
        <a 
          href="https://github.com/NITRObrah" 
          target="_blank"
          className="px-6 py-3 rounded-2xl glass-card font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors"
        >
          <ExternalLink className="w-5 h-5" /> GitHub
        </a>
      </motion.div>
    </motion.div>
  )
}

// Games Page
function GamesPage({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<'menu' | 'first' | 'second' | 'player'>('menu')
  const [search, setSearch] = useState('')
  const [currentGame, setCurrentGame] = useState<{ name: string; url: string } | null>(null)
  const [loading, setLoading] = useState(true)

  const filteredGames = useMemo(() => 
    gamesData.filter(g => g.name.toLowerCase().includes(search.toLowerCase()))
  , [search])

  const playGame = (game: { name: string; url: string }) => {
    setCurrentGame(game)
    setView('player')
    setLoading(true)
  }

  return (
    <motion.div 
      className="min-h-screen pb-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Menu View */}
      <AnimatePresence mode="wait">
        {view === 'menu' && (
          <motion.div 
            key="menu"
            className="min-h-screen flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-4xl font-black mb-8 neon-text">Choose Your Path</h2>
            
            <div className="flex flex-col md:flex-row gap-6 max-w-2xl w-full">
              <motion.button
                onClick={() => setView('first')}
                className="flex-1 glass-card-glow p-8 text-left"
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Gamepad2 className="w-12 h-12 text-[#ff6b6b] mb-4" />
                <h3 className="text-xl font-bold mb-2">1st Maths</h3>
                <p className="text-white/50">500+ activities to explore</p>
              </motion.button>

              <motion.button
                onClick={() => setView('second')}
                className="flex-1 glass-card-glow p-8 text-left relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#ff6b6b] text-xs font-bold">
                  RECOMMENDED
                </span>
                <Zap className="w-12 h-12 text-[#4ecdc4] mb-4" />
                <h3 className="text-xl font-bold mb-2">2nd Maths</h3>
                <p className="text-white/50">Iconic experiences await</p>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* First Games View */}
        {view === 'first' && (
          <motion.div 
            key="first"
            className="h-screen flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between p-4 glass-card m-4 rounded-2xl">
              <button onClick={() => setView('menu')} className="flex items-center gap-2 text-white/60 hover:text-white">
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <h3 className="font-bold">1st Maths</h3>
              <button 
                onClick={() => setView('first')}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
            <iframe 
              src="https://tight-breeze-9313.brayyy316.workers.dev/"
              className="flex-1 w-full border-0"
              allow="fullscreen *; gamepad *;"
            />
          </motion.div>
        )}

        {/* Second Games View */}
        {view === 'second' && (
          <motion.div 
            key="second"
            className="px-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Search */}
            <div className="sticky top-0 z-10 pb-4 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f] to-transparent pt-4">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff6b6b]/50"
                />
              </div>
            </div>

            {/* Games Grid */}
            <div className="bento-grid pb-4">
              {filteredGames.map((game, i) => (
                <motion.div
                  key={game.url}
                  className="bento-item group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => playGame(game)}
                >
                  <img 
                    src={`${GAME_BASE}/${game.url}/${game.image}`}
                    alt={game.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="font-semibold text-sm">{game.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Game Player */}
        {view === 'player' && currentGame && (
          <motion.div 
            key="player"
            className="h-screen flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between p-4 glass-card m-4 rounded-2xl">
              <button onClick={() => { setView('second'); setCurrentGame(null) }} className="flex items-center gap-2 text-white/60 hover:text-white">
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <h3 className="font-bold truncate max-w-[200px]">{currentGame.name}</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setLoading(true)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 relative">
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0f] z-10">
                  <div className="w-12 h-12 border-4 border-[#ff6b6b]/30 border-t-[#ff6b6b] rounded-full animate-spin-slow" />
                  <p className="mt-4 text-white/50">Loading game...</p>
                </div>
              )}
              <iframe 
                src={`${GAME_BASE}/${currentGame.url}/`}
                className="w-full h-full border-0"
                allow="fullscreen *; gamepad *; clipboard-write *; pointer-lock *;"
                onLoad={() => setLoading(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Movies Page
function MoviesPage() {
  return (
    <motion.div 
      className="h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between p-4 glass-card m-4 rounded-2xl">
        <h3 className="font-bold flex items-center gap-2">
          <Film className="w-5 h-5 text-[#ff6b6b]" /> Media
        </h3>
        <div className="flex gap-2">
          <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
      <iframe 
        src="https://www.fmovies.gd/home"
        className="flex-1 w-full border-0"
        allow="fullscreen *;"
      />
    </motion.div>
  )
}

// Partners Page
function PartnersPage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      className="min-h-screen pb-28 px-6 pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-black mb-8 text-center neon-text">Partners</h2>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <motion.a
          href="https://mathsight.fillout.com/sight"
          target="_blank"
          className="glass-card-glow p-8 text-center block"
          whileHover={{ scale: 1.02, y: -4 }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#feca57] flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">Partner Form</h3>
          <p className="text-white/50">Want to partner? Fill this out</p>
        </motion.a>

        <motion.div
          className="glass-card p-8 text-center"
          whileHover={{ scale: 1.02, y: -4 }}
        >
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">?</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Your Site?</h3>
          <p className="text-white/50">Use the form above</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Settings Modal
function SettingsModal({ open, onClose, onPanic }: { 
  open: boolean
  onClose: () => void
  onPanic: () => void 
}) {
  const [theme, setTheme] = useState('dark')
  const [cloak, setCloak] = useState('default')
  const [fpsBoost, setFpsBoost] = useState(true)
  const [blur, setBlur] = useState(true)

  useEffect(() => {
    setTheme(store.get('theme') || 'dark')
    setCloak(store.get('cloak') || 'default')
    setFpsBoost(store.get('fpsBooster') !== 'false')
    setBlur(store.get('blur') !== 'false')
  }, [open])

  const applyTheme = (t: string) => {
    setTheme(t)
    document.body.setAttribute('data-theme', t)
    store.set('theme', t)
  }

  const applyCloak = (c: string) => {
    setCloak(c)
    const config = cloakConfig[c]
    if (config) {
      document.title = config.title
      const link = document.createElement('link')
      link.rel = 'icon'
      link.href = config.favicon
      document.head.appendChild(link)
    }
    store.set('cloak', c)
  }

  const aboutBlank = () => {
    const win = window.open('about:blank', '_blank')
    if (win) {
      win.document.write(`<!DOCTYPE html><html><head><title>Classroom</title></head><body style="margin:0"><iframe src="${location.href}" style="width:100%;height:100vh;border:none"></iframe></body></html>`)
      win.document.close()
    }
  }

  if (!open) return null

  return (
    <motion.div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        className="relative glass-card p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#ff6b6b]" /> Settings
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4" /> Theme
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {themes.map(t => (
              <button
                key={t}
                onClick={() => applyTheme(t)}
                className={`py-3 rounded-xl font-medium capitalize transition-all ${
                  theme === t 
                    ? 'bg-[#ff6b6b]/20 border-2 border-[#ff6b6b] text-[#ff6b6b]' 
                    : 'bg-white/5 border border-white/10 hover:border-white/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Gauge className="w-4 h-4" /> Performance
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <span>FPS Booster</span>
              <button 
                onClick={() => { setFpsBoost(!fpsBoost); store.set('fpsBooster', String(!fpsBoost)) }}
                className={`w-12 h-6 rounded-full transition-colors ${fpsBoost ? 'bg-[#ff6b6b]' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${fpsBoost ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <span>Blur Effects</span>
              <button 
                onClick={() => { setBlur(!blur); store.set('blur', String(!blur)) }}
                className={`w-12 h-6 rounded-full transition-colors ${blur ? 'bg-[#ff6b6b]' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${blur ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Bypass */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Bypass
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={aboutBlank}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff6b6b]/50 flex flex-col items-center gap-2"
            >
              <ExternalLink className="w-6 h-6 text-[#ff6b6b]" />
              <span className="text-sm">about:blank</span>
            </button>
            <button 
              onClick={onPanic}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 hover:border-red-500 flex flex-col items-center gap-2 text-red-400"
            >
              <AlertTriangle className="w-6 h-6" />
              <span className="text-sm">Panic (P)</span>
            </button>
          </div>
        </div>

        {/* Tab Cloak */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4" /> Tab Cloak
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(cloakConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => applyCloak(key)}
                className={`p-3 rounded-xl flex items-center gap-3 transition-all ${
                  cloak === key 
                    ? 'bg-[#ff6b6b]/20 border-2 border-[#ff6b6b]' 
                    : 'bg-white/5 border border-white/10 hover:border-white/30'
                }`}
              >
                <img src={config.favicon} alt="" className="w-6 h-6 rounded" />
                <span className="capitalize text-sm">{key}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 pt-4 border-t border-white/10">
          <button 
            onClick={() => {}}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <Heart className="w-4 h-4" /> Credits
          </button>
          <button 
            onClick={() => {}}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <Scale className="w-4 h-4" /> Legal
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Stats Overlay
function StatsOverlay({ visible }: { visible: boolean }) {
  const [fps, setFps] = useState(60)
  const [ping, setPing] = useState('--')

  useEffect(() => {
    if (!visible) return
    
    let lastTime = performance.now()
    let frames = 0
    
    const measure = () => {
      frames++
      const now = performance.now()
      if (now - lastTime >= 1000) {
        setFps(Math.round(frames * 1000 / (now - lastTime)))
        frames = 0
        lastTime = now
      }
      requestAnimationFrame(measure)
    }
    requestAnimationFrame(measure)

    const pingInterval = setInterval(() => {
      const start = Date.now()
      fetch('https://www.google.com/favicon.ico', { mode: 'no-cors', cache: 'no-store' })
        .then(() => setPing(`${Date.now() - start}ms`))
        .catch(() => setPing('--'))
    }, 5000)

    return () => clearInterval(pingInterval)
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed top-4 right-4 glass-card p-3 text-xs space-y-1 z-50">
      <div className="flex justify-between gap-4">
        <span className="text-white/50">FPS</span>
        <span className={fps >= 50 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>{fps}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-white/50">Ping</span>
        <span>{ping}</span>
      </div>
    </div>
  )
}

// Keyboard Hints
function KeyboardHints() {
  return (
    <div className="fixed bottom-24 right-4 glass-card px-3 py-2 text-xs flex gap-4 z-40 hidden md:flex">
      <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 mr-1">A</kbd>Games</span>
      <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 mr-1">M</kbd>Movies</span>
      <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 mr-1">H</kbd>Home</span>
      <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 mr-1">P</kbd>Panic</span>
    </div>
  )
}

// Main App
export default function Home() {
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('home')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [panic, setPanic] = useState(false)

  const navigate = useCallback((p: string) => setPage(p), [])
  const triggerPanic = useCallback(() => {
    setPanic(true)
    setTimeout(() => window.location.href = 'https://classroom.google.com', 800)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key.toLowerCase() === 'a') navigate('games')
      if (e.key.toLowerCase() === 'm') navigate('movies')
      if (e.key.toLowerCase() === 'h') navigate('home')
      if (e.key.toLowerCase() === 'p') triggerPanic()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate, triggerPanic])

  return (
    <div className="aurora-bg min-h-screen text-white overflow-x-hidden">
      <Particles />
      
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <PanicOverlay active={panic} />

      <AnimatePresence mode="wait">
        {page === 'home' && <HomePage key="home" onNavigate={navigate} />}
        {page === 'games' && <GamesPage key="games" onBack={() => navigate('home')} />}
        {page === 'movies' && <MoviesPage key="movies" />}
        {page === 'partners' && <PartnersPage key="partners" onBack={() => navigate('home')} />}
      </AnimatePresence>

      <Dock 
        activePage={page} 
        onNavigate={navigate}
        onSettings={() => setSettingsOpen(true)}
      />

      <KeyboardHints />
      <StatsOverlay visible={false} />

      <AnimatePresence>
        {settingsOpen && (
          <SettingsModal 
            open={settingsOpen} 
            onClose={() => setSettingsOpen(false)}
            onPanic={triggerPanic}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
