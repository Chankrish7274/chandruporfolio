import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    title: 'Full Stack Web Development',
    desc: 'End-to-end web application development with modern technologies and best practices.',
    icon: '🚀', color: '#00d4ff',
  },
  {
    title: 'MERN Stack Applications',
    desc: 'Custom applications built with MongoDB, Express.js, React.js, and Node.js.',
    icon: '⚛️', color: '#a855f7',
  },
  {
    title: 'Responsive Website Design',
    desc: 'Pixel-perfect, mobile-first designs that look stunning on every device.',
    icon: '📱', color: '#ec4899',
  },
  {
    title: 'REST API Development',
    desc: 'Scalable, secure, and well-documented RESTful APIs for any application.',
    icon: '🔗', color: '#10b981',
  },
  {
    title: 'Portfolio Websites',
    desc: 'Stunning portfolio websites that showcase your work and attract clients.',
    icon: '🎨', color: '#f97316',
  },
  {
    title: 'E-commerce Solutions',
    desc: 'Complete online stores with payment processing, inventory, and order management.',
    icon: '🛒', color: '#22d3ee',
  },
]

export default function FreelanceStation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" ref={ref} className="section-wrapper" style={{ padding: '120px 5%' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="level-badge" style={{ display: 'flex', justifyContent: 'center' }}>
          <span>🚀</span> LEVEL 5 — FREELANCER SPACE STATION
        </div>
        <h2 className="section-title neon-text">Freelance Services</h2>
        <p className="section-subtitle">Professional services for clients worldwide</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '25px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="glass-card"
              style={{
                padding: '35px', position: 'relative', overflow: 'hidden',
              }}
              initial={{ y: 40, opacity: 0, rotateX: 15 }}
              animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 40px ${service.color}20`,
              }}
            >
              {/* Hologram line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
              }} />

              <div style={{
                width: 55, height: 55, borderRadius: '50%',
                background: `${service.color}10`,
                border: `1px solid ${service.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', marginBottom: 20,
              }}>{service.icon}</div>

              <h3 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.85rem',
                color: service.color,
                letterSpacing: '1px',
                marginBottom: 10,
              }}>{service.title}</h3>

              <p style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
              }}>{service.desc}</p>

              {/* Status indicator */}
              <div style={{
                marginTop: 20, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px #10b981',
                }} />
                <span style={{
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: '2px',
                }}>AVAILABLE</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
