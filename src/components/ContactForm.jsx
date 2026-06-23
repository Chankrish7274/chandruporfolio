import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const socials = [
    { icon: <FaEnvelope />, label: 'SMTP_EMAIL', value: 'chandrutech.p@gmail.com', href: 'mailto:chandrutech.p@gmail.com', color: '#00f5d4' },
    { icon: <FaPhone />, label: 'VOIP_COMM', value: '+91 93454 69238', href: 'tel:+919345469238', color: '#00b4d8' },
    { icon: <FaLinkedin />, label: 'LINKED_IN', value: 'linkedin.com/in/chandru7274', href: 'https://www.linkedin.com/in/chandru7274', color: '#0077b5' },
    { icon: <FaGithub />, label: 'GIT_REPOS', value: 'github.com/Chankrish7274', href: 'https://github.com/Chankrish7274', color: '#f0f6fc' },
    { icon: <FaWhatsapp />, label: 'WA_CHANNEL', value: 'Secure Chat', href: 'https://wa.me/919345469238', color: '#25d366' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setError(false);
    setSent(false);

    try {
      const response = await fetch('https://formspree.io/f/mjgdwylb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '30px',
      padding: '40px 20px 80px',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Social channels */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ padding: '24px' }}
        className="glass-card"
      >
        <h3 className="font-display" style={{
          fontSize: '0.8rem',
          color: 'var(--accent-color)',
          letterSpacing: '2px',
          marginBottom: '20px'
        }}>
          📡 TRANSLATION NODE CHANNELS
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '4px',
                textDecoration: 'none',
                background: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                transition: 'all 0.2s'
              }}
              whileHover={{
                background: 'rgba(0, 245, 212, 0.03)',
                borderColor: `${s.color}35`,
                x: 4
              }}
            >
              <div style={{
                fontSize: '1.1rem',
                color: s.color,
                display: 'flex',
                alignItems: 'center'
              }}>
                {s.icon}
              </div>
              <div>
                <div className="font-mono" style={{
                  fontSize: '0.58rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '1px'
                }}>
                  {s.label}
                </div>
                <div style={{
                  color: '#f8fafc',
                  fontSize: '0.82rem',
                  marginTop: '1px'
                }}>
                  {s.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Message Form */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{ padding: '24px' }}
        className="glass-card"
      >
        <h3 className="font-display" style={{
          fontSize: '0.8rem',
          color: 'var(--accent-blue)',
          letterSpacing: '2px',
          marginBottom: '20px'
        }}>
          💬 SECURE ENVELOPE INPUT
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label className="font-mono" style={{
              fontSize: '0.58rem',
              color: 'var(--text-secondary)',
              letterSpacing: '1px',
              display: 'block',
              marginBottom: '5px'
            }}>
              [01] IDENTIFIER_NAME
            </label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Recruiter Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required 
            />
          </div>

          <div>
            <label className="font-mono" style={{
              fontSize: '0.58rem',
              color: 'var(--text-secondary)',
              letterSpacing: '1px',
              display: 'block',
              marginBottom: '5px'
            }}>
              [02] RETURN_ADDR_EMAIL
            </label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="e.g. recruiter@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required 
            />
          </div>

          <div>
            <label className="font-mono" style={{
              fontSize: '0.58rem',
              color: 'var(--text-secondary)',
              letterSpacing: '1px',
              display: 'block',
              marginBottom: '5px'
            }}>
              [03] MESSAGE_PAYLOAD
            </label>
            <textarea 
              className="form-input" 
              rows={3}
              placeholder="Enter details..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ resize: 'vertical' }}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn-cyber" 
            disabled={loading}
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: '5px',
              borderColor: 'var(--accent-color)',
              opacity: loading ? 0.7 : 1,
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            <span className="font-display">TRANSMIT PACKET</span>
            <FaPaperPlane size={10} />
          </button>

          {sent && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono"
              style={{
                color: 'var(--accent-color)',
                fontSize: '0.72rem',
                textAlign: 'center',
                marginTop: '8px'
              }}
            >
              ✓ PACKET TRANSMITTED SUCCESSFUL
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono"
              style={{
                color: '#ff5252',
                fontSize: '0.72rem',
                textAlign: 'center',
                marginTop: '8px'
              }}
            >
              ✗ ERROR: CONNECTION REFUSED
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
