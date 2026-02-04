import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getNextProject, getAllSlugs } from '@/lib/projects'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {}
  }

  return {
    title: `${project.title} - Emil Vorbrugg`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.hero.src,
          width: project.hero.width,
          height: project.hero.height,
          alt: project.hero.alt,
        }
      ],
    },
  }
}

// Generate static params for all projects
export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const nextProject = getNextProject(project.slug)

  return (
    <div className="project-layout">
      <div className="noise" />

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-top">

          {/* Back Link */}
          <Link href="/" className="back-link">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 1L3 6L8 11"/>
            </svg>
            Work
          </Link>

          {/* Project Header */}
          <div className="project-header">
            <span className="project-number">{project.number}</span>
            <h1 className="project-title-main">{project.title}</h1>
            <p className="project-tagline">{project.description}</p>
          </div>

          {/* Info Grid */}
          <div className="info-grid">

            <div className="info-item">
              <span className="info-label">Year</span>
              <span className="info-value">{project.year}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Services</span>
              <span className="info-value">{project.services.join(', ')}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Tech Stack</span>
              <div className="tech-tags">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {project.stats && project.stats.length > 0 && (
              <div className="info-item">
                <span className="info-label">Results</span>
                <div className="stats-row">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="stat-item">
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Challenge */}
          {project.challenge && (
            <div className="info-item">
              <span className="info-label">The Challenge</span>
              <p className="description">{project.challenge}</p>
            </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div className="info-item">
              <span className="info-label">The Solution</span>
              <p className="description">{project.solution}</p>
            </div>
          )}

          {/* Achievement */}
          {project.achievement && (
            <div className="achievement">
              <div className="achievement-title">{project.achievement.title}</div>
              <p className="achievement-text">{project.achievement.text}</p>
              {project.achievement.subtext && (
                <span className="achievement-subtext">{project.achievement.subtext}</span>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        {project.footer && (
          <div className="sidebar-footer">
            <p className="footer-text">{project.footer}</p>
          </div>
        )}

      </aside>

      {/* Content Area */}
      <main className="content">

        {/* Hero Image or Video */}
        <div className="media-item">
          {project.videoUrl ? (
            <>
              <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                <iframe
                  src={`${project.videoUrl}?autoplay=1&muted=0&badge=0&autopause=0&player_id=0&app_id=58479`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  title={project.title}
                />
              </div>
              <span className="media-label">Project Video</span>
            </>
          ) : (
            <>
              <Image
                src={project.hero.src}
                alt={project.hero.alt}
                width={project.hero.width}
                height={project.hero.height}
                style={{ width: '100%', height: 'auto' }}
                priority
                sizes="(max-width: 768px) 100vw, 70vw"
              />
              <span className="media-label">Hero Visual</span>
            </>
          )}
        </div>

        {/* Additional Media */}
        {project.media && project.media.length > 1 && (
          <div className="media-grid">
            {project.media.slice(1).filter(media => {
              // Skip videos that are already shown as hero
              if (media.type === 'video' && project.videoUrl && media.src === project.videoUrl) {
                return false
              }
              return true
            }).map((media, i) => (
              <div key={i} className="media-item">
                {media.type === 'image' ? (
                  <>
                    <Image
                      src={media.src}
                      alt={media.alt || media.caption || project.title}
                      width={media.width || 1200}
                      height={media.height || 800}
                      style={{ width: '100%', height: 'auto' }}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {media.caption && <span className="media-label">{media.caption}</span>}
                  </>
                ) : media.type === 'video' ? (
                  <>
                    <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                      <iframe
                        src={`${media.src}?autoplay=1&muted=0&badge=0&autopause=0&player_id=0&app_id=58479`}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        title={media.alt || media.caption || project.title}
                      />
                    </div>
                    {media.caption && <span className="media-label">{media.caption}</span>}
                  </>
                ) : null}
              </div>
            ))}
          </div>
        )}

        {/* Next Project */}
        <Link href={`/work/${nextProject.slug}`} className="next-project">
          <div className="next-project-bg"></div>
          <div className="next-project-image">
            <Image
              src={nextProject.hero.src}
              alt={nextProject.hero.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </div>
          <div className="next-project-content">
            <span className="next-project-label">Next Project</span>
            <h3 className="next-project-title">
              {nextProject.title}
              <svg className="next-project-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 10h12M12 4l6 6-6 6"/>
              </svg>
            </h3>
            <p className="next-project-tagline">{nextProject.tagline}</p>
          </div>
        </Link>

      </main>

    </div>
  )
}
