import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { generateBreadcrumbJsonLd } from '@/lib/dir-seo'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function DirBreadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLdItems = items
    .filter((item) => item.href)
    .map((item) => ({
      name: item.label,
      path: item.href!,
    }))

  const jsonLd = generateBreadcrumbJsonLd(jsonLdItems)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex items-center gap-1.5 text-sm flex-wrap">
          <li>
            <Link href="/" className="text-gray-500 hover:text-[#05420d] transition-colors">
              होम
            </Link>
          </li>
          <li><ChevronRight className="h-3.5 w-3.5 text-gray-300" /></li>
          <li>
            <Link href="/directory" className="text-gray-500 hover:text-[#05420d] transition-colors">
              डायरेक्टरी
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
              {item.href && index < items.length - 1 ? (
                <Link href={item.href} className="text-gray-500 hover:text-[#05420d] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-[#ed6442]">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
