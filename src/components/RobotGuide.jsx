import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const achievements = [
  { id: 'explorer', title: 'Skill Explorer', icon: '🏆', desc: 'Discovered all skills', section: 'skills' },
  { id: 'architect', title: 'Project Master', icon: '🏅', desc: 'Explored all projects', section: 'projects' },
  { id: 'innovator', title: 'Future Innovator', icon: '🌟', desc: 'Reached the future lab', section: 'timeline' },
  { id: 'networker', title: 'Global Networker', icon: '🌍', desc: 'Viewed global reach', section: 'contact' },
]

const robotMessages = {
  hero: "Welcome, traveler! I'm your guide through Chandru's digital universe. Press Start!",
  about: "This is where Chandru's story begins. He started as a curious student...",
  skills: "Look at these skill trees! Each one represents years of practice. 🏆 Achievement Unlocked: Skill Explorer!",
  projects: "Welcome to the Project Kingdom! Each building holds a creation. 🏅 Achievement Unlocked: Project Master!",
  services: "This is the Freelancer Space Station. Chandru is available for hire!",
  timeline: "The timeline shows an incredible journey. 🌟 Achievement Unlocked: Future Innovator!",
  contact: "You've reached the castle! Ready to connect? 🌍 Achievement Unlocked: Global Networker!",
}

export default function RobotGuide() {
  const [currentSection, setCurrentSection] = useState('hero')
  const [showAchievement, setShowAchievement] = useState(null)
  const [unlockedAchievements, setUnlockedAchievements] = useState(new Set())
  const [visitorCount] = useState(Math.floor(Math.random() * 900) + 1247)

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'services', 'timeline', 'contact']
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          setCurrentSection(id)
          
          // Check achievements
          const achievement = achievements.find(a => a.section === id)
          if (achievement && !unlockedAchievements.has(achievement.id)) {
            setUnlockedAchievements(prev => new Set([...prev, achievement.id]))
            setShowAchievement(achievement)
            setTimeout(() => setShowAchievement(null), 3000)
          }
        }
      })
    }, { threshold: 0.3 })

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [unlockedAchievements])

  return (
    <>
      {/* Visitor Counter */}
      <div className="visitor-counter">
        👁 {visitorCount.toLocaleString()}
      </div>

      {/* Robot Guide */}
      <motion.div
        className="robot-guide"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: 'spring' }}
      >
        🤖
        <div className="robot-speech">
          <p>{robotMessages[currentSection] || robotMessages.hero}</p>
        </div>
      </motion.div>

      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            className="achievement-popup"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div className="trophy">{showAchievement.icon}</div>
            <h3>ACHIEVEMENT UNLOCKED!</h3>
            <p>{showAchievement.title}</p>
            <p style={{ fontSize: '0.75rem', marginTop: 5, color: 'rgba(255,255,255,0.4)' }}>
              {showAchievement.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Wall (bottom-left) */}
      <div style={{
        position: 'fixed', bottom: 30, left: 30, zIndex: 998,
        display: 'flex', gap: 5,
      }}>
        {achievements.map(a => (
          <motion.div
            key={a.id}
            style={{
              width: 35, height: 35, borderRadius: '50%',
              background: unlockedAchievements.has(a.id) ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${unlockedAchievements.has(a.id) ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.9rem',
              filter: unlockedAchievements.has(a.id) ? 'none' : 'grayscale(1) opacity(0.3)',
              transition: 'all 0.5s',
            }}
            title={`${a.title}${unlockedAchievements.has(a.id) ? ' ✓' : ' (Locked)'}`}
            animate={unlockedAchievements.has(a.id) ? { scale: [1, 1.2, 1] } : {}}
          >
            {a.icon}
          </motion.div>
        ))}
      </div>
    </>
  )
}
