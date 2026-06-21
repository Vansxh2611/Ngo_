'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowLeft, ArrowRight, Heart, X } from 'lucide-react'
import { IndiaMapSVG } from './IndiaMapSVG'
import { INDIA_IMPACT_COORDINATES } from '@/config/indiaImpactCoordinates'
import { Project, ProjectLocation } from '@/types'
import Link from 'next/link'

interface IndiaImpactMapProps {
  projects: Project[]
}

export default function IndiaImpactMap({ projects }: IndiaImpactMapProps) {
  const [activeCity, setActiveCity] = useState<ProjectLocation | null>(null)
  const [hoveredCity, setHoveredCity] = useState<ProjectLocation | null>(null)
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Observer for responsive width check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll lock on mobile when bottom sheet is active
  useEffect(() => {
    if (isMobile && activeCity) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobile, activeCity])

  // Keyboard navigation to close active state
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCity(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Reset index when active city changes
  useEffect(() => {
    setCurrentProjectIndex(0)
  }, [activeCity])

  // Reset active city if it no longer has active projects after filters change
  useEffect(() => {
    if (activeCity) {
      const activeProjects = projects.filter((p) => p.location === activeCity)
      if (activeProjects.length === 0) {
        setActiveCity(null)
      }
    }
  }, [projects, activeCity])

  // Group active filtered projects by city location
  const groupedByCity = useMemo(() => {
    return projects.reduce((acc, project) => {
      const loc = project.location
      if (loc) {
        acc[loc] ||= []
        acc[loc].push(project)
      }
      return acc;
    }, {} as Record<ProjectLocation, Project[]>)
  }, [projects])

  // Active cities that have at least one filtered project
  const activeCityKeys = Object.keys(groupedByCity) as ProjectLocation[]

  // Active state IDs for highlighting matching states in IndiaMapSVG
  // (We match city names to state ID keys if applicable)
  const activeStateId = useMemo(() => {
    if (!activeCity) return null
    // Map active cities to their state code IDs
    const cityStateMap: Record<ProjectLocation, string> = {
      delhi: 'dl',
      mumbai: 'mh',
      kolkata: 'wb',
      chennai: 'tn',
      hyderabad: 'tg',
      lucknow: 'up',
      jaipur: 'rj',
      patna: 'br',
      bhopal: 'mp',
      ahmedabad: 'gj',
    }
    return cityStateMap[activeCity] || null
  }, [activeCity])

  const selectedProjects = activeCity ? groupedByCity[activeCity] || [] : []
  const currentProject = selectedProjects[currentProjectIndex]

  const handleNextProject = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentProjectIndex((prev) => (prev + 1) % selectedProjects.length)
  }

  const handlePrevProject = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentProjectIndex((prev) => (prev - 1 + selectedProjects.length) % selectedProjects.length)
  }

  // Calculate coordinates relative to 612x696 viewBox
  const getPositionStyles = (x: number, y: number) => {
    const pctX = (x / 612) * 100
    const pctY = (y / 696) * 100
    return {
      left: `${pctX}%`,
      top: `${pctY}%`,
      pctX,
      pctY,
    }
  }

  const activeCoords = activeCity ? getPositionStyles(INDIA_IMPACT_COORDINATES[activeCity].x, INDIA_IMPACT_COORDINATES[activeCity].y) : null

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      {/* Empty State */}
      {activeCityKeys.length === 0 ? (
        <div className="w-full aspect-[612/696] bg-brand-cream/40 rounded-[32px] border border-brand-sand/50 flex flex-col items-center justify-center p-8 text-center select-none shadow-elev-1">
          <MapPin className="text-brand-grey/40 mb-3" size={32} />
          <p className="font-body text-brand-grey text-sm">
            No active projects found in selected category.
          </p>
        </div>
      ) : (
        <div
          ref={mapRef}
          className="w-full aspect-[612/696] bg-brand-cream/40 rounded-[32px] border border-brand-sand/50 relative overflow-visible shadow-elev-1 select-none"
        >
          {/* SVG Map of India */}
          <IndiaMapSVG
            activeStateId={activeStateId}
            highlightedStateIds={activeCityKeys.map(city => {
              const mapping: Record<ProjectLocation, string> = {
                delhi: 'dl',
                mumbai: 'mh',
                kolkata: 'wb',
                chennai: 'tn',
                hyderabad: 'tg',
                lucknow: 'up',
                jaipur: 'rj',
                patna: 'br',
                bhopal: 'mp',
                ahmedabad: 'gj',
              }
              return mapping[city]
            })}
            className="w-full h-full"
          />

          {/* HTML Interactive Marker Layer Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {activeCityKeys.map((city) => {
              const coords = INDIA_IMPACT_COORDINATES[city]
              const projectsInCity = groupedByCity[city] || []
              const count = projectsInCity.length
              const isActive = activeCity === city
              const isHovered = hoveredCity === city
              const pos = getPositionStyles(coords.x, coords.y)

              return (
                <div
                  key={city}
                  role="button"
                  tabIndex={0}
                  aria-label={`Projects in ${coords.label}. ${isMobile ? 'Tap' : 'Hover'} to explore.`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveCity(city)
                    }
                  }}
                  onFocus={() => { if (!isMobile) setActiveCity(city) }}
                  onBlur={() => { if (!isMobile) setActiveCity(null) }}
                  onClick={() => { if (isMobile) setActiveCity(city) }}
                  onMouseEnter={() => {
                    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
                    setHoveredCity(city)
                    if (!isMobile) setActiveCity(city)
                  }}
                  onMouseLeave={() => {
                    setHoveredCity(null)
                    if (!isMobile) {
                      closeTimerRef.current = setTimeout(() => setActiveCity(null), 120)
                    }
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto group focus-visible:outline-none"
                  style={{ left: pos.left, top: pos.top }}
                >
                  <span className="relative flex items-center justify-center">
                    {/* Pulsing Outer Highlight Ring */}
                    <span className="absolute h-8 w-8 rounded-full bg-brand-amber/35 animate-map-pulse pointer-events-none" />

                    {/* Base Marker Dot */}
                    <span
                      className={`relative h-3 w-3 rounded-full transition-all duration-300 ${isActive
                          ? 'bg-brand-amber scale-125 ring-4 ring-brand-amber/20'
                          : isHovered
                            ? 'bg-brand-amber scale-110'
                            : 'bg-brand-blue ring-2 ring-white'
                        }`}
                    />

                    {/* Multiple Projects Counter Badge */}
                    {count > 1 && (
                      <span className="absolute -top-2.5 -right-2.5 text-[9px] font-bold bg-brand-blue text-white rounded-full h-4 min-w-4 px-1 flex items-center justify-center shadow-sm select-none border border-white/20">
                        {count}
                      </span>
                    )}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Desktop HTML Tooltip overlay */}
          <AnimatePresence>
            {!isMobile && activeCity && currentProject && activeCoords && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
                style={{
                  position: 'absolute',
                  left: activeCoords.left,
                  top: activeCoords.top,
                  transform: activeCoords.pctX > 65
                    ? 'translate(-85%, -105%)'
                    : activeCoords.pctX < 25
                      ? 'translate(-15%, -105%)'
                      : 'translate(-50%, -105%)',
                  zIndex: 30,
                }}
                className="pointer-events-auto w-80"
                onMouseEnter={() => {
                  if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
                }}
                onMouseLeave={() => {
                  closeTimerRef.current = setTimeout(() => setActiveCity(null), 120)
                }}
              >
                <article className="backdrop-blur-md bg-white/90 border border-brand-sand/60 shadow-elev-2 rounded-2xl p-5 relative text-brand-charcoal">
                  {/* Close button */}
                  <button
                    onClick={() => setActiveCity(null)}
                    className="absolute top-4 right-4 p-1 rounded-full text-brand-grey hover:text-brand-blue hover:bg-brand-sand/20 transition-colors focus-visible:outline focus-visible:outline-brand-amber"
                    aria-label="Close project info"
                  >
                    <X size={14} />
                  </button>

                  {/* City Name Header */}
                  <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-brand-amber-dark uppercase mb-1.5">
                    <MapPin size={10} />
                    <span>{INDIA_IMPACT_COORDINATES[activeCity].label}</span>
                  </div>

                  {/* Project Title */}
                  <h4 className="font-heading font-bold text-sm text-brand-blue leading-snug mb-3">
                    {currentProject.title}
                  </h4>

                  {/* Category & Badge */}
                  <div className="mb-3">
                    <span className="text-[9px] uppercase tracking-wider font-bold bg-brand-cream border border-brand-sand px-2 py-0.5 rounded-full text-brand-grey">
                      {currentProject.category}
                    </span>
                  </div>

                  {/* Progress bar */}
                  {(() => {
                    const percent = Math.min(
                      Math.round((currentProject.raised / currentProject.goal) * 100),
                      100
                    )
                    return (
                      <div className="space-y-1.5 mb-3.5">
                        <div className="flex justify-between text-[10px] font-body font-semibold text-brand-charcoal">
                          <span className="uppercase text-brand-grey/60 tracking-wider">Progress</span>
                          <span>{percent}% Funded</span>
                        </div>
                        <div className="w-full bg-brand-sand/40 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="bg-brand-blue h-full rounded-full"
                          />
                        </div>
                      </div>
                    )
                  })()}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-[11px] font-body text-brand-grey border-t border-brand-sand/20 pt-2 mb-3.5">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-brand-grey/50">Raised</span>
                      <p className="font-semibold text-brand-blue">
                        ${currentProject.raised.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-brand-grey/50">Goal</span>
                      <p className="font-semibold text-brand-charcoal">
                        ${currentProject.goal.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Navigation footer */}
                  <div className="flex items-center justify-between gap-2 border-t border-brand-sand/20 pt-3">
                    {selectedProjects.length > 1 ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={handlePrevProject}
                          className="p-1 rounded-full border border-brand-sand/50 text-brand-grey hover:text-brand-blue hover:bg-brand-sand/10 transition-colors focus-visible:outline focus-visible:outline-brand-amber"
                          aria-label="Previous project"
                        >
                          <ArrowLeft size={10} />
                        </button>
                        <span className="text-[10px] text-brand-grey font-body whitespace-nowrap">
                          {currentProjectIndex + 1} of {selectedProjects.length}
                        </span>
                        <button
                          onClick={handleNextProject}
                          className="p-1 rounded-full border border-brand-sand/50 text-brand-grey hover:text-brand-blue hover:bg-brand-sand/10 transition-colors focus-visible:outline focus-visible:outline-brand-amber"
                          aria-label="Next project"
                        >
                          <ArrowRight size={10} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-brand-grey italic">
                        1 active project
                      </span>
                    )}

                    <Link
                      href={`/contact#donate`}
                      className="btn-amber text-[10px] font-semibold px-3 py-1.5 rounded-full hover:scale-102 transition-transform cursor-pointer text-center whitespace-nowrap inline-flex items-center gap-1"
                    >
                      <Heart size={10} />
                      Donate
                    </Link>
                  </div>
                </article>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Bottom Drawer Sheet */}
          <AnimatePresence>
            {isMobile && activeCity && currentProject && (
              <>
                {/* Dimm Overlay layer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveCity(null)}
                  className="fixed inset-0 bg-black/25 backdrop-blur-[1px] z-40 pointer-events-auto"
                />

                {/* Bottom Sheet Drawer */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border-t border-brand-sand/50 p-6 z-50 pointer-events-auto text-brand-charcoal max-h-[85vh] overflow-y-auto"
                >
                  {/* Drag handle decorator bar */}
                  <div className="w-12 h-1 bg-brand-sand/80 rounded-full mx-auto mb-5" />

                  {/* Close button */}
                  <button
                    onClick={() => setActiveCity(null)}
                    className="absolute top-5 right-5 p-1.5 rounded-full bg-brand-cream border border-brand-sand/55 text-brand-grey hover:text-brand-blue transition-colors focus-visible:outline focus-visible:outline-brand-amber"
                    aria-label="Close project info panel"
                  >
                    <X size={16} />
                  </button>

                  {/* Location label */}
                  <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-brand-amber-dark uppercase mb-2">
                    <MapPin size={11} />
                    <span>{INDIA_IMPACT_COORDINATES[activeCity].label}</span>
                  </div>

                  {/* Title */}
                  <h4 className="font-heading font-bold text-base text-brand-blue leading-snug mb-3">
                    {currentProject.title}
                  </h4>

                  {/* Category Tag */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-brand-cream border border-brand-sand px-2.5 py-1 rounded-full text-brand-grey">
                      {currentProject.category}
                    </span>
                  </div>

                  {/* Progress section */}
                  {(() => {
                    const percent = Math.min(
                      Math.round((currentProject.raised / currentProject.goal) * 100),
                      100
                    )
                    return (
                      <div className="space-y-2 mb-5">
                        <div className="flex justify-between text-xs font-body font-semibold text-brand-charcoal">
                          <span className="uppercase text-brand-grey/60 tracking-wider">Progress</span>
                          <span>{percent}% Funded</span>
                        </div>
                        <div className="w-full bg-brand-sand/40 h-2 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="bg-brand-blue h-full rounded-full"
                          />
                        </div>
                      </div>
                    )
                  })()}

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-body text-brand-grey border-t border-brand-sand/20 pt-3.5 mb-5">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-brand-grey/50">Raised</span>
                      <p className="font-semibold text-sm text-brand-blue">
                        ${currentProject.raised.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-brand-grey/50">Goal</span>
                      <p className="font-semibold text-sm text-brand-charcoal">
                        ${currentProject.goal.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Drawer navigation controls & CTA */}
                  <div className="flex items-center justify-between gap-4 border-t border-brand-sand/20 pt-4">
                    {selectedProjects.length > 1 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrevProject}
                          className="p-2 rounded-full border border-brand-sand text-brand-grey hover:bg-brand-cream transition-colors focus-visible:outline focus-visible:outline-brand-amber"
                          aria-label="Previous project"
                        >
                          <ArrowLeft size={12} />
                        </button>
                        <span className="text-xs text-brand-grey font-body whitespace-nowrap font-medium">
                          {currentProjectIndex + 1} of {selectedProjects.length}
                        </span>
                        <button
                          onClick={handleNextProject}
                          className="p-2 rounded-full border border-brand-sand text-brand-grey hover:bg-brand-cream transition-colors focus-visible:outline focus-visible:outline-brand-amber"
                          aria-label="Next project"
                        >
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-brand-grey italic">
                        1 active project
                      </span>
                    )}

                    <Link
                      href={`/contact#donate`}
                      onClick={() => setActiveCity(null)}
                      className="btn-amber text-xs font-semibold px-4 py-2.5 rounded-full hover:scale-102 transition-transform cursor-pointer text-center whitespace-nowrap inline-flex items-center gap-1.5"
                    >
                      <Heart size={12} />
                      Donate
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Helpful Hint */}
      <div className="text-center mt-4">
        <p className="font-body text-xs text-brand-grey italic">
          {isMobile
            ? 'Tap any pin to view project details. Filters apply automatically.'
            : 'Hover any pin to view project details. Filters apply automatically.'}
        </p>
      </div>
    </div>
  )
}
