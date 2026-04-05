import { cn, getPlanBadgeColor, getPlanLabel } from '@/lib/dir-utils'
import { BadgeCheck } from 'lucide-react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'verified' | 'premium' | 'platinum' | 'free' | 'custom'
  tier?: string
}

export function Badge({ className, variant, tier, children, ...props }: BadgeProps) {
  if (variant === 'verified') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-[#f0fdf4] text-[#05420d] border border-[#05420d]/20',
          className
        )}
        {...props}
      >
        <BadgeCheck className="h-3.5 w-3.5" />
        सत्यापित
      </span>
    )
  }

  if (tier) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold border',
          getPlanBadgeColor(tier),
          className
        )}
        {...props}
      >
        {getPlanLabel(tier)}
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
