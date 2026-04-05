import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, { rupees = false, decimals = 0 }: { rupees?: boolean; decimals?: number } = {}) {
  const value = rupees ? amount : amount / 100
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

export function getWhatsAppUrl(phone: string, companyName?: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const number = cleaned.startsWith('91') ? cleaned : `91${cleaned}`
  const message = companyName
    ? `नमस्ते, मैंने IndianPotato.in पर ${companyName} को देखा और आपके उत्पादों/सेवाओं में रुचि रखता हूँ।`
    : 'नमस्ते, मैंने IndianPotato.in पर आपकी कंपनी देखी और जुड़ना चाहता हूँ।'
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function getPlanBadgeColor(tier: string): string {
  switch (tier) {
    case 'platinum':
      return 'bg-amber-100 text-amber-800 border-amber-300'
    case 'premium':
      return 'bg-orange-100 text-orange-800 border-orange-300'
    case 'verified':
      return 'bg-green-100 text-green-800 border-green-300'
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200'
  }
}

export function getPlanLabel(tier: string): string {
  switch (tier) {
    case 'platinum':
      return 'प्लैटिनम'
    case 'premium':
      return 'प्रीमियम'
    case 'verified':
      return 'सत्यापित'
    default:
      return 'निःशुल्क'
  }
}

export function getCanonicalUrl(path: string): string {
  return `https://www.indianpotato.in${path.startsWith('/') ? path : `/${path}`}`
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num)
}

export function getEstablishedDisplay(year: number | string | null | undefined): string | null {
  if (!year) return null
  return `स्थापना ${year}`
}
