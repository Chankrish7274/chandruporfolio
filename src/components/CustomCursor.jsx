import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const hueRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let animationFrameId
    
    // Draw star helper
    const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius, color, alpha) => {
      let rot = (Math.PI / 2) * 3
      let x = cx
      let y = cy
      let step = Math.PI / spikes

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(cx, cy - outerRadius)
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius
        y = cy + Math.sin(rot) * outerRadius
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius
        y = cy + Math.sin(rot) * innerRadius
        ctx.lineTo(x, y)
        rot += step
      }
      ctx.lineTo(cx, cy - outerRadius)
      ctx.closePath()
      ctx.shadowBlur = 12
      ctx.shadowColor = color
      ctx.fillStyle = color
      ctx.fill()
      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        // Update particle state
        p.x += p.vx
        p.y += p.vy
        p.alpha -= 0.02 // fade out
        p.size *= 0.95   // shrink
        
        // Twinkle effect (sine wave modulation of alpha)
        const twinkle = Math.sin(Date.now() * 0.015 + p.twinkleSeed) * 0.35 + 0.65
        const currentAlpha = Math.max(0, p.alpha * twinkle)

        if (p.alpha <= 0 || p.size <= 0.5) {
          particles.splice(i, 1)
          i--
          continue
        }

        // Draw star
        drawStar(
          ctx,
          p.x,
          p.y,
          4, // 4-pointed star spark
          p.size,
          p.size * 0.3,
          `hsla(${p.hue}, 100%, 75%, ${currentAlpha})`,
          currentAlpha
        )
      }
      
      animationFrameId = requestAnimationFrame(render)
    }
    
    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [visible])

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX - 10, y: e.clientY - 10 })
      setDotPos({ x: e.clientX - 3, y: e.clientY - 3 })
      setVisible(true)

      // Add twinkling star particle on move
      hueRef.current = (hueRef.current + 2) % 360
      const newParticle = {
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8 - 0.4, // float slightly upwards
        size: Math.random() * 8 + 5,
        alpha: 1.0,
        hue: hueRef.current,
        twinkleSeed: Math.random() * 100,
      }
      
      if (particlesRef.current.length < 100) {
        particlesRef.current.push(newParticle)
      }
    }
    
    const over = () => setHovering(true)
    const out = () => setHovering(false)
    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)

    const check = () => {
      document.querySelectorAll('a, button, .glass-card, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', over)
        el.addEventListener('mouseleave', out)
      })
    }
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 999999,
        }}
      />
      {visible && (
        <>
          <div
            className={`custom-cursor ${hovering ? 'hovering' : ''}`}
            style={{ left: pos.x, top: pos.y }}
          />
          <div className="cursor-dot" style={{ left: dotPos.x, top: dotPos.y }} />
        </>
      )}
    </>
  )
}

