'use client'

import { useEffect, useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

const FRAME_COUNT = 82
const BASE_PATH = '/images/Emil_Header_sequence/watermark_removed_2cf30d6a-2765-40f9-a2f2-e97f99fd4ada_'

export default function ScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const loadedRef = useRef<Set<number>>(new Set())
  const currentFrameRef = useRef<number>(-1)
  const rafRef = useRef<number>()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Map scroll progress (0 → 1) to frame index (0 → 81)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1])

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = []

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      const frameNumber = String(i).padStart(3, '0')
      img.src = `${BASE_PATH}${frameNumber}.png`

      img.onload = () => {
        loadedRef.current.add(i)
        // Draw first frame immediately when loaded
        if (i === 0 && canvasRef.current) {
          drawFrame(0)
        }
      }

      images.push(img)
    }

    imagesRef.current = images

    return () => {
      images.forEach(img => {
        img.onload = null
      })
    }
  }, [])

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const dpr = window.devicePixelRatio || 1

      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      // Redraw current frame after resize
      if (currentFrameRef.current >= 0) {
        drawFrame(currentFrameRef.current)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Draw frame to canvas with "contain" fit
  const drawFrame = (index: number) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)))

    // Avoid redundant draws
    if (clampedIndex === currentFrameRef.current) return

    const img = imagesRef.current[clampedIndex]
    if (!img || !loadedRef.current.has(clampedIndex)) return

    currentFrameRef.current = clampedIndex

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate contain fit (keep aspect ratio, fit within canvas)
    const canvasWidth = canvas.offsetWidth
    const canvasHeight = canvas.offsetHeight
    const imgAspect = img.width / img.height
    const canvasAspect = canvasWidth / canvasHeight

    let drawWidth, drawHeight, offsetX, offsetY

    if (imgAspect > canvasAspect) {
      // Image is wider than canvas
      drawWidth = canvasWidth
      drawHeight = canvasWidth / imgAspect
      offsetX = 0
      offsetY = (canvasHeight - drawHeight) / 2
    } else {
      // Image is taller than canvas
      drawHeight = canvasHeight
      drawWidth = canvasHeight * imgAspect
      offsetX = (canvasWidth - drawWidth) / 2
      offsetY = 0
    }

    // Draw with consistent positioning
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }

  // Update frame on scroll
  useEffect(() => {
    const unsubscribe = frameIndex.on('change', (latest) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        drawFrame(latest)
      })
    })

    return () => {
      unsubscribe()
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [frameIndex])

  return (
    <div
      ref={containerRef}
      className="scroll-animation-container"
      style={{ height: '300vh' }}
    >
      <div className="scroll-animation-sticky">
        <canvas
          ref={canvasRef}
          className="scroll-animation-canvas"
        />
      </div>
    </div>
  )
}
