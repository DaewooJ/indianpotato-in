'use client'

import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

interface EnquiryFormProps {
  companyName: string
}

export function EnquiryForm({ companyName }: EnquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const formEl = e.currentTarget
    const fd = new FormData(formEl)

    try {
      const supabase = createClient()
      const { error } = await supabase.from('enquiries').insert({
        company_id: null,
        name: (fd.get('sender_name') as string).trim(),
        email: (fd.get('sender_email') as string).trim(),
        phone: (fd.get('sender_phone') as string)?.trim() || null,
        message: (fd.get('message') as string).trim(),
        company_name: companyName,
        source: 'directory',
      })

      if (error) throw error
      setStatus('success')
      formEl.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage('कुछ गलत हो गया। कृपया WhatsApp पर संपर्क करें।')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center">
        <CheckCircle2 className="h-10 w-10 text-[#05420d] mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900">इन्क्वायरी भेजी गई!</h3>
        <p className="mt-1 text-sm text-gray-500">
          आपकी पूछताछ भेज दी गई है। हम जल्द संपर्क करेंगे।
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

  const inputCls = 'w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#05420d]/20 focus:border-[#05420d]'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-semibold text-gray-900">इन्क्वायरी भेजें</h3>

      {status === 'error' && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <input name="sender_name" type="text" required placeholder="आपका नाम *" className={inputCls} />
      <input name="sender_email" type="email" required placeholder="ईमेल पता *" className={inputCls} />
      <input name="sender_phone" type="tel" placeholder="फ़ोन नंबर" className={inputCls} />
      <textarea name="message" required rows={4} placeholder="आपका संदेश *" className={`${inputCls} resize-none`} />

      <Button type="submit" variant="secondary" size="md" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            भेज रहे हैं...
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Send className="h-4 w-4" />
            इन्क्वायरी भेजें
          </span>
        )}
      </Button>
    </form>
  )
}
