'use client'

import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface EnquiryFormProps {
  companyName: string
}

export function EnquiryForm({ companyName }: EnquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center">
        <CheckCircle2 className="h-10 w-10 text-[#05420d] mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900">इन्क्वायरी भेजी गई!</h3>
        <p className="mt-1 text-sm text-gray-500">
          आपकी इन्क्वायरी {companyName} को भेजी गई है।
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-medium text-[#05420d] hover:underline cursor-pointer"
        >
          एक और इन्क्वायरी भेजें
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setStatus('success'); }} className="space-y-4">
      <h3 className="font-semibold text-gray-900">इन्क्वायरी भेजें</h3>

      <input
        name="sender_name"
        type="text"
        required
        placeholder="आपका नाम *"
        className="w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#05420d]/20 focus:border-[#05420d]"
      />

      <input
        name="sender_email"
        type="email"
        required
        placeholder="ईमेल पता *"
        className="w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#05420d]/20 focus:border-[#05420d]"
      />

      <input
        name="sender_phone"
        type="tel"
        placeholder="फ़ोन नंबर"
        className="w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#05420d]/20 focus:border-[#05420d]"
      />

      <textarea
        name="message"
        required
        rows={4}
        placeholder="आपका संदेश *"
        className="w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#05420d]/20 focus:border-[#05420d] resize-none"
      />

      <Button type="submit" variant="secondary" size="md" className="w-full">
        <Send className="h-4 w-4" />
        इन्क्वायरी भेजें
      </Button>
    </form>
  )
}
