export interface ProjectMedia {
  type: 'image' | 'video'
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  span?: 'large' | 'wide' | 'tall'
}

export interface Project {
  slug: string
  title: string
  number: string  // "01", "02", etc.
  year: string
  category: 'work' | 'other'
  tagline: string
  description: string
  services: string[]
  tech: string[]
  challenge?: string
  solution?: string
  achievement?: { title: string; text: string; subtext?: string }
  stats?: { value: string; label: string }[]
  hero: {
    src: string
    alt: string
    width: number
    height: number
  }
  media: ProjectMedia[]
  link?: string
  videoUrl?: string
  footer?: string
}

export const projects: Project[] = [
  {
    slug: 'ai-scent-design',
    title: 'AI Scent Design',
    number: '01',
    year: '2024',
    category: 'work',
    tagline: 'From concept to composition in 20 minutes',
    description: 'AI-powered fragrance design tool reducing workflow from 1 week to 20 minutes',
    services: ['AI Integration', 'Custom Workflow Design', 'Enterprise Platform Migration'],
    tech: ['ChatGPT', 'MidJourney', 'BMW Gaia', 'Custom GPT'],
    challenge: 'BMW\'s scent designer spent one week per fragrance manually creating visualizations in Photoshop—an unsustainable bottleneck for rapid concept development.',
    solution: 'Built a custom GPT trained on the Lush Essence Catalog that generates complete fragrance concepts: professional names, detailed formulas, photorealistic MidJourney visualizations with specific camera parameters (Sony Alpha 7R IV, 50mm G-Master), and compelling 500-600 character descriptions. The AI logically arranges components—top notes higher, heart notes centered, base notes at foundation.',
    achievement: {
      title: 'Historic First',
      text: 'First completely AI-generated automotive fragrance',
      subtext: 'Produced by LUZI perfume house Switzerland (creating for HUGO BOSS, Hermès, Louis Vuitton)'
    },
    stats: [
      { value: '97%', label: 'Time saved' },
      { value: '20min', label: 'Per fragrance' }
    ],
    hero: {
      src: '/images/projects/ai-scent-design/hero.jpg',
      alt: 'AI-generated fragrance visualization with professional camera parameters',
      width: 1200,
      height: 800
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/hero.jpg',
        alt: 'AI-generated fragrance visualization with professional camera parameters',
        caption: 'AI-generated fragrance visualization',
        width: 1200,
        height: 800,
        span: 'large'
      },
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/magnifics_upscale-T45yfzp7aBIeyO13fGVz-u8622697773_A_high-quality_still_life_featuring_essential_per_c01af117-27fe-4aeb-a7e9-be98862be960_1.png',
        alt: 'High-quality still life featuring essential perfume elements',
        caption: 'High-quality still life with perfume elements',
        width: 1200,
        height: 800,
        span: 'wide'
      },
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/detail-01.jpg',
        alt: 'Detailed scent composition showing layered arrangement',
        caption: 'Layered scent composition',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/magnifics_upscale-Q8U2jMyt67GmayltqRWK-u8622697773_A_hyper-minimalist_sculptural_perfume_bottle_that_8c13e369-cdd1-4fa3-bcfa-6931a52abd45_3.png',
        alt: 'Hyper-minimalist sculptural perfume bottle design',
        caption: 'Sculptural perfume bottle',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/DARK_BLUE_152.png',
        alt: 'Dark blue fragrance concept visualization',
        caption: 'Dark blue fragrance concept',
        width: 1200,
        height: 800,
        span: 'tall'
      },
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/LIGHT_BLUE_111.png',
        alt: 'Light blue fragrance concept visualization',
        caption: 'Light blue fragrance concept',
        width: 1200,
        height: 800,
        span: 'tall'
      },
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/IMG_2261.jpg',
        alt: 'Fragrance design detail shot',
        caption: 'Design detail',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/IMG_2262.jpg',
        alt: 'Fragrance composition detail',
        caption: 'Composition detail',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/LUieN4GE1rreb5IgyFxX.png',
        alt: 'AI-generated scent design concept',
        caption: 'AI-generated concept',
        width: 1200,
        height: 800,
        span: 'wide'
      },
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/ASkbzeoKpOZqH1EymJ2r.png',
        alt: 'Detailed fragrance visualization',
        caption: 'Detailed visualization',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/Bildschirmfoto 2024-11-21 um 18.48.34.png',
        alt: 'AI workflow interface screenshot',
        caption: 'AI workflow interface',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/Bildschirmfoto 2024-11-21 um 19.00.19.png',
        alt: 'Scent design tool interface',
        caption: 'Design tool interface',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/ai-scent-design/Bildschirmfoto 2024-12-16 um 21.22.52.png',
        alt: 'Workflow configuration',
        caption: 'Workflow configuration',
        width: 1200,
        height: 800
      }
    ],
    footer: 'Enterprise Integration: Migrated to BMW\'s internal "Gaia" platform for security compliance.'
  },
  {
    slug: 'custom-ai-workflows',
    title: 'Custom AI Workflows',
    number: '02',
    year: '2024',
    category: 'work',
    tagline: 'Enterprise-grade automation with security compliance',
    description: 'Enterprise-grade AI workflow automation with security compliance',
    services: ['Process Automation', 'AI Integration', 'Security Compliance'],
    tech: ['n8n', 'OpenAI', 'Claude', 'Enterprise APIs'],
    challenge: 'Enterprise environments require AI automation that handles complex business processes while maintaining strict security and compliance standards.',
    solution: 'Comprehensive AI automation solutions built with n8n, integrating multiple AI models (GPT-4, Claude, custom models) with existing business tools. Created seamless automation pipelines with error handling, fallback mechanisms, audit logging, and secure API management. All workflows designed to ensure sensitive data never leaves the corporate environment.',
    stats: [
      { value: 'Multi-Model', label: 'AI Integration' },
      { value: 'Enterprise', label: 'Security Grade' },
      { value: 'Full Stack', label: 'Automation' }
    ],
    hero: {
      src: '/images/projects/custom-ai-workflows/hero.jpg',
      alt: 'n8n workflow automation dashboard',
      width: 1200,
      height: 800
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/custom-ai-workflows/hero.jpg',
        alt: 'n8n workflow automation dashboard',
        caption: 'n8n workflow automation dashboard',
        width: 1200,
        height: 800
      }
    ]
  },
  {
    slug: 'lichtobjekt',
    title: 'Lichtobjekt',
    number: '03',
    year: '2023',
    category: 'work',
    tagline: 'Where WebGL meets physical hardware',
    description: 'WebGL shader-based lighting controller with Apple Liquid Glass UI',
    services: ['UI/UX Design', 'WebGL Development', 'Hardware Integration'],
    tech: ['WebGL', 'GLSL', 'Hardware', 'React'],
    challenge: 'Creating an intuitive control interface for LED hardware that feels as beautiful and fluid as modern Apple products.',
    solution: 'A sophisticated lighting control interface combining hardware LED control with WebGL-powered UI. Features real-time shader effects mimicking Apple\'s Liquid Glass design language. Users control lighting parameters through intuitive gesture-based interactions, bridging digital design with physical hardware.',
    stats: [
      { value: 'Real-time', label: 'Shader Effects' },
      { value: 'Hardware', label: 'LED Control' },
      { value: 'Apple-inspired', label: 'Design Language' }
    ],
    hero: {
      src: '/images/projects/lichtobjekt/hero.jpg',
      alt: 'Liquid Glass UI interface with real-time shader effects',
      width: 1200,
      height: 800
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/lichtobjekt/hero.jpg',
        alt: 'Liquid Glass UI interface with real-time shader effects',
        caption: 'Liquid Glass UI interface with real-time shader effects',
        width: 1200,
        height: 800
      }
    ]
  },
  {
    slug: 'bmw-bubble',
    title: 'BMW Bubble',
    number: '04',
    year: '2023',
    category: 'work',
    tagline: 'Interactive physics meets brand experience',
    description: 'Interactive bubble visualization for BMW brand experience',
    services: ['WebGL Development', 'Interactive Design', 'Brand Experience'],
    tech: ['WebGL', 'Three.js', 'React', 'Custom Shaders'],
    challenge: 'Creating an immersive, brand-aligned digital experience that showcases technical capability while maintaining BMW\'s premium aesthetic.',
    solution: 'An immersive WebGL-based bubble simulation featuring real-time physics, custom shader effects, and interactive elements responding to user input. Bubbles rendered using custom GLSL shaders create iridescent, soap-bubble-like effects with realistic light refraction. Optimized particle systems and WebGL 2.0 shader pipeline seamlessly integrate with BMW\'s design system.',
    stats: [
      { value: 'WebGL 2.0', label: 'Graphics Pipeline' },
      { value: 'Custom', label: 'GLSL Shaders' },
      { value: 'Real-time', label: 'Physics' }
    ],
    hero: {
      src: '/images/projects/bmw-bubble/hero.jpg',
      alt: 'Interactive bubble simulation with physics-based particles',
      width: 1200,
      height: 520
    },
    videoUrl: 'https://player.vimeo.com/video/1161945980',
    media: [
      {
        type: 'image',
        src: '/images/projects/bmw-bubble/hero.jpg',
        alt: 'Interactive bubble simulation with physics-based particles',
        caption: 'Interactive bubble simulation with physics-based particles',
        width: 1200,
        height: 520
      },
      {
        type: 'video',
        src: 'https://player.vimeo.com/video/1161945980',
        alt: 'BMW Bubble interactive demonstration',
        caption: 'Interactive demonstration',
        width: 1920,
        height: 648
      },
      {
        type: 'image',
        src: '/images/projects/bmw-bubble/Bubble_07_Final.png',
        alt: 'BMW Bubble final design visualization',
        caption: 'Final bubble design',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/bmw-bubble/_G000772.jpg',
        alt: 'BMW Bubble installation view',
        caption: 'Installation view',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/bmw-bubble/emil_vorbrugg_None_7009b810-3979-4190-9d7e-41fbbfe9b428.jpg',
        alt: 'BMW Bubble concept visualization',
        caption: 'Concept visualization',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/bmw-bubble/emil_vorbrugg_happy_relaxed_person_sitting_in_a_semi-transparent_s_a9a7122f-b0dd-4098-883c-4c1ef882a148.jpg',
        alt: 'Person interacting with BMW Bubble experience',
        caption: 'User interaction',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/bmw-bubble/emil_vorbrugg_two_happy_relaxed_people_talking_they_each_are_surro_30eef57d-62e7-4420-b231-41be074c4cef.jpg',
        alt: 'Two people experiencing BMW Bubble installation',
        caption: 'Collaborative experience',
        width: 1200,
        height: 800
      }
    ]
  },
  {
    slug: '5x-plus-magazine',
    title: '5×Plus Magazine',
    number: '05',
    year: '2022',
    category: 'work',
    tagline: 'When sound becomes visual form',
    description: 'Experimental sound design magazine exploring audio-visual storytelling',
    services: ['Editorial Design', 'Typography', 'Print Production'],
    tech: ['Editorial', 'Print', 'Typography'],
    challenge: 'Translating abstract sonic concepts into compelling visual layouts that function as both informative articles and representations of sound.',
    solution: 'An experimental editorial project exploring the intersection of sound design, visual communication, and print media. Features innovative layouts that visualize sound waves and audio concepts. Each spread functions as both article and visual representation. Challenges traditional magazine design through experimental typography, unconventional grid systems, and print techniques referencing audio equipment aesthetics.',
    stats: [
      { value: 'Audio-Visual', label: 'Storytelling' },
      { value: 'Experimental', label: 'Typography' },
      { value: 'Print', label: 'Production' }
    ],
    hero: {
      src: '/images/projects/5x-plus-magazine/hero.jpg',
      alt: 'Experimental editorial layout visualizing sound concepts',
      width: 1200,
      height: 800
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/5x-plus-magazine/hero.jpg',
        alt: 'Experimental editorial layout visualizing sound concepts',
        caption: 'Experimental editorial layout visualizing sound concepts',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/5x-plus-magazine/_VOR5224.jpg',
        alt: '5×Plus Magazine spread detail',
        caption: 'Magazine spread detail',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/5x-plus-magazine/_VOR5239.jpg',
        alt: 'Audio visualization layout',
        caption: 'Audio visualization layout',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/5x-plus-magazine/_VOR5241.jpg',
        alt: 'Typography and sound design',
        caption: 'Typography and sound design',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/5x-plus-magazine/_VOR6343.jpg',
        alt: 'Editorial spread with experimental layout',
        caption: 'Experimental layout',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/5x-plus-magazine/_VOR6382.jpg',
        alt: 'Magazine detail shot',
        caption: 'Detail shot',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/5x-plus-magazine/_VOR6429.jpg',
        alt: 'Print production detail',
        caption: 'Print production detail',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/5x-plus-magazine/_VOR6438.jpg',
        alt: 'Sound wave visualization',
        caption: 'Sound wave visualization',
        width: 1200,
        height: 800
      },
      {
        type: 'image',
        src: '/images/projects/5x-plus-magazine/_VOR6474.jpg',
        alt: 'Final magazine presentation',
        caption: 'Final presentation',
        width: 1200,
        height: 800
      }
    ]
  },
  {
    slug: 'sarah-in-the-bathroom',
    title: 'Sarah in the Bathroom',
    number: '06',
    year: '2023',
    category: 'work',
    tagline: 'Intimate cinematography meets musical narrative',
    description: 'Music video showcasing cinematographic storytelling',
    services: ['Direction', 'Cinematography', 'Lighting Design', 'Editing'],
    tech: ['Camera', 'Direction', 'Lighting', 'Editing'],
    challenge: 'Creating an intimate visual narrative that complements and elevates the musical storytelling without overwhelming it.',
    solution: 'A music video project combining intimate cinematography with careful lighting design, demonstrating the intersection of musical and visual narrative. The project showcases technical cinematographic skill while maintaining emotional authenticity.',
    stats: [
      { value: 'Full', label: 'Direction' },
      { value: 'Intimate', label: 'Cinematography' },
      { value: 'Professional', label: 'Production' }
    ],
    hero: {
      src: '/images/projects/sarah-in-the-bathroom/hero.jpg',
      alt: 'Cinematographic storytelling with careful lighting design',
      width: 1200,
      height: 800
    },
    videoUrl: 'https://player.vimeo.com/video/830028856',
    media: [
      {
        type: 'image',
        src: '/images/projects/sarah-in-the-bathroom/hero.jpg',
        alt: 'Cinematographic storytelling with careful lighting design',
        caption: 'Cinematographic storytelling with careful lighting design',
        width: 1200,
        height: 800
      },
      {
        type: 'video',
        src: 'https://player.vimeo.com/video/830028856',
        alt: 'Sarah in the Bathroom music video',
        caption: 'Full music video',
        width: 1920,
        height: 1080
      }
    ]
  },
  {
    slug: 'music-production',
    title: 'Music Production',
    number: '07',
    year: 'Ongoing',
    category: 'other',
    tagline: 'Electronic experimentation with modular synths',
    description: 'Electronic music production and live performance with modular synths',
    services: ['Music Production', 'Sound Design', 'Live Performance'],
    tech: ['Ableton', 'Modular', 'Live Performance'],
    challenge: 'Creating compelling electronic music that embraces the unpredictable nature of modular synthesis while maintaining artistic control.',
    solution: 'Electronic music production focusing on experimental sound design and live performance. Setup includes modular synthesis systems, custom-built controllers, and real-time audio manipulation. Live performances emphasize improvisation and the unpredictable nature of modular systems.',
    stats: [
      { value: 'Since 2012', label: 'Experience' },
      { value: 'Modular', label: 'Synthesis' },
      { value: 'Live', label: 'Performance' }
    ],
    hero: {
      src: '/images/projects/music-production/hero.jpg',
      alt: 'Modular synthesis setup for live performance',
      width: 1200,
      height: 800
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/music-production/hero.jpg',
        alt: 'Modular synthesis setup for live performance',
        caption: 'Modular synthesis setup for live performance',
        width: 1200,
        height: 800
      }
    ]
  },
  {
    slug: 'acting',
    title: 'Acting',
    number: '08',
    year: 'Since 2018',
    category: 'other',
    tagline: 'Film and television storytelling',
    description: 'Film and television work',
    services: ['Film Acting', 'Television', 'Character Development'],
    tech: ['Film', 'Television', 'Theater'],
    challenge: 'Bringing authentic character performances across diverse film and television productions.',
    solution: 'Professional acting work in film and television since 2018. Projects range from independent films to major TV productions, demonstrating versatility across different media and genres.',
    stats: [
      { value: 'Since 2018', label: 'Professional Work' },
      { value: 'Film & TV', label: 'Productions' },
      { value: 'Diverse', label: 'Roles' }
    ],
    hero: {
      src: '/images/projects/acting/hero.jpg',
      alt: 'Professional acting work in film and television',
      width: 1200,
      height: 800
    },
    link: 'https://www.filmmakers.eu/de/actors/emil-vorbrugg',
    media: [
      {
        type: 'image',
        src: '/images/projects/acting/hero.jpg',
        alt: 'Professional acting work in film and television',
        caption: 'Professional acting work in film and television',
        width: 1200,
        height: 800
      }
    ]
  },
  {
    slug: 'handcraft-analog-work',
    title: 'Handcraft & Analog Work',
    number: '09',
    year: 'Ongoing',
    category: 'other',
    tagline: 'From metalwork to letterpress',
    description: 'From metalwork to letterpress — handcrafted creations',
    services: ['Metal Fabrication', 'Woodworking', 'Letterpress'],
    tech: ['Welding', 'Woodworking', 'Letterpress'],
    challenge: 'Celebrating traditional craftsmanship in a digital age while maintaining high standards of precision and artistry.',
    solution: 'Analog craft projects spanning multiple disciplines. From welding metal sculptures to precision woodworking. Letterpress work includes custom type design and traditional printing techniques, honoring centuries-old craft traditions.',
    stats: [
      { value: 'Multi-', label: 'Disciplinary' },
      { value: 'Traditional', label: 'Techniques' },
      { value: 'Handcrafted', label: 'Quality' }
    ],
    hero: {
      src: '/images/projects/handcraft-analog-work/hero.jpg',
      alt: 'Traditional craftsmanship across multiple disciplines',
      width: 1200,
      height: 800
    },
    media: [
      {
        type: 'image',
        src: '/images/projects/handcraft-analog-work/hero.jpg',
        alt: 'Traditional craftsmanship across multiple disciplines',
        caption: 'Traditional craftsmanship across multiple disciplines',
        width: 1200,
        height: 800
      }
    ]
  }
]

// Helper Functions
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getNextProject(currentSlug: string): Project {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug)
  const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1
  return projects[nextIndex]
}

export function getAllSlugs(): string[] {
  return projects.map(p => p.slug)
}
