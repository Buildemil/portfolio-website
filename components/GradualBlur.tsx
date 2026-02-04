'use client'

import React from 'react'
import { evaluate } from 'mathjs'

interface GradualBlurProps {
  target?: 'parent' | 'children'
  position?: 'top' | 'bottom'
  height?: string
  strength?: number
  divCount?: number
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out'
  exponential?: boolean
  opacity?: number
}

export default function GradualBlur({
  target = 'parent',
  position = 'bottom',
  height = '7rem',
  strength = 2,
  divCount = 5,
  curve = 'bezier',
  exponential = false,
  opacity = 1,
}: GradualBlurProps) {
  const divs = Array.from({ length: divCount }, (_, i) => {
    const index = i + 1
    let blurValue: number

    if (exponential) {
      blurValue = Math.pow(index, strength)
    } else {
      blurValue = index * strength
    }

    let opacityValue: number
    const progress = index / divCount

    switch (curve) {
      case 'linear':
        opacityValue = progress
        break
      case 'bezier':
        // Cubic bezier approximation: ease-in-out
        opacityValue = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2
        break
      case 'ease-in':
        opacityValue = progress * progress
        break
      case 'ease-out':
        opacityValue = 1 - Math.pow(1 - progress, 2)
        break
      default:
        opacityValue = progress
    }

    opacityValue = opacityValue * opacity

    return {
      blur: blurValue,
      opacity: opacityValue,
    }
  })

  return (
    <>
      {divs.map((div, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: height,
            [position]: 0,
            backdropFilter: `blur(${div.blur}px)`,
            WebkitBackdropFilter: `blur(${div.blur}px)`,
            opacity: div.opacity,
            pointerEvents: 'none',
            zIndex: divCount - index,
          }}
        />
      ))}
    </>
  )
}
