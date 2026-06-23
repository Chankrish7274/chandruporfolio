import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaChevronRight, FaGithub, FaTimes, FaGlobe } from 'react-icons/fa';

export default function JourneyOverlay({ 
  activePinIndex, 
  pins, 
  onClose, 
  onNext 
}) {
  if (activePinIndex === null) return null;
  const pin = pins[activePinIndex];

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '20px'
      }}>
        {/* Backdrop overlay */}
        <div 
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'auto',
            background: 'rgba(3, 4, 7, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: -1
          }} 
        />

        {/* Tactical Log Panel */}
        <motion.div 
          initial={{ x: '110%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '110%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 140 }}
          style={{
            width: '100%',
            maxWidth: '500px',
            height: 'calc(100vh - 40px)',
            maxHeight: '850px',
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: `1px solid ${pin.color}40`,
            borderRadius: '6px',
            boxShadow: `0 0 25px ${pin.color}10`
          }}
          className="glass-card"
        >
          {/* Diagnostic Scanning Bar */}
          <div className="scan-bar" style={{ background: pin.color, boxShadow: `0 0 8px ${pin.color}` }} />

          {/* Header */}
          <div style={{
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0, 245, 212, 0.12)',
            background: 'rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FaTerminal style={{ color: pin.color, fontSize: '0.95rem' }} />
              <div>
                <span className="font-mono" style={{
                  fontSize: '0.62rem',
                  letterSpacing: '1.5px',
                  color: pin.color,
                  textTransform: 'uppercase'
                }}>
                  SYS_LOG // CHECKPOINT_0{activePinIndex + 1}
                </span>
                <h2 className="font-display" style={{
                  fontSize: '1.05rem',
                  color: '#fff',
                  fontWeight: 500,
                  marginTop: '1px',
                  letterSpacing: '0.5px'
                }}>
                  {pin.title.toUpperCase()}
                </h2>
              </div>
            </div>

            <button 
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = pin.color}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Body */}
          <div style={{
            padding: '24px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Terminal Log Output */}
            <div className="console-panel" style={{ borderLeftColor: pin.color }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: pin.color }}>[STATUS: ACTIVE]</span>
                <span style={{ color: 'var(--text-muted)' }}>{pin.period}</span>
              </div>
              <p style={{ color: 'var(--text-primary)', fontWeight: 300 }}>
                {pin.description}
              </p>
            </div>

            {/* Custom Content Blocks based on category */}
            {pin.type === 'education' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 className="font-display" style={{ fontSize: '0.72rem', letterSpacing: '1.5px', color: pin.color }}>
                  ACADEMIC ARCHITECTURE
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pin.details.map((detail, idx) => (
                    <div 
                      key={idx} 
                      style={{
                        padding: '12px',
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255,255,255,0.03)',
                        borderRadius: '4px'
                      }}
                    >
                      <div className="font-mono" style={{ color: pin.color, fontSize: '0.75rem', fontWeight: 600 }}>
                        &gt; {detail.title.toUpperCase()}
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '4px', lineHeight: '1.4' }}>
                        {detail.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pin.type === 'internship' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 className="font-display" style={{ fontSize: '0.72rem', letterSpacing: '1.5px', color: pin.color }}>
                  DEPLOYED PROJECTS & TASKS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {pin.details.map((detail, idx) => (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start',
                        fontSize: '0.8rem',
                        lineHeight: '1.5',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <span style={{ color: pin.color }} className="font-mono">[+]</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pin.type === 'projects' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 className="font-display" style={{ fontSize: '0.72rem', letterSpacing: '1.5px', color: pin.color }}>
                  PRODUCTION ARTIFACTS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pin.details.map((project) => (
                    <div 
                      key={project.title}
                      style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(0, 245, 212, 0.08)',
                        borderRadius: '4px',
                        padding: '14px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = project.color + '40';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 245, 212, 0.08)';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '1rem' }}>{project.icon}</span>
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                          onMouseEnter={(e) => e.target.style.color = project.color}
                          onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                        >
                          <FaGithub size={14} />
                        </a>
                      </div>
                      <h4 className="font-display" style={{
                        fontSize: '0.8rem',
                        color: project.color,
                        marginTop: '6px'
                      }}>
                        {project.title.toUpperCase()}
                      </h4>
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.78rem',
                        lineHeight: '1.4',
                        marginTop: '4px'
                      }}>
                        {project.desc}
                      </p>
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '8px' }}>
                        {project.tech.map(t => (
                          <span 
                            key={t}
                            className="font-mono"
                            style={{
                              padding: '1px 6px',
                              background: 'rgba(255,255,255,0.02)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              borderRadius: '2px',
                              fontSize: '0.62rem',
                              color: 'var(--text-muted)'
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pin.type === 'services' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 className="font-display" style={{ fontSize: '0.72rem', letterSpacing: '1.5px', color: pin.color }}>
                  TECH COMPILATION INDEX
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pin.details.map((skill) => (
                    <div key={skill.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }} className="font-mono">
                        <span style={{ color: 'var(--text-secondary)' }}>{skill.name}</span>
                        <span style={{ color: pin.color }}>{skill.level}%</span>
                      </div>
                      <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8 }}
                          style={{
                            height: '100%',
                            background: pin.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pin.type === 'future' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 className="font-display" style={{ fontSize: '0.72rem', letterSpacing: '1.5px', color: pin.color }}>
                  FUTURE SYSTEM COMPILER
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pin.details.map((detail, idx) => (
                    <div 
                      key={idx}
                      style={{
                        padding: '12px',
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255,255,255,0.03)',
                        borderRadius: '4px'
                      }}
                    >
                      <div className="font-mono" style={{ color: pin.color, fontSize: '0.75rem', fontWeight: 600 }}>
                        &gt;&gt; {detail.title.toUpperCase()}
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '4px', lineHeight: '1.4' }}>
                        {detail.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer controls */}
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(0, 245, 212, 0.12)',
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button 
              onClick={onClose}
              className="font-mono"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              ESC // CLOSE
            </button>
            <button 
              onClick={onNext}
              className="btn-cyber"
              style={{
                padding: '6px 14px',
                fontSize: '0.65rem',
                borderColor: pin.color,
                background: 'rgba(0, 0, 0, 0.3)'
              }}
            >
              <span>NEXT CHECKPOINT</span>
              <FaChevronRight size={8} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
