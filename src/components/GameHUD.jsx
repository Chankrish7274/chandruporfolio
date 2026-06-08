import { motion, AnimatePresence } from 'framer-motion'

/* ── Zone Info Data ── */
const ZONE_INFO = {
  gateway: null,
  academy: {
    title: '🏫 THE CODING ACADEMY',
    subtitle: 'Where it all began',
    content: [
      { type: 'text', value: '"Chandru started as a curious student who wanted to understand how websites work."' },
      { type: 'stats', items: [
        { icon: '👤', label: 'Name', value: 'Chandru P' },
        { icon: '🎓', label: 'Role', value: 'MERN Stack Developer' },
        { icon: '💼', label: 'Mode', value: 'Freelance Developer' },
        { icon: '🎯', label: 'Goal', value: 'Build Future-Ready Apps' },
      ]},
      { type: 'quote', value: 'Passionate Full Stack MERN Developer, creative Idea Builder, and Prompt Engineer skilled in integrating AI solutions and analyzing usage data.' },
    ],
    color: '#ff3333',
  },
  frontend: {
    title: '🛣️ FRONTEND HIGHWAY',
    subtitle: 'Master of the visual realm',
    content: [
      { type: 'skills', items: [
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 90 },
        { name: 'JavaScript', level: 88 },
        { name: 'React.js', level: 92 },
        { name: 'Tailwind CSS', level: 85 },
      ]},
    ],
    color: '#ffffff',
  },
  backend: {
    title: '🏭 BACKEND FACTORY',
    subtitle: 'Building the engine room',
    content: [
      { type: 'skills', items: [
        { name: 'Node.js', level: 90 },
        { name: 'Express.js', level: 88 },
        { name: 'REST APIs', level: 85 },
        { name: 'JWT Auth', level: 82 },
      ]},
    ],
    color: '#ff1a1a',
  },
  database: {
    title: '🏙️ DATABASE CITY',
    subtitle: 'Where data lives and breathes',
    content: [
      { type: 'skills', items: [
        { name: 'MongoDB', level: 85 },
        { name: 'MySQL', level: 78 },
      ]},
      { type: 'tools', items: ['Git','GitHub','VS Code','Postman'] },
    ],
    color: '#ff4444',
  },
  projects: {
    title: '🌌 PROJECT GALAXY',
    subtitle: 'Each planet holds a creation',
    content: [
      { type: 'projects', items: [
        { name: 'Bench Allocation System', tech: 'React · Node · MongoDB', icon: '🏢' },
        { name: 'Food Ordering System', tech: 'React · Express · MongoDB', icon: '🍕' },
        { name: 'Resume Analyzer', tech: 'React · Node · Python', icon: '📄' },
        { name: 'Secure Login System', tech: 'React · JWT · bcrypt', icon: '🔐' },
        { name: 'Video Chat App', tech: 'WebRTC · Socket.io · React', icon: '📹' },
        { name: 'Movie Ticket Booking', tech: 'React Native · MongoDB', icon: '🎬' },
      ]},
    ],
    color: '#ffffff',
  },
  freelance: {
    title: '🚀 FREELANCER STATION',
    subtitle: 'Open for business worldwide',
    content: [
      { type: 'services', items: [
        'Full Stack Web Development',
        'MERN Stack Applications',
        'Responsive Website Design',
        'REST API Development',
        'Portfolio Websites',
        'E-commerce Solutions',
      ]},
    ],
    color: '#ff3333',
  },
  temple: {
    title: '🏛️ AI DEVELOPER TEMPLE',
    subtitle: 'Journey Complete',
    content: [
      { type: 'final', value: 'You have completed the journey. Now you know who I am. Let\'s build something amazing together.' },
      { type: 'contact', items: [
        { icon: '📧', label: 'Email', value: 'chandrutech.p@gmail.com', href: 'mailto:chandrutech.p@gmail.com' },
        { icon: '📱', label: 'Phone', value: '9345469238', href: 'tel:+919345469238' },
        { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/chandru7274', href: 'https://www.linkedin.com/in/chandru7274' },
        { icon: '🐙', label: 'GitHub', value: 'github.com/Chankrish7274', href: 'https://github.com/Chankrish7274/' },
        { icon: '💬', label: 'WhatsApp', value: '9345469238', href: 'https://wa.me/919345469238' },
      ]},
    ],
    color: '#ffffff',
  },
}

/* ── Skill Bar ── */
function SkillBar({ name, level, color, delay }) {
  return (
    <motion.div style={{ marginBottom: 12 }}
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>{name}</span>
        <span style={{ fontSize: '0.75rem', color, fontFamily: "'Orbitron',sans-serif" }}>{level}%</span>
      </div>
      <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${level}%` }}
          transition={{ duration: 1.2, delay: delay + 0.2 }}
          style={{ height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${color}60, ${color})` }}
        />
      </div>
    </motion.div>
  )
}

/* ── Info Panel ── */
function InfoPanel({ info, onContinue }) {
  if (!info) return null
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(3,0,20,0.85)', backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{
        maxWidth: 600, width: '90%', maxHeight: '80vh', overflowY: 'auto',
        background: 'rgba(255,255,255,0.03)', border: `1px solid ${info.color}30`,
        borderRadius: 20, padding: '35px 30px', position: 'relative',
      }}>
        {/* Top glow */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${info.color},transparent)` }} />

        <motion.h2 initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'1.4rem', color:info.color,
            letterSpacing:3, textAlign:'center', marginBottom:5 }}>
          {info.title}
        </motion.h2>
        <p style={{ textAlign:'center', color:'rgba(255,255,255,0.4)', fontSize:'0.85rem',
          fontFamily:"'Orbitron',sans-serif", letterSpacing:2, marginBottom:25 }}>
          {info.subtitle}
        </p>

        {info.content.map((block, bi) => (
          <div key={bi} style={{ marginBottom: 20 }}>
            {block.type === 'text' && (
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem', lineHeight:1.8,
                fontStyle:'italic', textAlign:'center' }}>{block.value}</p>
            )}
            {block.type === 'quote' && (
              <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.95rem', lineHeight:1.7,
                borderLeft:`3px solid ${info.color}`, paddingLeft:15, margin:'15px 0' }}>{block.value}</p>
            )}
            {block.type === 'stats' && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                {block.items.map((s,i) => (
                  <motion.div key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                    transition={{ delay: i*0.1 }}
                    style={{ padding:'12px', background:'rgba(255,255,255,0.03)',
                      border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, textAlign:'center' }}>
                    <span style={{ fontSize:'1.3rem' }}>{s.icon}</span>
                    <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'0.55rem',
                      color:'rgba(255,255,255,0.3)', letterSpacing:2, margin:'4px 0 2px' }}>{s.label}</div>
                    <div style={{ color:info.color, fontSize:'0.9rem', fontWeight:600 }}>{s.value}</div>
                  </motion.div>
                ))}
              </div>
            )}
            {block.type === 'skills' && block.items.map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} color={info.color} delay={i * 0.1} />
            ))}
            {block.type === 'tools' && (
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:10 }}>
                {block.items.map(t => (
                  <span key={t} style={{ padding:'5px 14px', background:'rgba(255,255,255,0.04)',
                    border:'1px solid rgba(255,255,255,0.08)', borderRadius:20,
                    fontSize:'0.78rem', color:info.color }}>{t}</span>
                ))}
              </div>
            )}
            {block.type === 'projects' && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {block.items.map((p,i) => (
                  <motion.div key={i} initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                    transition={{ delay:i*0.08 }}
                    style={{ padding:'14px', background:'rgba(255,255,255,0.03)',
                      border:'1px solid rgba(255,255,255,0.06)', borderRadius:12 }}>
                    <span style={{ fontSize:'1.5rem' }}>{p.icon}</span>
                    <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'0.7rem',
                      color:info.color, letterSpacing:1, margin:'6px 0 4px' }}>{p.name}</div>
                    <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.4)' }}>{p.tech}</div>
                  </motion.div>
                ))}
              </div>
            )}
            {block.type === 'services' && (
              <div style={{ display:'grid', gap:8 }}>
                {block.items.map((s,i) => (
                  <motion.div key={i} initial={{ x:-20, opacity:0 }} animate={{ x:0, opacity:1 }}
                    transition={{ delay:i*0.08 }}
                    style={{ padding:'12px 18px', background:'rgba(255,255,255,0.03)',
                      border:'1px solid rgba(255,255,255,0.06)', borderRadius:10,
                      display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:info.color,
                      boxShadow:`0 0 10px ${info.color}` }} />
                    <span style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.9rem' }}>{s}</span>
                  </motion.div>
                ))}
              </div>
            )}
            {block.type === 'final' && (
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
                style={{ fontSize:'1.15rem', color:'rgba(255,255,255,0.8)', lineHeight:1.8,
                  textAlign:'center', padding:'20px 0' }}>
                "{block.value}"
              </motion.p>
            )}
            {block.type === 'contact' && (
              <div style={{ display:'grid', gap:10, marginTop:10 }}>
                {block.items.map((c,i) => {
                  const Comp = c.href ? 'a' : 'div'
                  return (
                    <Comp key={i} href={c.href} target={c.href?.startsWith('http') ? '_blank' : undefined} rel={c.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 16px',
                        background:'rgba(255,255,255,0.03)', borderRadius:10, textDecoration: 'none', color: 'inherit',
                        border: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.3s',
                        pointerEvents: 'all', cursor: 'pointer' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = `${info.color}40` }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)' }}>
                      <span style={{ fontSize:'1.3rem' }}>{c.icon}</span>
                      <div>
                        <div style={{ fontSize:'0.6rem', color:'rgba(255,255,255,0.3)',
                          fontFamily:"'Orbitron',sans-serif", letterSpacing:2 }}>{c.label}</div>
                        <div style={{ color:info.color, fontSize:'0.88rem' }}>{c.value}</div>
                      </div>
                    </Comp>
                  )
                })}
              </div>
            )}
          </div>
        ))}

        <motion.button onClick={onContinue}
          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
          whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
          style={{
            width:'100%', marginTop:15, padding:'14px', background:'transparent',
            border:`2px solid ${info.color}`, color:info.color, borderRadius:50,
            fontFamily:"'Orbitron',sans-serif", fontSize:'0.8rem', letterSpacing:3,
            cursor:'pointer', transition:'all 0.3s',
          }}>
          {info.title.includes('TEMPLE') ? '🏆 HIRE ME / CONTINUE' : '▶ CONTINUE JOURNEY'}
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ── Main HUD ── */
export default function GameHUD({ gameState, onContinue, onStart, onRecruiterMode }) {
  const { phase, currentZone, collected, speed, achievements } = gameState
  const zoneData = ZONE_INFO[currentZone]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none' }}>

      {/* START SCREEN — Securify-inspired premium hero */}
      <AnimatePresence>
        {phase === 'menu' && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0, transition:{duration:0.6} }}
            style={{ position:'absolute', inset:0, pointerEvents:'all', zIndex:200, overflow:'hidden' }}>

            {/* ── Floating Pill Navbar ── */}
            <motion.nav initial={{ y:-40, opacity:0 }} animate={{ y:0, opacity:1 }}
              transition={{ delay:0.3, duration:0.8 }}
              style={{ position:'absolute', top:0, left:0, right:0, zIndex:20,
                padding:'20px clamp(20px,5vw,40px)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
              {/* Left pill — brand */}
              <div style={{ display:'flex', alignItems:'center', gap:10,
                background:'rgba(10,10,10,0.9)', backdropFilter:'blur(16px)',
                borderRadius:999, padding:'10px 24px 10px 16px', border:'1px solid rgba(255,26,26,0.15)' }}>
                <div style={{ width:22, height:22, borderRadius:6,
                  background:'linear-gradient(135deg,#ff1a1a,#cc0000)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem' }}>⚡</div>
                <span style={{ color:'#fff', fontSize:'0.88rem', fontFamily:"'Orbitron',sans-serif",
                  fontWeight:500, letterSpacing:1 }}>chandru.p</span>
              </div>
              {/* Center pill — nav links (hidden mobile) */}
              <div className="nav-center-pill" style={{ display:'none', alignItems:'center', gap:2,
                background:'rgba(10,10,10,0.9)', backdropFilter:'blur(16px)',
                borderRadius:999, padding:'6px 8px', border:'1px solid rgba(255,26,26,0.1)' }}>
                {['about','skills','projects','contact'].map(l => (
                  <span key={l} style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.82rem',
                    fontFamily:"'Inter',sans-serif", padding:'8px 18px', borderRadius:999,
                    cursor:'pointer', transition:'color 0.2s', letterSpacing:0.5 }}
                    onMouseEnter={e => e.target.style.color='#fff'}
                    onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.55)'}>{l}</span>
                ))}
              </div>
              {/* Right — CTA buttons */}
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <button onClick={onRecruiterMode} style={{
                  background:'rgba(10,10,10,0.9)', backdropFilter:'blur(16px)',
                  border:'1px solid rgba(255,26,26,0.15)', color:'rgba(255,255,255,0.6)',
                  fontSize:'0.78rem', fontFamily:"'Inter',sans-serif",
                  borderRadius:999, padding:'10px 20px', cursor:'pointer', transition:'all 0.2s',
                }} onMouseEnter={e => e.target.style.color='#fff'}
                   onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>recruiter mode</button>
                <button onClick={onStart} style={{
                  background:'#fff', color:'#000', fontSize:'0.78rem',
                  fontFamily:"'Inter',sans-serif", fontWeight:500,
                  borderRadius:999, padding:'10px 22px', border:'none', cursor:'pointer',
                  transition:'background 0.2s',
                }} onMouseEnter={e => e.target.style.background='#e0e0e0'}
                   onMouseLeave={e => e.target.style.background='#fff'}>enter world</button>
              </div>
            </motion.nav>

            {/* ── Giant Staggered Typography ── */}
            <div style={{ position:'relative', height:'100%', width:'100%' }}>
              {/* Line 1 — "chandru" */}
              <motion.h1 className="hero-title"
                initial={{ x:-100, opacity:0 }} animate={{ x:0, opacity:1 }}
                transition={{ delay:0.6, duration:1, ease:[0.22,1,0.36,1] }}
                style={{ position:'absolute', left:'clamp(16px,4vw,40px)', top:'18%',
                  fontFamily:"'Orbitron',sans-serif", fontWeight:500, color:'#fff',
                  fontSize:'clamp(3rem,13vw,12rem)', letterSpacing:'-0.04em', lineHeight:0.95,
                  textTransform:'lowercase', margin:0 }}>
                chandru
              </motion.h1>

              {/* Line 2 — "full stack" */}
              <motion.h1 className="hero-title"
                initial={{ x:100, opacity:0 }} animate={{ x:0, opacity:1 }}
                transition={{ delay:0.85, duration:1, ease:[0.22,1,0.36,1] }}
                style={{ position:'absolute', right:'clamp(16px,4vw,40px)', top:'40%',
                  fontFamily:"'Orbitron',sans-serif", fontWeight:500, color:'#fff',
                  fontSize:'clamp(2.8rem,12vw,11rem)', letterSpacing:'-0.04em', lineHeight:0.95,
                  textTransform:'lowercase', margin:0, textAlign:'right' }}>
                developer
              </motion.h1>

              {/* Line 3 — "& freelancer" */}
              <motion.h1 className="hero-title"
                initial={{ y:60, opacity:0 }} animate={{ y:0, opacity:1 }}
                transition={{ delay:1.1, duration:1, ease:[0.22,1,0.36,1] }}
                style={{ position:'absolute', left:'clamp(18%,28%,30%)', top:'60%',
                  fontFamily:"'Orbitron',sans-serif", fontWeight:500,
                  fontSize:'clamp(2rem,8vw,7rem)', letterSpacing:'-0.04em', lineHeight:0.95,
                  textTransform:'lowercase', margin:0,
                  background:'linear-gradient(135deg,#ff1a1a,#ff4444)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                & freelancer
              </motion.h1>

              {/* ── Description paragraph ── */}
              <motion.p initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:1.5, duration:0.8 }}
                style={{ position:'absolute', left:'clamp(20px,4vw,40px)', top:'47%',
                  maxWidth:260, fontSize:'0.9rem', lineHeight:1.55,
                  color:'rgba(255,255,255,0.7)', fontFamily:"'Inter',sans-serif" }}>
                building future-ready web applications with the mern stack, empowering businesses with scalable digital solutions
              </motion.p>

              {/* ── Stat: Top Right ── */}
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay:1.8 }}
                style={{ position:'absolute', right:'clamp(20px,6vw,96px)', top:'14%', textAlign:'right' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, justifyContent:'flex-end' }}>
                  <div className="stat-divider" style={{ height:1, width:96,
                    background:'rgba(255,255,255,0.3)', transform:'rotate(20deg)' }} />
                  <span style={{ fontSize:'clamp(2rem,4vw,3.2rem)', fontFamily:"'Orbitron',sans-serif",
                    fontWeight:500, color:'#fff', letterSpacing:'-0.02em' }}>+10</span>
                </div>
                <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.5)', marginTop:4,
                  fontFamily:"'Inter',sans-serif" }}>projects built</p>
              </motion.div>

              {/* ── Stat: Bottom Left ── */}
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay:2 }}
                style={{ position:'absolute', left:'clamp(20px,5vw,80px)', bottom:'clamp(80px,10vh,96px)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ fontSize:'clamp(2rem,4vw,3.2rem)', fontFamily:"'Orbitron',sans-serif",
                    fontWeight:500, color:'#fff', letterSpacing:'-0.02em' }}>+6</span>
                  <div className="stat-divider" style={{ height:1, width:96,
                    background:'rgba(255,255,255,0.3)', transform:'rotate(-20deg)' }} />
                </div>
                <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.5)', marginTop:4,
                  fontFamily:"'Inter',sans-serif" }}>technologies mastered</p>
              </motion.div>

              {/* ── Stat: Bottom Right ── */}
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay:2.2 }}
                style={{ position:'absolute', right:'clamp(20px,5vw,80px)', bottom:'clamp(60px,8vh,80px)', textAlign:'right' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, justifyContent:'flex-end' }}>
                  <div className="stat-divider" style={{ height:1, width:96,
                    background:'rgba(255,255,255,0.3)', transform:'rotate(-20deg)' }} />
                  <span style={{ fontSize:'clamp(2rem,4vw,3.2rem)', fontFamily:"'Orbitron',sans-serif",
                    fontWeight:500, color:'#fff', letterSpacing:'-0.02em' }}>∞</span>
                </div>
                <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.5)', marginTop:4,
                  fontFamily:"'Inter',sans-serif" }}>passion for code</p>
              </motion.div>

              {/* ── Enter World CTA — centered bottom ── */}
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:2.5 }}
                style={{ position:'absolute', bottom:'clamp(80px,10vh,96px)', left:'50%',
                  transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
                <button onClick={onStart} style={{
                  padding:'14px 48px', background:'transparent',
                  border:'1.5px solid rgba(255,26,26,0.7)', color:'#ff1a1a',
                  fontFamily:"'Orbitron',sans-serif", fontSize:'0.78rem', letterSpacing:4,
                  borderRadius:999, cursor:'pointer', transition:'all 0.3s', pointerEvents:'all',
                }}
                  onMouseEnter={e => { e.target.style.background='rgba(255,26,26,0.12)'; e.target.style.boxShadow='0 0 40px rgba(255,26,26,0.3)' }}
                  onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.boxShadow='none' }}>
                  ⚡ enter world
                </button>
                <span style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.25)',
                  fontFamily:"'Inter',sans-serif", letterSpacing:1 }}>
                  W/A/S/D or arrow keys to move · collect orbs to discover skills
                </span>
              </motion.div>

              {/* ── Bottom gradient overlay ── */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'12rem',
                background:'linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))',
                pointerEvents:'none' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GAME HUD */}
      {phase === 'playing' && (
        <>
          {/* Zone indicator */}
          <div style={{ position:'absolute', top:20, left:'50%', transform:'translateX(-50%)',
            padding:'8px 25px', background:'rgba(0,0,0,0.8)', border:'1px solid rgba(255,26,26,0.3)',
            borderRadius:30, backdropFilter:'blur(10px)', pointerEvents:'none' }}>
            <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'0.7rem', color:'#ff1a1a',
              letterSpacing:3 }}>
              {ZONE_INFO[currentZone]?.title?.replace(/[^\w\s]/g,'').trim() || 'CYBER GATEWAY'}
            </span>
          </div>

          {/* Collected counter */}
          <div style={{ position:'absolute', top:20, left:20,
            padding:'8px 18px', background:'rgba(0,0,0,0.8)', border:'1px solid rgba(255,255,255,0.15)',
            borderRadius:15, backdropFilter:'blur(10px)' }}>
            <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'0.65rem', color:'#ffffff',
              letterSpacing:2 }}>⭐ {collected.length} SKILLS</span>
          </div>

          {/* Speed */}
          <div style={{ position:'absolute', top:20, right:20,
            padding:'8px 18px', background:'rgba(0,0,0,0.8)', border:'1px solid rgba(255,26,26,0.2)',
            borderRadius:15, backdropFilter:'blur(10px)' }}>
            <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'0.65rem', color:'#ff1a1a',
              letterSpacing:2 }}>⚡ {speed.toFixed(0)} m/s</span>
          </div>

          {/* Controls hint */}
          <div style={{ position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)',
            padding:'8px 20px', background:'rgba(0,0,0,0.6)', borderRadius:20,
            backdropFilter:'blur(5px)' }}>
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.7rem',
              color:'rgba(255,255,255,0.3)', letterSpacing:1 }}>
              W/↑ Forward · A/← Left · D/→ Right · S/↓ Slow
            </span>
          </div>

          {/* Collected skills popup */}
          <AnimatePresence>
            {collected.length > 0 && (
              <motion.div key={collected[collected.length-1]}
                initial={{ opacity:0, y:20, x:'-50%' }} animate={{ opacity:1, y:0, x:'-50%' }}
                exit={{ opacity:0, y:-20, x:'-50%' }}
                style={{ position:'absolute', bottom:60, left:'50%',
                  padding:'8px 20px', background:'rgba(255,26,26,0.15)',
                  border:'1px solid rgba(255,26,26,0.3)', borderRadius:20 }}>
                <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'0.7rem',
                  color:'#ff4444', letterSpacing:2 }}>
                  ✨ Collected: {collected[collected.length-1]}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Achievement badges */}
          <div style={{ position:'absolute', bottom:20, right:20, display:'flex', gap:5 }}>
            {achievements.map(a => (
              <motion.div key={a} initial={{ scale:0 }} animate={{ scale:1 }}
                style={{ width:35, height:35, borderRadius:'50%',
                  background:'rgba(255,26,26,0.15)', border:'1px solid rgba(255,26,26,0.4)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem' }}>
                {a === 'explorer' ? '🏆' : a === 'master' ? '🏅' : '🌟'}
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* ZONE INFO PANEL */}
      <AnimatePresence>
        {phase === 'zone-info' && zoneData && (
          <div style={{ pointerEvents: 'all' }}>
            <InfoPanel info={zoneData} onContinue={onContinue} />
          </div>
        )}
      </AnimatePresence>

      {/* GAME COMPLETE PANEL */}
      <AnimatePresence>
        {phase === 'complete' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(3,0,20,0.9)', backdropFilter: 'blur(12px)',
              pointerEvents: 'all',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20 }}
              style={{
                maxWidth: 500, width: '90%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,26,26,0.3)',
                boxShadow: '0 0 50px rgba(255,26,26,0.15)',
                borderRadius: 24, padding: '40px 30px',
                position: 'relative', textAlign: 'center',
              }}
            >
              {/* Top glow */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#ff1a1a,transparent)' }} />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                style={{ fontSize: '3.5rem', marginBottom: 15 }}
              >
                🏆
              </motion.div>

              <h2 style={{
                fontFamily: "'Orbitron',sans-serif", fontSize: '1.8rem', color: '#ffffff',
                letterSpacing: 4, textShadow: '0 0 10px rgba(255,255,255,0.3)', marginBottom: 10
              }}>
                JOURNEY COMPLETE
              </h2>
              
              <p style={{
                color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem',
                fontFamily: "'Inter',sans-serif", marginBottom: 30, lineHeight: 1.6
              }}>
                You have successfully navigated the cyberpunk grid and discovered Chandru's full developer profile.
              </p>

              {/* Stats Grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginBottom: 35
              }}>
                <div style={{
                  padding: '16px', background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16
                }}>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontFamily: "'Orbitron',sans-serif", letterSpacing: 2, marginBottom: 4 }}>
                    SKILLS UNLOCKED
                  </div>
                  <div style={{ fontSize: '1.4rem', color: '#ff1a1a', fontWeight: 700, fontFamily: "'Orbitron',sans-serif" }}>
                    {collected.length} / 16
                  </div>
                </div>

                <div style={{
                  padding: '16px', background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16
                }}>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontFamily: "'Orbitron',sans-serif", letterSpacing: 2, marginBottom: 4 }}>
                    ACHIEVEMENTS
                  </div>
                  <div style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: 600, fontFamily: "'Orbitron',sans-serif", marginTop: 4 }}>
                    {achievements.length} / 3
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button
                  onClick={onRecruiterMode}
                  style={{
                    width: '100%', padding: '16px',
                    background: '#ffffff', color: '#000000',
                    border: 'none', borderRadius: 50,
                    fontFamily: "'Orbitron',sans-serif", fontSize: '0.8rem',
                    fontWeight: 600, letterSpacing: 3, cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => e.target.style.background = '#e0e0e0'}
                  onMouseLeave={e => e.target.style.background = '#ffffff'}
                >
                  📁 EXPLORE PORTFOLIO
                </button>

                <button
                  onClick={onStart}
                  style={{
                    width: '100%', padding: '16px',
                    background: 'rgba(255,26,26,0.1)', color: '#ff1a1a',
                    border: '1px solid rgba(255,26,26,0.3)', borderRadius: 50,
                    fontFamily: "'Orbitron',sans-serif", fontSize: '0.8rem',
                    fontWeight: 600, letterSpacing: 3, cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => { e.target.style.background = 'rgba(255,26,26,0.2)'; e.target.style.borderColor = '#ff1a1a' }}
                  onMouseLeave={e => { e.target.style.background = 'rgba(255,26,26,0.1)'; e.target.style.borderColor = 'rgba(255,26,26,0.3)' }}
                >
                  🔄 PLAY AGAIN
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { ZONE_INFO }
