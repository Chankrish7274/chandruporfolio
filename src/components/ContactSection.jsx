import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [sent, setSent] = useState(false)

  const socials = [
    { icon: '📧', label: 'Email', value: 'chandrutech.p@gmail.com', href: 'mailto:chandrutech.p@gmail.com', color: '#00d4ff' },
    { icon: '📱', label: 'Phone', value: '9345469238', href: 'tel:+919345469238', color: '#a855f7' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/chandru7274', href: 'https://www.linkedin.com/in/chandru7274', color: '#0077b5' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/Chankrish7274', href: 'https://github.com/Chankrish7274/', color: '#f0f6fc' },
    { icon: '💬', label: 'WhatsApp', value: '9345469238', href: 'https://wa.me/919345469238', color: '#25d366' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" ref={ref} className="section-wrapper" style={{ padding: '120px 5%' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="level-badge" style={{ display: 'flex', justifyContent: 'center' }}>
          <span>🏰</span> FINAL DESTINATION — CONTACT CASTLE
        </div>
        <h2 className="section-title neon-text">Get In Touch</h2>
        <p className="section-subtitle">You've completed the journey — now let's build something together</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {/* Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="glass-card" style={{ padding: '35px' }}>
              <h3 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '1rem',
                color: '#00d4ff',
                letterSpacing: '2px',
                marginBottom: 25,
              }}>📡 CONTACT CHANNELS</h3>

              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 15,
                    padding: '15px',
                    marginBottom: 10,
                    borderRadius: '12px',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    transition: 'all 0.3s',
                  }}
                  whileHover={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: `${s.color}30`,
                    x: 5,
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                  <div>
                    <div style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '0.65rem',
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '2px',
                      marginBottom: 3,
                    }}>{s.label}</div>
                    <div style={{
                      color: s.color,
                      fontSize: '0.9rem',
                    }}>{s.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '35px' }}>
              <h3 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '1rem',
                color: '#a855f7',
                letterSpacing: '2px',
                marginBottom: 25,
              }}>💬 SEND MESSAGE</h3>

              {['name', 'email', 'message'].map((field) => (
                <div key={field} style={{ marginBottom: 20, position: 'relative' }}>
                  <label style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '0.65rem',
                    color: focused === field ? '#00d4ff' : 'rgba(255,255,255,0.4)',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 8,
                    transition: 'color 0.3s',
                  }}>{field}</label>
                  {field === 'message' ? (
                    <textarea
                      rows={4}
                      value={formData[field]}
                      onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${focused === field ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
                        borderRadius: '12px',
                        padding: '14px 18px',
                        color: '#fff',
                        fontSize: '0.95rem',
                        fontFamily: "'Inter', sans-serif",
                        resize: 'vertical',
                        outline: 'none',
                        transition: 'all 0.3s',
                        boxShadow: focused === field ? '0 0 20px rgba(0,212,255,0.1)' : 'none',
                      }}
                    />
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={formData[field]}
                      onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${focused === field ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
                        borderRadius: '12px',
                        padding: '14px 18px',
                        color: '#fff',
                        fontSize: '0.95rem',
                        fontFamily: "'Inter', sans-serif",
                        outline: 'none',
                        transition: 'all 0.3s',
                        boxShadow: focused === field ? '0 0 20px rgba(0,212,255,0.1)' : 'none',
                      }}
                    />
                  )}
                </div>
              ))}

              <motion.button
                type="submit"
                className="btn-primary"
                style={{ width: '100%' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{sent ? '✅ MESSAGE SENT!' : '🚀 TRANSMIT MESSAGE'}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          style={{ textAlign: 'center', marginTop: 80 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="glass-card" style={{
            maxWidth: 600, margin: '0 auto', padding: '40px',
            background: 'rgba(0,212,255,0.03)',
            border: '1px solid rgba(0,212,255,0.15)',
          }}>
            <p style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1.1rem',
              color: '#00d4ff',
              marginBottom: 8,
              letterSpacing: '2px',
            }}>🎮 JOURNEY COMPLETE</p>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              marginBottom: 25,
            }}>
              "You have completed the journey. Now you know who I am.
              Let's build something amazing together."
            </p>
            <div style={{ display: 'flex', gap: 15, justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button className="btn-primary" whileHover={{ scale: 1.05 }}>
                <span>💼 HIRE ME</span>
              </motion.button>
              <motion.button className="btn-primary" style={{ borderColor: '#a855f7', color: '#a855f7' }} whileHover={{ scale: 1.05 }}>
                <span>📅 SCHEDULE MEETING</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
