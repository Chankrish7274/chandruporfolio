import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

export default function GlobeSection() {
  const ref = useRef(null)
  const canvasRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView || !canvasRef.current) return
    let active = true
    let animationFrameId
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const size = Math.min(400, window.innerWidth - 40)
    canvas.width = size
    canvas.height = size
    
    let angle = 0
    const cx = size / 2, cy = size / 2, r = size * 0.35

    const drawGlobe = () => {
      if (!active) return
      ctx.clearRect(0, 0, size, size)
      
      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 1.3)
      glow.addColorStop(0, 'rgba(0,212,255,0.05)')
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, size, size)

      // Globe outline
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0,212,255,0.3)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const latR = Math.cos((lat * Math.PI) / 180) * r
        const latY = cy + Math.sin((lat * Math.PI) / 180) * r
        ctx.beginPath()
        ctx.ellipse(cx, latY, latR, latR * 0.15, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0,212,255,0.12)'
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // Longitude lines
      for (let lon = 0; lon < 180; lon += 30) {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(((lon + angle) * Math.PI) / 180)
        ctx.beginPath()
        ctx.ellipse(0, 0, r * 0.2, r, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(168,85,247,0.12)'
        ctx.lineWidth = 0.8
        ctx.stroke()
        ctx.restore()
      }

      // Glowing dots (cities/locations)
      const dots = [
        { lat: 13, lon: 80, label: 'India', color: '#00d4ff' },
        { lat: 40, lon: -74, label: 'USA', color: '#a855f7' },
        { lat: 51, lon: 0, label: 'UK', color: '#ec4899' },
        { lat: 35, lon: 139, label: 'Japan', color: '#10b981' },
        { lat: -33, lon: 151, label: 'Australia', color: '#f97316' },
      ]

      dots.forEach(dot => {
        const lonRad = ((dot.lon + angle) * Math.PI) / 180
        const latRad = (dot.lat * Math.PI) / 180
        const x = cx + r * Math.cos(latRad) * Math.sin(lonRad)
        const y = cy - r * Math.sin(latRad)
        const z = Math.cos(latRad) * Math.cos(lonRad)

        if (z > -0.2) {
          const opacity = Math.max(0.2, z)
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fillStyle = dot.color
          ctx.globalAlpha = opacity
          ctx.fill()
          
          // Pulse
          ctx.beginPath()
          ctx.arc(x, y, 8 + Math.sin(angle * 0.05) * 3, 0, Math.PI * 2)
          ctx.strokeStyle = dot.color
          ctx.globalAlpha = opacity * 0.3
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      })

      angle += 0.3
      animationFrameId = requestAnimationFrame(drawGlobe)
    }
    
    drawGlobe()
    return () => {
      active = false
      cancelAnimationFrame(animationFrameId)
    }
  }, [isInView])

  return (
    <section ref={ref} className="section-wrapper" style={{
      padding: '120px 5%', textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="level-badge" style={{ display: 'inline-flex' }}>
          <span>🌍</span> GLOBAL AVAILABILITY
        </div>
        <h2 className="section-title neon-text">Available Worldwide</h2>
        <p className="section-subtitle">Open for remote work, freelance projects, and international clients</p>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 40px' }}>
          <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />
        </div>

        <div style={{
          display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap',
        }}>
          {['Remote Work', 'Freelance Projects', 'International Clients'].map((item, i) => (
            <motion.div key={item} className="glass-card" style={{
              padding: '15px 30px', display: 'flex', alignItems: 'center', gap: 10,
            }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.15 }}
            >
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#10b981', boxShadow: '0 0 10px #10b981',
              }} />
              <span style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '2px',
                color: 'rgba(255,255,255,0.8)',
              }}>{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
