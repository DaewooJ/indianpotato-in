import Link from 'next/link'
import {
  Sprout,
  Handshake,
  Tractor,
  Snowflake,
  Factory,
  User,
  Microscope,
  Truck,
  Cog,
  Ship,
  Package,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { truncateText } from '@/lib/dir-utils'

// Map category slugs to Lucide icons (matching English directory app)
const ICON_MAP: Record<string, LucideIcon> = {
  'seed-suppliers': Sprout,
  'traders': Handshake,
  'farming-machines': Tractor,
  'cold-storage': Snowflake,
  'processors': Factory,
  'progressive-farmers': User,
  'research': Microscope,
  'transport': Truck,
  'processing-machines': Cog,
  'exporters': Ship,
}

interface CategoryCardProps {
  category: {
    slug: string
    name: string
    nameEn: string
    icon: string
    description: string
    count: number
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = ICON_MAP[category.slug] || Package

  return (
    <Link href={`/directory/${category.slug}`} className="group block">
      <Card className="h-full border-t-4 border-t-transparent group-hover:border-t-[#ed6442] overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0fdf4] text-[#05420d] group-hover:bg-[#ed6442] group-hover:text-white transition-colors">
              <IconComponent className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-[#05420d] transition-colors">
                {category.name}
              </h3>
              <p className="mt-1 text-xs font-medium text-[#ed6442]">
                {category.count} {category.count === 1 ? 'कंपनी' : 'कंपनियाँ'}
              </p>
            </div>
          </div>
          {category.description && (
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              {truncateText(category.description, 100)}
            </p>
          )}
        </div>
      </Card>
    </Link>
  )
}
