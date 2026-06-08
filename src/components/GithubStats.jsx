import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { icon: '⭐', value: '50+', label: 'GitHub Stars', color: '#f97316' },
  { icon: '📦', value: '15+', label: 'Repositories', color: '#00d4ff' },
  { icon: '🔥', value: '200+', label: 'Contributions', color: '#10b981' },
  { icon: '🏆', value: '100+', label: 'LeetCode Problems', color: '#a855f7' },
]

export default function GithubStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} style={{
      padding: '60px 5%', maxWidth: '1200px', margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h3 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '1.2rem',
          color: '#00d4ff',
          letterSpacing: '3px',
        }}>📊 LIVE STATS DASHBOARD</h3>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass-card"
            style={{
              padding: '25px', textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: 10 }}>{stat.icon}</span>
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '2rem',
              fontWeight: 800,
              color: stat.color,
              marginBottom: 5,
            }}>{stat.value}</div>
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '2px',
            }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
