'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll, motion } from 'framer-motion'

const FRAME_COUNT = 82
const BASE_PATH = '/images/Emil_Header_sequence/watermark_removed_2cf30d6a-2765-40f9-a2f2-e97f99fd4ada_'

export default function KeyboardScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const requestRef = useRef<number>()
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [targetFrame, setTargetFrame] = useState(0)
  const smoothFrameRef = useRef(0)

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

  // Render frame
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imagesRef.current[currentFrame]
    if (!img?.complete) return

    const render = () => {
      // Clear
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Calculate cover fit (fill entire canvas)
      const canvasAspect = canvas.offsetWidth / canvas.offsetHeight
      const imgAspect = img.width / img.height

      let drawWidth, drawHeight, offsetX, offsetY

      if (imgAspect > canvasAspect) {
        // Image is wider - fit to height and crop sides
        drawHeight = canvas.offsetHeight
        drawWidth = canvas.offsetHeight * imgAspect
        offsetX = (canvas.offsetWidth - drawWidth) / 2
        offsetY = 0
      } else {
        // Image is taller - fit to width and crop top/bottom
        drawWidth = canvas.offsetWidth
        drawHeight = canvas.offsetWidth / imgAspect
        offsetX = 0
        offsetY = (canvas.offsetHeight - drawHeight) / 2
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    }

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
    }

    requestRef.current = requestAnimationFrame(render)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [currentFrame, imagesLoaded])

  // Smooth frame interpolation
  useEffect(() => {
    let rafId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      const smoothingFactor = 0.15 // Lower = smoother/slower, Higher = faster/snappier
      smoothFrameRef.current = lerp(smoothFrameRef.current, targetFrame, smoothingFactor)

      const roundedFrame = Math.round(smoothFrameRef.current)
      if (roundedFrame !== currentFrame) {
        setCurrentFrame(Math.min(FRAME_COUNT - 1, Math.max(0, roundedFrame)))
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [targetFrame, currentFrame])

  // Update target frame on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, progress * FRAME_COUNT))
      setTargetFrame(frameIndex)
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
