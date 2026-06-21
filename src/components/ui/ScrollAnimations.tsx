'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Typing effect letter-by-letter on scroll
export function ScrollRevealTypewriter({
  text,
  className = "",
  delay = 0,
  once = true
}: {
  text: string
  className?: string
  delay?: number
  once?: boolean
}) {
  const words = text.split(" ")
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.1 })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
        ease: "easeOut"
      },
    },
  } as any

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.05, ease: "easeOut" },
    },
    hidden: {
      opacity: 0,
      y: 2,
    },
  } as any

  return (
    <motion.span
      ref={ref}
      style={{ display: "inline-block", willChange: isInView ? "opacity" : "auto" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      className={className}
    >
      {words.map((word, wordIndex) => {
        const letters = Array.from(word)
        return (
          <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {letters.map((char, charIndex) => (
              <motion.span
                variants={child}
                key={charIndex}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && (
              <motion.span
                variants={child}
                key={`space-${wordIndex}`}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {" "}
              </motion.span>
            )}
          </span>
        )
      })}
    </motion.span>
  )
}

// Motion Level 1: Word-by-word slide up reveal
export function ScrollRevealWords({
  text,
  className = "",
  delay = 0,
  once = true
}: {
  text: string
  className?: string
  delay?: number
  once?: boolean
}) {
  const words = text.split(" ")
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.1 })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  } as any

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Apple-style easeOutExpo
      },
    },
    hidden: {
      opacity: 0,
      y: 15,
    },
  } as any

  return (
    <motion.span
      ref={ref}
      style={{ display: "inline-block", willChange: isInView ? "transform, opacity" : "auto" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Motion Level 2: Card fade-up reveal with depth (scale + y)
export function ScrollRevealCard({
  children,
  className = "",
  delay = 0,
  yOffset = 40,
  once = true
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  yOffset?: number
  once?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.15 }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 18,
        mass: 1.1,
        delay
      }}
      style={{ willChange: isInView ? "transform, opacity" : "auto" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Motion Level 1: Section fade-in wrapper
export function ScrollRevealSection({
  children,
  className = "",
  once = true
}: {
  children: React.ReactNode
  className?: string
  once?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: isInView ? "transform, opacity" : "auto" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Motion Level 3: Stagger Grid Container
export function ScrollRevealStagger({
  children,
  className = "",
  once = true,
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  once?: boolean
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.12,
            delayChildren: delay,
          }
        }
      }}
      style={{ willChange: isInView ? "transform, opacity" : "auto" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Motion Level 3: Stagger Grid Item
export function ScrollRevealStaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 60,
            damping: 18,
            mass: 1.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

