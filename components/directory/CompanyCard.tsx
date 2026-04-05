import Link from 'next/link'
import { MapPin, Eye } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { truncateText, formatNumber } from '@/lib/dir-utils'

interface CompanyCardProps {
  name: string
  slug: string
  categorySlug: string
  description: string | null
  logoUrl?: string | null
  city?: string
  state?: string
  planTier?: string
  isVerified?: boolean
  isFeatured?: boolean
  viewCount?: number
}

export function CompanyCard({
  name,
  slug,
  categorySlug,
  description,
  logoUrl,
  city,
  state,
  planTier = 'free',
  isVerified = false,
  isFeatured = false,
  viewCount,
}: CompanyCardProps) {
  const location = [city, state].filter(Boolean).join(', ')
  const showPlanBadge = planTier === 'premium' || planTier === 'platinum'
  const isPlatinum = planTier === 'platinum'
  const isPremium = planTier === 'premium'

  return (
    <Link href={`/directory/${categorySlug}/${slug}`} className="group block">
      <Card
        className={
          isPlatinum
            ? 'border-t-4 border-t-amber-400 overflow-hidden'
            : isPremium
              ? 'border-l-4 border-l-[#ed6442] overflow-hidden'
              : 'overflow-hidden'
        }
      >
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3.5">
            {/* Logo / Initial */}
            {logoUrl ? (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={logoUrl}
                  alt={`${name} logo`}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f0fdf4] text-[#05420d] font-bold text-lg">
                {name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-900 group-hover:text-[#05420d] transition-colors leading-tight">
                  {name}
                </h3>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {isVerified && <Badge variant="verified" />}
                  {showPlanBadge && <Badge tier={planTier} />}
                </div>
              </div>

              {description && (
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                  {truncateText(description, 120)}
                </p>
              )}

              <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                {location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {location}
                  </span>
                )}
                {viewCount !== undefined && viewCount > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {formatNumber(viewCount)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
