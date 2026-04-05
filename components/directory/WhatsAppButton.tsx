'use client'

import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/dir-utils'

interface WhatsAppButtonProps {
  phone: string
  companyName?: string
  className?: string
}

export function WhatsAppButton({ phone, companyName, className = '' }: WhatsAppButtonProps) {
  const url = getWhatsAppUrl(phone, companyName)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1fb855] transition-colors shadow-sm ${className}`}
    >
      <MessageCircle className="h-4.5 w-4.5" />
      WhatsApp
    </a>
  )
}
