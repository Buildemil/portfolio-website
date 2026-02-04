import { getAllSlugs } from '@/lib/projects'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
