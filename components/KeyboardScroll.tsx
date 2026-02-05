'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useScroll } from 'framer-motion'

const FRAME_COUNT = 82
const BASE_PATH = '/images/Emil_Header_sequence/watermark_removed_2cf30d6a-2765-40f9-a2f2-e97f99fd4ada_'

interface KeyboardScrollProps {
  onFrameChange?: (frame: number) => void
}

export default function KeyboardScroll({ onFrameChange }: KeyboardScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const displayFrameRef = useRef(0)
  const targetFrameRef = useRef(0)
  const lastRenderFrameRef = useRef(-1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Preload all images
  useEffect(() => {
    const images: HTMLImageElement[] = []
    let loaded = 0

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = `${BASE_PATH}${String(i).padStart(3, '0')}.png`

      img.onload = () => {
        loaded++
        if (loaded === FRAME_COUNT) {
          setImagesLoaded(true)
        }
      }

      images.push(img)
    }

    imagesRef.current = images
  }, [])

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Render a specific frame
  const renderFrame = useCallback((frameIndex: number) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imagesRef.current[frameIndex]
    if (!img?.complete) return

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    const canvasAspect = canvas.offsetWidth / canvas.offsetHeight
    const imgAspect = img.width / img.height

    let drawWidth, drawHeight, offsetX, offsetY

    if (imgAspect > canvasAspect) {
      drawHeight = canvas.offsetHeight
      drawWidth = canvas.offsetHeight * imgAspect
      offsetX = (canvas.offsetWidth - drawWidth) / 2
      offsetY = 0
    } else {
      drawWidth = canvas.offsetWidth
      drawHeight = canvas.offsetWidth / imgAspect
      offsetX = 0
      offsetY = (canvas.offsetHeight - drawHeight) / 2
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }, [])

  // Frame 0 sofort rendern wenn Bilder geladen sind (kein Black Screen)
  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(0)
      lastRenderFrameRef.current = 0
    }
  }, [imagesLoaded, renderFrame])

  // Animation loop: Lerp für DJ-Turntable-Feeling + Speed-Cap für schnelle Swipes
  useEffect(() => {
    if (!imagesLoaded) return

    let rafId: number
    const FPS = 30
    const frameInterval = 1000 / FPS
    let lastFrameTime = 0

    // Max 2 Frames pro Tick = min ~1.4s für volle Sequenz
    // Aber Lerp macht normales Scrollen responsive
    const MAX_SPEED = 2.0

    const animate = (timestamp: number) => {
      rafId = requestAnimationFrame(animate)

      const elapsed = timestamp - lastFrameTime
      if (elapsed < frameInterval) return
      lastFrameTime = timestamp - (elapsed % frameInterval)

      const target = targetFrameRef.current
      const current = displayFrameRef.current
      const distance = target - current

      if (Math.abs(distance) < 0.01) return

      // Lerp für responsives Scrollen (Turntable-Feeling)
      const smoothingFactor = 0.12
      let step = distance * smoothingFactor

      // Speed-Cap: egal wie weit das Ziel weg ist, max 2 Frames pro Tick
      if (Math.abs(step) > MAX_SPEED) {
        step = Math.sign(step) * MAX_SPEED
      }

      // Mindest-Bewegung damit es nicht ewig kriecht
      if (Math.abs(step) < 0.05 && Math.abs(distance) > 0.05) {
        step = Math.sign(distance) * 0.05
      }

      displayFrameRef.current = current + step

      const roundedFrame = Math.round(displayFrameRef.current)
      const clampedFrame = Math.min(FRAME_COUNT - 1, Math.max(0, roundedFrame))

      if (clampedFrame !== lastRenderFrameRef.current) {
        lastRenderFrameRef.current = clampedFrame
        renderFrame(clampedFrame)

        if (onFrameChange) {
          onFrameChange(clampedFrame)
        }
      }
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [imagesLoaded, renderFrame, onFrameChange])

  // Update target frame on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, progress * FRAME_COUNT))
      targetFrameRef.current = frameIndex
    })

    return unsubscribe
  }, [scrollYProgress])

  return (
    <div ref={containerRef} className="keyboard-scroll-container">
      {!imagesLoaded && (
        <div className="keyboard-loading">
          <div className="keyboard-spinner" />
          <p className="keyboard-loading-text">Loading sequence...</p>
        </div>
      )}

      <div className="keyboard-scroll-sticky">
        <canvas ref={canvasRef} className="keyboard-scroll-canvas" />
      </div>
    </div>
  )
}
