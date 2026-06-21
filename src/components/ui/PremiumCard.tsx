"use client"

import React from 'react'
import { motion, useReducedMotion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PremiumCardProps extends Omit<HTMLMotionProps<'div'>, 'whileHover' | 'whileFocus' | 'transition'> {
  children: React.ReactNode
  variant?: 'blue' | 'amber'
}

export function PremiumCard({
  children,
  className,
  variant = 'blue',
  tabIndex = 0,
  ...props
}: PremiumCardProps) {
  const shouldReduceMotion = useReducedMotion()

  const shadowClass =
    variant === 'amber'
      ? 'hover:shadow-[0_20px_40px_rgba(232,165,61,0.12)] focus-visible:shadow-[0_20px_40px_rgba(232,165,61,0.12)] hover:border-brand-amber/25 focus-visible:border-brand-amber/25'
      : 'hover:shadow-[0_20px_40px_rgba(26,58,92,0.08)] focus-visible:shadow-[0_20px_40px_rgba(26,58,92,0.08)] hover:border-brand-blue-light/25 focus-visible:border-brand-blue-light/25'

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.01 }}
      whileFocus={shouldReduceMotion ? {} : { y: -8, scale: 1.01 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 22,
      }}
      tabIndex={tabIndex}
      className={cn(
        "relative rounded-3xl bg-white border border-brand-sand/30 backdrop-blur-md transition-all duration-300 outline-none text-left flex flex-col justify-between h-full w-full",
        shadowClass,
        "focus-visible:ring-2 focus-visible:ring-brand-amber/30",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
