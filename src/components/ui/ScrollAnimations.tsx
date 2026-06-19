'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Typing effect letter-by-letter on scroll
export function ScrollRevealTypewriter({
  text,
  className = "",
  delay = 0,
  once = false
}: {
  text: string
  className?: string
  delay?: number
  once?: boolean
}) {
  const letters = Array.from(text)

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
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      className={className}
    >
      {letters.map((char, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Word-by-word slide up reveal
export function ScrollRevealWords({
  text,
  className = "",
  delay = 0,
  once = false
}: {
  text: string
  className?: string
  delay?: number
  once?: boolean
}) {
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
        ease: "easeOut"
      },
    },
  } as any

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 12,
    },
  } as any

  return (
    <motion.span
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
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

// Card fade-up reveal with stagger delay
export function ScrollRevealCard({
  children,
  className = "",
  delay = 0,
  yOffset = 30,
  once = false
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  yOffset?: number
  once?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        damping: 20,
        stiffness: 90
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Section fade-in wrapper
export function ScrollRevealSection({
  children,
  className = "",
  once = false
}: {
  children: React.ReactNode
  className?: string
  once?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, margin: "-120px" }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
