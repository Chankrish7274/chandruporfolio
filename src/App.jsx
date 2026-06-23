import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import ContactForm from './components/ContactForm';

// Theme configuration colors matching the user's selected styles
const themeColorsMap = {
  red: { accent: '#ff3366', secondary: '#ff758c' }, // DevFolio Slashed Crimson
  blue: { accent: '#2563eb', secondary: '#3b82f6' }, // Executive Blue
  gold: { accent: '#d97706', secondary: '#f59e0b' }, // Champagne Gold
  green: { accent: '#059669', secondary: '#10b981' } // Emerald Green
};

// Authentic CV content extracted from the provided resume document
const slides = [
  {
    id: 'origin',
    icon: '👤',
    label: 'Summary',
    title: 'Professional Summary',
    period: 'Kallakurichi, TN, India',
    type: 'origin',
    description: 'Passionate Frontend Developer with knowledge of HTML, CSS, JavaScript. Skilled in building responsive and user-friendly web applications. Interested in Prompt Engineering and AI technologies, with a strong willingness to learn and grow in modern web development.'
  },
  {
    id: 'education',
    icon: '🎓',
    label: 'Education',
    title: 'Academic Profile',
    period: 'Completed 2023 - 2026',
    type: 'education',
    description: 'Academic background focusing on Computer Science, software development paradigms, and foundational web applications.',
    details: [
      { institution: "St. Joseph's College (Autonomous), Tiruchirappalli", degree: 'Bachelor of Science (B.Sc.) Computer Science', duration: '2023 - 2026' },
      { institution: 'Higher Secondary Education (Tamil Nadu State Board)', degree: 'High School Graduation Certificate', duration: 'Completed 2023' }
    ]
  },
  {
    id: 'skills',
    icon: '⚙️',
    label: 'Skills',
    title: 'Technical Skills',
    period: 'Core Stack',
    type: 'skills',
    description: 'Functional technical expertise across coding languages, frontend frameworks, database schemas, and modern developer workspace tools.',
    details: [
      { category: 'Programming Languages', list: 'JavaScript, Python (basic)' },
      { category: 'Frontend', list: 'HTML5, CSS3, JavaScript' },
      { category: 'Database', list: 'MongoDB' },
      { category: 'Tools & Hostings', list: 'Git, GitHub, VS Code, Netlify' }
    ]
  },
  {
    id: 'projects',
    icon: '💻',
    label: 'Projects',
    title: 'Bench Allocation Management System',
    period: 'Featured Project',
    type: 'projects',
    description: 'Developed a web-based Bench Allocation Management System to help IT organizations efficiently manage employees who are not currently assigned to active projects.',
    bullets: [
      'Designed role-based dashboards for CEO, Managers, and Employees to monitor resource availability, project assignments, and bench status.',
      'Implemented employee allocation, deallocation, and skill-tracking features to improve workforce utilization and project planning.',
      'Improved operational efficiency by automating bench management processes and reducing manual resource tracking.'
    ]
  },
  {
    id: 'achievements',
    icon: '🏆',
    label: 'Achievements',
    title: 'Certificates & Milestones',
    period: 'Accomplishments',
    type: 'achievements',
    description: 'Key professional certifications and personal accomplishments achieved during academic and personal development phases.',
    details: {
      certification: 'Frontend Web Development Certification (one month internship)',
      bullets: [
        'Developed multiple web applications as academic and personal projects.',
        'Actively learning advanced Full Stack Development and DevOps concepts.',
        'Strong interest in Software Development, Cloud Computing, and Artificial Intelligence.'
      ]
    }
  },
  {
    id: 'learning',
    icon: '📚',
    label: 'Learning',
    title: 'Ongoing Learning',
    period: 'Future Roadmap',
    type: 'learning',
    description: 'Actively researching next-generation paradigms, system configurations, and cloud utilities to expand standard frontend capabilities.',
    items: [
      'Advanced React.js and Node.js Development',
      'DevOps Tools and Cloud Technologies',
      'System Design Fundamentals',
      'AI and Machine Learning Concepts'
    ]
  },
  {
    id: 'contact',
    icon: '✉️',
    label: 'Contact',
    title: 'Direct Communication Node',
    period: 'Active Channels',
    type: 'contact',
    description: 'Submit a connection packet to initialize a collaboration proposal, recruitment inquiry, or full-time request.'
  }
];

export default function App() {
  const [exploreStarted, setExploreStarted] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0); // 0 is Hero/Welcome, 1-7 are milestones
  const [activeTheme, setActiveTheme] = useState('red');

  // Apply body classes for themes dynamically
  useEffect(() => {
    document.body.className = '';
    if (activeTheme !== 'red') {
      document.body.classList.add(`theme-${activeTheme}`);
    }
  }, [activeTheme]);

  const handleNextPage = () => {
    if (activePageIndex < slides.length) {
      setActivePageIndex(activePageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (activePageIndex > 0) {
      setActivePageIndex(activePageIndex - 1);
    }
  };

  const currentSlide = activePageIndex > 0 ? slides[activePageIndex - 1] : null;

  return (
    <>
      {/* Unique Basic Background Design */}
      <div className="background-grid-overlay" />
      <div className="bg-ambient-blob-1" />
      <div className="bg-ambient-blob-2" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        
        {/* Recruiter Sticky Header */}
        <AnimatePresence>
          {exploreStarted && (
            <motion.header
              initial={{ y: -65, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '65px',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                background: 'rgba(255, 255, 255, 0.95)',
                borderBottom: '1px solid var(--glass-border)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.01)'
              }}
            >
              <div 
                onClick={() => {
                  setExploreStarted(false);
                  setActivePageIndex(0);
                }}
                className="font-display" 
                style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-color)', cursor: 'pointer', letterSpacing: '-0.5px' }}
              >
                CHANDRU P
              </div>

              {/* Mobile Active Section Title (Visually responsive) */}
              <div className="mobile-active-badge">
                {currentSlide ? currentSlide.label : 'WELCOME'}
              </div>

              {/* Desktop Slide Deck Navigation */}
              <div className="header-nav-links">
                <span 
                  onClick={() => {
                    setExploreStarted(false);
                    setActivePageIndex(0);
                  }}
                  className={`paginated-nav-item ${activePageIndex === 0 ? 'active' : ''}`}
                >
                  WELCOME
                </span>
                {slides.map((s, index) => (
                  <span 
                    key={s.id} 
                    onClick={() => {
                      setExploreStarted(true);
                      setActivePageIndex(index + 1);
                    }}
                    className={`paginated-nav-item ${activePageIndex === index + 1 ? 'active' : ''}`}
                  >
                    {s.label.toUpperCase()}
                  </span>
                ))}
              </div>

              {/* Theme Switcher Dots */}
              <div className="theme-selector-container" style={{ padding: '3px 6px', gap: '6px' }}>
                <div 
                  onClick={() => setActiveTheme('red')}
                  className={`theme-dot ${activeTheme === 'red' ? 'active' : ''}`}
                  style={{ background: '#ff3366', width: '10px', height: '10px' }}
                />
                <div 
                  onClick={() => setActiveTheme('blue')}
                  className={`theme-dot ${activeTheme === 'blue' ? 'active' : ''}`}
                  style={{ background: '#3b82f6', width: '10px', height: '10px' }}
                />
                <div 
                  onClick={() => setActiveTheme('gold')}
                  className={`theme-dot ${activeTheme === 'gold' ? 'active' : ''}`}
                  style={{ background: '#d4af37', width: '10px', height: '10px' }}
                />
                <div 
                  onClick={() => setActiveTheme('green')}
                  className={`theme-dot ${activeTheme === 'green' ? 'active' : ''}`}
                  style={{ background: '#10b981', width: '10px', height: '10px' }}
                />
              </div>
            </motion.header>
          )}
        </AnimatePresence>

        {/* Paginated Main Frame Container */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: exploreStarted ? '100px 10px 40px' : '30px 15px',
          position: 'relative'
        }}>
          {/* Ambient gradient slash overlay */}
          <div className="landing-gradient-slash" />

          <AnimatePresence mode="wait">
            {!exploreStarted && activePageIndex === 0 ? (
              
              /* WELCOME / LANDING PAGE SLIDE */
              <motion.div
                key="welcome-slide"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                style={{ width: '100%', maxWidth: '900px', zIndex: 2 }}
                className="glass-card"
              >
                <div className="landing-grid">
                  
                  {/* Left Column: Welcome description */}
                  <div>
                    <div className="highlight-badge">
                      FRONTEND DEVELOPER
                    </div>
                    
                    <h1 className="font-display" style={{
                      fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                      fontWeight: 900,
                      letterSpacing: '-1px',
                      lineHeight: '1.15',
                      marginBottom: '15px',
                      color: 'var(--text-primary)'
                    }}>
                      HI, I'M CHANDRU!
                    </h1>

                    <p style={{
                      fontSize: 'clamp(0.85rem, 1.8vw, 1.02rem)',
                      lineHeight: '1.7',
                      color: 'var(--text-secondary)',
                      fontWeight: 400,
                      marginBottom: '30px'
                    }}>
                      "AN INTERACTION DEVELOPER WHO IS ENTHUSIASTIC ABOUT CREATING ENGAGING AND DELIGHTFUL DIGITAL EXPERIENCES"
                    </p>

                    {/* Interactive Theme Switcher */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '35px' }}>
                      <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>SELECT_THEME:</span>
                      <div className="theme-selector-container">
                        <div 
                          onClick={() => setActiveTheme('red')}
                          className={`theme-dot ${activeTheme === 'red' ? 'active' : ''}`}
                          style={{ background: '#ff3366' }}
                        />
                        <div 
                          onClick={() => setActiveTheme('blue')}
                          className={`theme-dot ${activeTheme === 'blue' ? 'active' : ''}`}
                          style={{ background: '#3b82f6' }}
                        />
                        <div 
                          onClick={() => setActiveTheme('gold')}
                          className={`theme-dot ${activeTheme === 'gold' ? 'active' : ''}`}
                          style={{ background: '#d4af37' }}
                        />
                        <div 
                          onClick={() => setActiveTheme('green')}
                          className={`theme-dot ${activeTheme === 'green' ? 'active' : ''}`}
                          style={{ background: '#10b981' }}
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setExploreStarted(true);
                        setActivePageIndex(1);
                      }}
                      className="btn-cyber"
                    >
                      <span className="font-display">EXPLORE WORLD</span>
                      <FaChevronRight size={10} />
                    </motion.button>
                  </div>

                  {/* Right Column: Hexagon Avatar Frame */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="hexagon-frame">
                      <div className="hexagon-inner">
                        <img 
                          src="/images/chandru-original.jpg" 
                          className="hexagon-img" 
                          alt="Chandru P Avatar" 
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ) : (
              
              /* PAGINATED WORKSPACE DECK */
              <motion.div
                key="paginated-workspace"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', maxWidth: '850px', zIndex: 2 }}
              >
                
                {/* Horizontal Cyclist Journey Track */}
                <div style={{
                  position: 'relative',
                  width: '90%',
                  margin: '0 auto 40px',
                  height: '4px',
                  background: 'rgba(0, 0, 0, 0.04)',
                  borderBottom: '2px dashed var(--accent-color)'
                }}>
                  {/* Track Step Nodes */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transform: 'translateY(-50%)'
                  }}>
                    {slides.map((s, index) => {
                      const isActive = activePageIndex === index + 1;
                      const isVisited = activePageIndex >= index + 1;
                      return (
                        <div 
                          key={s.id}
                          onClick={() => setActivePageIndex(index + 1)}
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: isActive 
                              ? 'var(--accent-color)' 
                              : isVisited 
                                ? 'var(--accent-color)' 
                                : '#cbd5e1',
                            border: '2px solid #ffffff',
                            boxShadow: isActive ? '0 0 10px var(--accent-color)' : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          title={s.label}
                        />
                      );
                    })}
                  </div>

                  {/* Smooth horizontal moving Cyclist */}
                  <motion.div 
                    animate={{ left: `${((activePageIndex - 1) / (slides.length - 1)) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                    style={{
                      position: 'absolute',
                      top: '-24px',
                      transform: 'translateX(-50%)',
                      zIndex: 30,
                      pointerEvents: 'none'
                    }}
                  >
                    <svg width="45" height="45" viewBox="0 0 100 100">
                      {/* Back Wheel */}
                      <circle cx="20" cy="65" r="14" fill="none" stroke="var(--accent-color)" strokeWidth="3" />
                      <circle cx="20" cy="65" r="14" fill="none" stroke="var(--text-primary)" strokeWidth="1" strokeDasharray="3,3" className="cyclist-wheel" />

                      {/* Front Wheel */}
                      <circle cx="70" cy="65" r="14" fill="none" stroke="var(--accent-color)" strokeWidth="3" />
                      <circle cx="70" cy="65" r="14" fill="none" stroke="var(--text-primary)" strokeWidth="1" strokeDasharray="3,3" className="cyclist-wheel" />

                      {/* Frame */}
                      <path d="M 20 65 L 42 65 L 58 46 L 34 46 L 20 65 M 42 65 L 34 46 M 70 65 L 58 46" fill="none" stroke="var(--text-primary)" strokeWidth="2.5" />
                      
                      {/* Seat & handlebars */}
                      <line x1="34" y1="46" x2="32" y2="40" stroke="var(--text-primary)" strokeWidth="2" />
                      <path d="M 27 40 L 37 40" stroke="#111" strokeWidth="4" strokeLinecap="round" />
                      <line x1="58" y1="46" x2="62" y2="34" stroke="var(--text-primary)" strokeWidth="2" />
                      <path d="M 58 34 L 66 34" stroke="#111" strokeWidth="4" strokeLinecap="round" />

                      {/* Rider Body */}
                      <path d="M 32 40 L 46 22 L 58 35" fill="none" stroke="var(--text-primary)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="48" cy="14" r="6.5" fill="#fcd34d" />
                      <path d="M 44 11 Q 48 5 52 11 Z" fill="var(--accent-color)" />

                      {/* Pedaling leg paths */}
                      <path d="M 45 48 L 38 60 L 40 73" fill="none" stroke="var(--text-primary)" strokeWidth="4.5" strokeLinecap="round" className="cyclist-left-leg" />
                      <path d="M 45 48 L 52 56 L 50 64" fill="none" stroke="var(--accent-color)" strokeWidth="4.5" strokeLinecap="round" className="cyclist-right-leg" />
                    </svg>
                  </motion.div>

                </div>

                {/* Paginated Card Display */}
                <div className="glass-card" style={{ position: 'relative' }}>
                  
                  <AnimatePresence mode="wait">
                    {currentSlide && (
                      <motion.div
                        key={currentSlide.id}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.25 }}
                      >
                        {/* Slide Card Header */}
                        <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }} className="card-header-inner">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '1.6rem' }}>{currentSlide.icon}</span>
                            <div>
                              <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--accent-color)', fontWeight: 700, letterSpacing: '1.5px', display: 'block', textTransform: 'uppercase' }}>
                                SECTION // {currentSlide.label}
                              </span>
                              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                                {currentSlide.title}
                              </h3>
                            </div>
                          </div>
                          <span className="card-period-text">
                            {currentSlide.period}
                          </span>
                        </div>

                        {/* Slide Card Body */}
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7', fontWeight: 400, marginBottom: '25px' }}>
                          {currentSlide.description}
                        </p>

                        {/* Slide Specific Content Modules */}
                        
                        {/* Education Page Content */}
                        {currentSlide.type === 'education' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {currentSlide.details.map((item, idx) => (
                              <div key={idx} style={{ background: 'rgba(0,0,0,0.015)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)' }}>
                                <div className="font-display" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 750 }}>
                                  {item.institution}
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px', gap: '5px' }}>
                                  <span>{item.degree}</span>
                                  <span style={{ fontWeight: 500 }}>{item.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Technical Skills Page Content */}
                        {currentSlide.type === 'skills' && (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px' }}>
                            {currentSlide.details.map(item => (
                              <div key={item.category} style={{ background: 'rgba(0,0,0,0.015)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.03)' }}>
                                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--accent-color)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                                  {item.category}
                                </span>
                                <div className="font-display" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 700, marginTop: '5px' }}>
                                  {item.list}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Projects Page Content */}
                        {currentSlide.type === 'projects' && (
                          <div style={{ background: 'rgba(0,0,0,0.015)', padding: '18px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.03)' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', gap: '10px' }}>
                              <span className="font-display" style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                                Bench Allocation Management System
                              </span>
                              <a href="https://github.com/Chankrish7274/Bench-Allocation-System" target="_blank" rel="noopener noreferrer" className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-color)', fontWeight: 700, textDecoration: 'none' }}>
                                [ REPO ]
                              </a>
                            </div>
                            <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {currentSlide.bullets.map((bullet, idx) => (
                                <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Achievements Page Content */}
                        {currentSlide.type === 'achievements' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ background: 'var(--accent-dark)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)' }}>
                              <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--accent-color)', fontWeight: 700, letterSpacing: '1px' }}>
                                OFFICIALLY CERTIFIED
                              </span>
                              <div className="font-display" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 700, marginTop: '4px' }}>
                                {currentSlide.details.certification}
                              </div>
                            </div>
                            <div style={{ background: 'rgba(0,0,0,0.015)', padding: '18px', borderRadius: '8px' }}>
                              <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>
                                EXTRA MILESTONES
                              </span>
                              <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {currentSlide.details.bullets.map((b, idx) => (
                                  <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Ongoing Learning Content */}
                        {currentSlide.type === 'learning' && (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px' }}>
                            {currentSlide.items.map((item, idx) => (
                              <div key={idx} style={{ background: 'rgba(0,0,0,0.015)', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)' }} />
                                <span className="font-display" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Contact Page Content */}
                        {currentSlide.type === 'contact' && (
                          <ContactForm />
                        )}

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Paginated Navigation Slider Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', zIndex: 10 }}>
                  <motion.button
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePrevPage}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <FaChevronLeft size={10} />
                    <span>PREVIOUS</span>
                  </motion.button>

                  {activePageIndex < slides.length ? (
                    <motion.button
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNextPage}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-color)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <span>NEXT</span>
                      <FaChevronRight size={10} />
                    </motion.button>
                  ) : (
                    <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-muted)' }}>
                      [ END ]
                    </span>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '24px 20px',
          fontSize: '0.72rem',
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          color: 'var(--text-muted)',
          letterSpacing: '0.5px',
          zIndex: 5
        }}>
          © {new Date().getFullYear()} CHANDRU P. VER_1.0.0
        </footer>

      </div>
    </>
  );
}
