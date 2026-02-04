'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Github, Linkedin, Mail, ArrowDown, X, ChevronLeft, ChevronRight, Play, ExternalLink, Menu } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import KeyboardScroll from '@/components/KeyboardScroll'

// ============================================
// CUSTOM HOOKS
// ============================================

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold, rootMargin: '0px 0px -100px 0px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => { if (ref.current) observer.unobserve(ref.current) }
  }, [threshold])

  return [ref, isVisible] as const
}

function useParallax(speed: number = 0.3) {
  const prefersReducedMotion = useReducedMotion()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    // Disable parallax if user prefers reduced motion
    if (prefersReducedMotion) return

    const handleScroll = () => setOffset(window.scrollY * speed)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, prefersReducedMotion])

  // Return 0 offset if reduced motion is preferred
  return prefersReducedMotion ? 0 : offset
}

// ============================================
// ROTATING TITLE
// ============================================

function RotatingTitle() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(loadTimer)
  }, [])

  return (
    <h1 className="hero-title">
      <span className={`title-line ${isLoaded ? 'visible' : ''}`}>
        Designer &
      </span>
      <span className={`title-line line-2 ${isLoaded ? 'visible' : ''}`}>
        Creative Technologist
      </span>
    </h1>
  )
}

// ============================================
// CAPABILITIES (MINIMAL, NO SHUFFLE)
// ============================================

function Capabilities({ skills, isVisible }: { skills: string[]; isVisible: boolean }) {
  return (
    <div className={`capabilities-section ${isVisible ? 'visible' : ''}`}>
      <span className="capabilities-label">Capabilities</span>
      <div className="capabilities-grid">
        {skills.map((skill, i) => (
          <span 
            key={skill}
            className="capability-tag"
            style={{ transitionDelay: `${i * 0.03}s` }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

// ============================================
// PROJECT CARD WITH ELEGANT HOVER
// ============================================

interface ProjectMedia {
  type: 'image' | 'video' | 'embed'
  src: string
  alt: string
  poster?: string
  caption?: string
  width?: number
  height?: number
}

interface Project {
  title: string
  description: string
  longDesc: string
  tech: string[]
  hero: {
    src: string
    alt: string
    width: number
    height: number
  }
  link?: string
  media?: ProjectMedia[]
  videoUrl?: string
  embedUrl?: string
  embedHeight?: number
}

function ProjectCard({ 
  project, 
  index, 
  isVisible, 
  onClick,
  hasVideo 
}: { 
  project: Project
  index: number
  isVisible: boolean
  onClick: () => void
  hasVideo?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article
      className={`project-card fade-in-up stagger-${Math.min(index + 1, 6)} ${isVisible ? 'visible' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="View"
    >
      {/* Image Layer */}
      <div className="project-image-wrapper">
        {project.hero ? (
          <Image
            src={project.hero.src}
            alt={project.hero.alt}
            fill
            priority={index < 2}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`project-image ${isHovered ? 'hovered' : ''}`}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="project-placeholder">Coming Soon</div>
        )}
      </div>

      {/* Overlay */}
      <div className={`project-overlay ${isHovered ? 'active' : ''}`}>
        {/* Accent Line */}
        <div className={`project-accent-line ${isHovered ? 'active' : ''}`} />
        
        {/* Content */}
        <div className="project-content">
          <div className="project-meta">
            <span className={`project-index ${isHovered ? 'active' : ''}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          <div className="project-text">
            <h3 className={`project-title ${isHovered ? 'active' : ''}`}>
              {project.title}
            </h3>
            <p className={`project-desc ${isHovered ? 'active' : ''}`}>
              {project.description}
            </p>
          </div>

          <div className={`project-tech ${isHovered ? 'active' : ''}`}>
            {project.tech.slice(0, 3).map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Video Badge */}
      {hasVideo && (
        <div className="project-video-badge">
          <Play size={14} />
        </div>
      )}
    </article>
  )
}

// ============================================
// FULLSCREEN MODAL WITH ELEGANT TRANSITIONS
// ============================================

function FullscreenModal({ 
  project, 
  onClose,
  allProjects,
  currentIndex,
  onNavigate
}: { 
  project: Project
  onClose: () => void
  allProjects: Project[]
  currentIndex: number
  onNavigate: (index: number) => void
}) {
  const [isClosing, setIsClosing] = useState(false)
  const [isContentVisible, setIsContentVisible] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setIsContentVisible(false)
    setTimeout(onClose, 500)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    
    // Staggered content reveal
    const timer = setTimeout(() => setIsContentVisible(true), 100)
    
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [currentIndex])

  useEffect(() => {
    setCurrentMediaIndex(0)
    setShowVideo(false)
    // Reset content visibility for transition
    setIsContentVisible(false)
    const timer = setTimeout(() => setIsContentVisible(true), 50)
    return () => clearTimeout(timer)
  }, [currentIndex])

  const goToPrev = () => {
    const newIndex = currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1
    onNavigate(newIndex)
  }

  const goToNext = () => {
    const newIndex = currentIndex === allProjects.length - 1 ? 0 : currentIndex + 1
    onNavigate(newIndex)
  }

  const mediaItems = project.media || []
  const currentMedia = mediaItems[currentMediaIndex]
  const hasMultipleMedia = mediaItems.length > 1
  const hasVideo = project.videoUrl

  return (
    <div className={`modal-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
      <div className={`modal-container ${isClosing ? 'closing' : ''}`} onClick={e => e.stopPropagation()}>
        
        {/* Close */}
        <button 
          className={`modal-close ${isContentVisible ? 'visible' : ''}`} 
          onClick={handleClose}
          data-cursor="Close"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Navigation */}
        <nav className={`modal-nav ${isContentVisible ? 'visible' : ''}`}>
          <button className="modal-nav-btn" onClick={goToPrev} data-cursor="Prev">
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <span className="modal-counter">
            {String(currentIndex + 1).padStart(2, '0')}
            <span className="modal-counter-divider">/</span>
            {String(allProjects.length).padStart(2, '0')}
          </span>
          <button className="modal-nav-btn" onClick={goToNext} data-cursor="Next">
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </nav>

        {/* Scrollable Content */}
        <div className="modal-scroll">
          
          {/* Hero Media */}
          <div className={`modal-hero ${isContentVisible ? 'visible' : ''}`}>
            {hasVideo && showVideo ? (
              <div className="modal-video-wrapper">
                <iframe
                  src={project.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="modal-video-iframe"
                />
              </div>
            ) : currentMedia?.type === 'image' || project.hero ? (
              <>
                <Image
                  src={currentMedia?.src || project.hero?.src || ''}
                  alt={currentMedia?.alt || project.hero?.alt || project.title}
                  width={currentMedia?.width || project.hero?.width || 1200}
                  height={currentMedia?.height || project.hero?.height || 800}
                  loading="lazy"
                  sizes="100vw"
                  className="modal-hero-image"
                />
                <div className="modal-hero-gradient" />
              </>
            ) : null}

            {/* Play Button */}
            {hasVideo && !showVideo && (
              <button 
                className="modal-play-btn"
                onClick={() => setShowVideo(true)}
                data-cursor="Play"
              >
                <div className="modal-play-icon">
                  <Play size={32} fill="white" strokeWidth={0} />
                </div>
                <span className="modal-play-label">Watch Video</span>
              </button>
            )}

            {/* Media Navigation */}
            {hasMultipleMedia && (
              <div className="modal-media-dots">
                {mediaItems.map((_, idx) => (
                  <button
                    key={idx}
                    className={`modal-dot ${idx === currentMediaIndex ? 'active' : ''}`}
                    onClick={() => setCurrentMediaIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bento Grid - Interactive Project Showcase */}
          {!showVideo && (
            <div className={`bento-grid ${isContentVisible ? 'visible' : ''}`}>
              {/* Hero Image - Large */}
              {mediaItems[0] && (
                <div
                  className="bento-cell bento-hero"
                  onClick={() => setCurrentMediaIndex(0)}
                >
                  <Image
                    src={mediaItems[0].src}
                    alt={project.title}
                    fill
                    className="bento-image"
                  />
                  <div className="bento-overlay">
                    <div className="bento-label">Featured</div>
                  </div>
                </div>
              )}

              {/* Tech Stack - Medium */}
              <div className="bento-cell bento-tech">
                <div className="bento-tech-content">
                  <h3 className="bento-tech-title">Technology</h3>
                  <div className="bento-tech-grid">
                    {project.tech.map((tech, i) => (
                      <div key={i} className="bento-tech-item">
                        <div className="bento-tech-icon">
                          <span>{tech.charAt(0)}</span>
                        </div>
                        <span className="bento-tech-name">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Secondary Image */}
              {mediaItems[1] && (
                <div
                  className="bento-cell bento-secondary"
                  onClick={() => setCurrentMediaIndex(1)}
                >
                  <Image
                    src={mediaItems[1].src}
                    alt={mediaItems[1].caption || project.title}
                    fill
                    className="bento-image"
                  />
                  {mediaItems[1].caption && (
                    <div className="bento-overlay">
                      <div className="bento-caption">{mediaItems[1].caption}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Project Highlight - Text Block */}
              <div className="bento-cell bento-highlight">
                <div className="bento-highlight-content">
                  <div className="bento-highlight-label">Impact</div>
                  <h3 className="bento-highlight-text">
                    {project.description}
                  </h3>
                </div>
              </div>

              {/* Additional Images in Grid */}
              {mediaItems.slice(2, 5).map((media, idx) => (
                media.type === 'image' && (
                  <div
                    key={idx + 2}
                    className={`bento-cell bento-small ${idx === 0 ? 'bento-accent' : ''}`}
                    onClick={() => setCurrentMediaIndex(idx + 2)}
                  >
                    <Image
                      src={media.src}
                      alt={media.caption || project.title}
                      fill
                      className="bento-image"
                    />
                    <div className="bento-overlay">
                      <div className="bento-number">{String(idx + 3).padStart(2, '0')}</div>
                    </div>
                  </div>
                )
              ))}

              {/* Stats/Info Block */}
              <div className="bento-cell bento-stats">
                <div className="bento-stats-content">
                  <div className="bento-stat">
                    <div className="bento-stat-value">{String(currentIndex + 1).padStart(2, '0')}</div>
                    <div className="bento-stat-label">Project</div>
                  </div>
                  <div className="bento-stat">
                    <div className="bento-stat-value">{project.tech.length}</div>
                    <div className="bento-stat-label">Technologies</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Embed Section */}
          {project.embedUrl && (
            <div className={`modal-embed ${isContentVisible ? 'visible' : ''}`}>
              <div className="modal-embed-header">
                <span className="modal-embed-label">Live Preview</span>
                <a 
                  href={project.embedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="modal-embed-link"
                  data-cursor="Open"
                >
                  <span>Open</span>
                  <ExternalLink size={14} strokeWidth={1.5} />
                </a>
              </div>
              <div className="modal-embed-frame" style={{ height: project.embedHeight || 500 }}>
                <iframe src={project.embedUrl} />
              </div>
            </div>
          )}

          {/* Text Content */}
          <div className="modal-content">
            <header className={`modal-header ${isContentVisible ? 'visible' : ''}`}>
              <span className="modal-number">{String(currentIndex + 1).padStart(2, '0')}</span>
              <h2 className="modal-title">{project.title}</h2>
              <p className="modal-subtitle">{project.description}</p>
            </header>

            <div className={`modal-tech ${isContentVisible ? 'visible' : ''}`}>
              {project.tech.map((tech, i) => (
                <span key={i} className="modal-tech-tag">{tech}</span>
              ))}
            </div>

            <div className={`modal-body ${isContentVisible ? 'visible' : ''}`}>
              {project.longDesc.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {project.link && (
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`modal-link ${isContentVisible ? 'visible' : ''}`}
                data-cursor="Visit"
              >
                <span>View Project</span>
                <ExternalLink size={16} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function Portfolio() {
  const router = useRouter()
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [heroScrollProgress, setHeroScrollProgress] = useState(0)

  const [aboutRef, aboutVisible] = useScrollAnimation()
  const [worksRef, worksVisible] = useScrollAnimation()
  const [otherLivesRef, otherLivesVisible] = useScrollAnimation()
  const [contactRef, contactVisible] = useScrollAnimation()
  const [clientsRef, clientsVisible] = useScrollAnimation()

  const parallaxOffset = useParallax(0.3)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight * 2 // 200vh for keyboard animation
      const progress = Math.min(1, Math.max(0, scrollY / heroHeight))

      setHeroScrollProgress(progress)

      // Dynamic cursor change bei Glitch-Transition
      if (progress > 0.35) {
        document.body.classList.add('pixel-cursor')
      } else {
        document.body.classList.remove('pixel-cursor')
      }

      // Schwarzer Balken wenn Text und Logo sich überschneiden würden (bei ca. 1.7x viewport)
      setIsScrolled(scrollY > window.innerHeight * 1.7)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ============================================
  // DATA
  // ============================================

  const selectedWorks: (Project & { slug: string })[] = [
    {
      slug: 'ai-scent-design',
      title: "AI Scent Design",
      description: "AI-powered fragrance design tool reducing workflow from 1 week to 20 minutes",
      longDesc: `Revolutionary tool for BMW's scent designer transforming fragrance development through AI.

The Challenge: Manual Photoshop visualizations took one week per fragrance.

The Solution: Custom GPT trained on Lush Essence Catalog generating fragrance names, complete formulas, professional visualizations via MidJourney, and 500-600 character descriptions.

Technical Innovation: Curated prompts with specific camera parameters (Sony Alpha 7R IV, 50mm G-Master) ensure professional imagery. AI arranges components logically—top notes higher, heart notes centered, base notes at foundation.

Enterprise Integration: Migrated to BMW's internal "Gaia" platform for security compliance.

Historic Achievement: First completely AI-generated automotive fragrance, produced by LUZI perfume house Switzerland (creating for HUGO BOSS, Hermès, Louis Vuitton).

Impact: Reduced visualization time from 1 week to 20 minutes.`,
      tech: ["ChatGPT", "MidJourney", "BMW Gaia", "Custom GPT"],
      hero: {
        src: "/images/projects/ai-scent-design/hero.jpg",
        alt: "AI-generated fragrance visualization with professional camera parameters",
        width: 1200,
        height: 800
      },
      media: [
        { type: 'image', src: '/images/projects/ai-scent-design/hero.jpg', alt: 'AI-generated fragrance visualization', caption: 'AI-generated fragrance visualization', width: 1200, height: 800 },
        { type: 'image', src: '/images/projects/ai-scent-design/detail-01.jpg', alt: 'Detailed scent composition', caption: 'Detailed scent composition', width: 1200, height: 800 }
      ]
    },
    {
      slug: 'custom-ai-workflows',
      title: "Custom AI Workflows",
      description: "Enterprise-grade AI workflow automation with security compliance",
      longDesc: `Comprehensive AI automation solutions built with n8n for enterprise environments.

These workflows handle complex business processes while maintaining strict security and compliance standards. The system integrates multiple AI models (GPT-4, Claude, custom models) with existing business tools, creating seamless automation pipelines.

Key features include error handling, fallback mechanisms, audit logging, and secure API management. All workflows are designed with BMW's security requirements in mind, ensuring sensitive data never leaves the corporate environment.`,
      tech: ["n8n", "OpenAI", "Claude", "Enterprise"],
      hero: {
        src: "/images/projects/custom-ai-workflows/hero.jpg",
        alt: "n8n workflow automation dashboard",
        width: 1200,
        height: 800
      },
      media: [
        { type: 'image', src: '/images/projects/custom-ai-workflows/hero.jpg', alt: 'AI workflow automation dashboard', caption: 'AI workflow automation dashboard', width: 1200, height: 800 }
      ]
    },
    {
      slug: 'lichtobjekt',
      title: "Lichtobjekt",
      description: "WebGL shader-based lighting controller with Apple Liquid Glass UI",
      longDesc: `A sophisticated lighting control interface inspired by Apple's Liquid Glass design language.

The project combines hardware LED control with a beautiful WebGL-powered user interface. The interface features real-time shader effects that mimic the fluid, glassy appearance of modern Apple products.

Users can control various lighting parameters through intuitive gesture-based interactions. The system bridges digital design with physical hardware, allowing precise control over LED installations through a visually stunning interface.`,
      tech: ["WebGL", "GLSL", "Hardware", "React"],
      hero: {
        src: "/images/projects/lichtobjekt/hero.jpg",
        alt: "Liquid Glass UI interface with real-time shader effects",
        width: 1200,
        height: 800
      },
      media: [
        { type: 'image', src: '/images/projects/lichtobjekt/hero.jpg', alt: 'Liquid Glass UI interface', caption: 'Liquid Glass UI interface', width: 1200, height: 800 }
      ]
    },
    {
      slug: 'bmw-bubble',
      title: "BMW Bubble",
      description: "Interactive bubble visualization for BMW brand experience",
      longDesc: `An immersive WebGL-based bubble simulation created for BMW's digital brand experience.

The project features real-time physics simulation, custom shader effects, and interactive elements that respond to user input. The bubbles are rendered using custom GLSL shaders that create iridescent, soap-bubble-like effects with realistic light refraction.

Key technical achievements include particle system optimization, WebGL 2.0 shader pipeline, and seamless integration with BMW's design system.`,
      tech: ["WebGL", "Three.js", "React", "Custom Shaders"],
      hero: {
        src: "/images/projects/bmw-bubble/hero.jpg",
        alt: "Interactive bubble simulation with physics-based particles",
        width: 1200,
        height: 520
      },
      media: [
        { type: 'image', src: '/images/projects/bmw-bubble/hero.jpg', alt: 'Interactive bubble simulation', caption: 'Interactive bubble simulation', width: 1200, height: 520 }
      ]
    },
    {
      slug: '5x-plus-magazine',
      title: "5×Plus Magazine",
      description: "Experimental sound design magazine exploring audio-visual storytelling",
      longDesc: `An experimental editorial project exploring the intersection of sound design, visual communication, and print media.

The magazine features innovative layouts that visualize sound waves and audio concepts. Each spread functions as both informative article and visual representation of sonic concepts.

The project challenges traditional magazine design through experimental typography, unconventional grid systems, and print techniques referencing audio equipment aesthetics.`,
      tech: ["Editorial", "Print", "Typography"],
      hero: {
        src: "/images/projects/5x-plus-magazine/hero.jpg",
        alt: "Experimental editorial layout visualizing sound concepts",
        width: 1200,
        height: 800
      }
    },
    {
      slug: 'sarah-in-the-bathroom',
      title: "Sarah in the Bathroom",
      description: "Music Video",
      longDesc: `A music video project showcasing cinematographic storytelling and visual direction.

Combining intimate cinematography with careful lighting design, the project demonstrates the intersection of musical and visual narrative.`,
      tech: ["Camera", "Direction", "Lighting", "Editing"],
      hero: {
        src: "/images/projects/sarah-in-the-bathroom/hero.jpg",
        alt: "Cinematographic storytelling with careful lighting design",
        width: 1200,
        height: 800
      },
      videoUrl: "https://player.vimeo.com/video/830028856"
    }
  ]

  const otherLives: (Project & { slug: string })[] = [
    {
      slug: 'music-production',
      title: "Music Production",
      description: "Electronic music production and live performance with modular synths",
      longDesc: `Electronic music production focusing on experimental sound design and live performance.

Setup includes modular synthesis systems, custom-built controllers, and real-time audio manipulation. Live performances emphasize improvisation and the unpredictable nature of modular systems.`,
      tech: ["Ableton", "Modular", "Live Performance"],
      hero: {
        src: "/images/projects/music-production/hero.jpg",
        alt: "Modular synthesis setup for live performance",
        width: 1200,
        height: 800
      }
    },
    {
      slug: 'acting',
      title: "Acting",
      description: "Film and television work",
      longDesc: `Professional acting work in film and television since 2018. Projects range from independent films to major TV productions.`,
      tech: ["Film", "Television", "Theater"],
      hero: {
        src: "/images/projects/acting/hero.jpg",
        alt: "Professional acting work in film and television",
        width: 1200,
        height: 800
      },
      link: "https://www.filmmakers.eu/de/actors/emil-vorbrugg"
    },
    {
      slug: 'handcraft-analog-work',
      title: "Handcraft & Analog Work",
      description: "From metalwork to letterpress — handcrafted creations",
      longDesc: `Analog craft projects spanning multiple disciplines. From welding metal sculptures to precision woodworking, celebrating traditional craftsmanship in a digital age.

Letterpress work includes custom type design and traditional printing techniques.`,
      tech: ["Welding", "Woodworking", "Letterpress"],
      hero: {
        src: "/images/projects/handcraft-analog-work/hero.jpg",
        alt: "Traditional craftsmanship across multiple disciplines",
        width: 1200,
        height: 800
      }
    }
  ]

  const allProjects = [...selectedWorks, ...otherLives]

  const clientLogos = [
    { image: "/images/logos/LUZI-logo.png", alt: "LUZI Fragrance Compounds" },
    { image: "/images/logos/ard.jpg", alt: "ARD ZDF MDR" },
    { image: "/images/logos/BMW_Group.jpeg", alt: "BMW Group" },
    { image: "/images/logos/feuerwehr.png", alt: "Feuerwehr München" },
    { image: "/images/logos/joyn-logo.jpg", alt: "Joyn Logo" },
    { image: "/images/logos/azmo.png", alt: "Augenzentrum München Ost" },
    { image: "/images/logos/theater.png", alt: "Theaterakademie August Everding" },
    { image: "/images/logos/hff.jpg", alt: "HFF München" },
    
  ]

  const skills = [
    "AI Integration", 
    "Custom AI Workflows", 
    "AI Automation",
    "API Integration",
    "Comfy-UI", 
    "Hardware Projects", // optional höher, da oft relevant für Enterprise-Prototypen
    "Communication & Collaboration",
  
    // Design & Tech Core
    "React & TypeScript",
    "Design Systems",
    "Concept Development",
    "Out-of-the-Box Thinking",
    "Storytelling",
  
    // Creative / Media
    "Cinematography",
    "Photography",
    "Sound Design",
    "Music Production",
    "Logic Pro / Ableton",
    "Shader / Generative Stuff",
    "TouchDesigner",
  
    // Craft & Hands-on
    "Wood & Metal Crafting",
    "Cooking",
  
    // Classic Design Skills
    "Photoshop / Lightroom / InDesign",
    "Typography",
    "Storyboarding",
    "Theatre Studies",
    "Acting",
    "Selling this pen"
  ]
  
  

  return (
    <div className={`portfolio ${isLoaded ? 'loaded' : ''}`}>
      <div className="noise" />
      <div className="animated-bg" />

      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <a href="#" className="logo logo-wordmark" data-cursor="Home">
          Emil Vorbrugg
        </a>
        <nav className="nav">
          <a
            href="#about"
            data-cursor="About"
            onClick={(e) => {
              e.preventDefault()
              const target = document.querySelector('#about')
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          >
            About
          </a>
          <a
            href="#works"
            data-cursor="Works"
            onClick={(e) => {
              e.preventDefault()
              const target = document.querySelector('#works')
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          >
            Works
          </a>
          <a
            href="#contact"
            data-cursor="Contact"
            onClick={(e) => {
              e.preventDefault()
              const target = document.querySelector('#contact')
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <a
            href="#works"
            onClick={(e) => {
              e.preventDefault()
              setMobileMenuOpen(false)
              const target = document.querySelector('#works')
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          >
            Works
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              setMobileMenuOpen(false)
              const target = document.querySelector('#about')
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              setMobileMenuOpen(false)
              const target = document.querySelector('#contact')
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Keyboard Scroll Animation with Hero Overlay */}
      <div className="keyboard-hero-wrapper">
        <KeyboardScroll />

        {/* Hero Content Overlay */}
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className={`hero-title-new ${heroScrollProgress > 0.35 ? 'hero-pixel-font' : ''}`}>
              Designer &<br />
              Creative Technologist
            </h1>
            <p className={`hero-subtitle ${heroScrollProgress > 0.35 ? 'hero-pixel-font' : ''}`}>AI-Powered Design Systems</p>
          </div>

          <button
            className="scroll-hint"
            onClick={() => {
              const target = document.querySelector('#works')
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            data-cursor="Scroll"
          >
            <span className="scroll-hint-text">See Work</span>
            <ArrowDown size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Selected Works - IMMEDIATELY AFTER HERO */}
      <section ref={worksRef} id="works" className="section works">
        <div className="container-wide">
          <h2 className={`section-title fade-in-up ${worksVisible ? 'visible' : ''}`}>
            Selected Works
          </h2>

          <div className="project-grid">
            {selectedWorks.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isVisible={worksVisible}
                onClick={() => router.push(`/work/${project.slug}`)}
                hasVideo={!!project.videoUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About - Shortened & Focused */}
      <section ref={aboutRef} id="about" className="section about">
        <div className="container-about">
          <div className="about-content">
            <span className={`section-label fade-in-up ${aboutVisible ? 'visible' : ''}`}>About</span>
            <h2 className={`about-headline fade-in-up stagger-1 ${aboutVisible ? 'visible' : ''}`}>
              Cross-Disciplinary Designer
            </h2>

            <div className={`about-text fade-in-up stagger-2 ${aboutVisible ? 'visible' : ''}`}>
              <p>
                Emil works at the intersection of AI and design—building systems that speed up creative work without losing craft. His Bachelor's thesis at BMW (grade 1.0) automated fragrance design prototyping, reducing timelines from weeks to hours.
              </p>
              <p>
                Background in theatre and music informs his approach: <span className="highlight">design as narrative, timing, and feeling—not just function.</span> Every discipline feeds into the next—theatrical timing shapes UI transitions, musical composition guides visual hierarchy, photographic instinct directs color theory.
              </p>
              <p>
                Currently exploring where emerging technologies create genuine value, not just hype.
              </p>
            </div>

            <Capabilities skills={skills} isVisible={aboutVisible} />
          </div>
        </div>
      </section>

      {/* Other Lives - Reframed as Context */}
      <section ref={otherLivesRef} className="section other-lives">
        <div className="container-wide">
          <h2 className={`section-title fade-in-up ${otherLivesVisible ? 'visible' : ''}`}>
            Beyond Design
          </h2>
          <p className={`section-subtitle fade-in-up stagger-1 ${otherLivesVisible ? 'visible' : ''}`}>
            Years of working in film, music, and craft shape how I approach design—with attention to narrative, timing, and material understanding.
          </p>

          <div className="project-grid three-columns">
            {otherLives.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isVisible={otherLivesVisible}
                onClick={() => project.link ? window.open(project.link, '_blank') : router.push(`/work/${project.slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} id="contact" className="section contact">
        <div className="container">
          <div className="contact-content">
            <span className={`section-label fade-in-up ${contactVisible ? 'visible' : ''}`}>Get in Touch</span>
            <h2 className={`contact-title fade-in-up stagger-1 ${contactVisible ? 'visible' : ''}`}>
              Let's Connect
            </h2>
            <p className={`contact-subtitle fade-in-up stagger-2 ${contactVisible ? 'visible' : ''}`}>
              Interested in collaboration or want to discuss design systems and automation?
            </p>

            <div className={`contact-buttons fade-in-up stagger-3 ${contactVisible ? 'visible' : ''}`}>
              <a href="mailto:emilnet@gmx.de" className="contact-btn primary" data-cursor="Send">
                <Mail size={18} strokeWidth={1.5} />
                <span>Email Me</span>
              </a>
              <a href="https://github.com/Buildemil" target="_blank" rel="noopener noreferrer" className="contact-btn" data-cursor="View">
                <Github size={18} strokeWidth={1.5} />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/emil-vorbrugg-2299a133b/" target="_blank" rel="noopener noreferrer" className="contact-btn" data-cursor="Connect">
                <Linkedin size={18} strokeWidth={1.5} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section ref={clientsRef} className="section clients">
        <div className="container">
          <p className={`clients-label fade-in-up ${clientsVisible ? 'visible' : ''}`}>
            Clients & Collaborations
          </p>
          <div className="clients-row">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className={`client-logo fade-in stagger-${index + 1} ${clientsVisible ? 'visible' : ''}`}
              >
                <Image
                  src={logo.image}
                  alt={logo.alt}
                  width={400}
                  height={240}
                  className="client-logo-img"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <p>© {new Date().getFullYear()} Emil Vorbrugg</p>
          <p className="footer-tagline">Cross-Disciplinary Designer</p>
        </div>
      </footer>

      {/* Modal */}
      {selectedProjectIndex !== null && (
        <FullscreenModal
          project={allProjects[selectedProjectIndex]}
          onClose={() => setSelectedProjectIndex(null)}
          allProjects={allProjects}
          currentIndex={selectedProjectIndex}
          onNavigate={setSelectedProjectIndex}
        />
      )}
    </div>
  )
}
