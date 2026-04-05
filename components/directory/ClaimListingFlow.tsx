'use client'

import { useState, useCallback } from 'react'
import { Search, MapPin, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface SearchResult {
  name: string
  slug: string
  category: string
  city?: string | null
  state?: string | null
  isClaimed: boolean
}

interface ClaimListingFlowProps {
  listings: SearchResult[]
}

export function ClaimListingFlow({ listings }: ClaimListingFlowProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searched, setSearched] = useState(false)
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSearch = useCallback(() => {
    if (!query.trim()) return
    setSearched(true)
    setSelectedSlug(null)
    const q = query.trim().toLowerCase()
    setResults(
      listings.filter((l) =>
        l.name.toLowerCase().includes(q)
      ).slice(0, 10)
    )
  }, [query, listings])

  async function handleClaim(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const formEl = e.currentTarget
    const fd = new FormData(formEl)
    const selectedCompany = results.find((r) => r.slug === selectedSlug)

    try {
      const res = await fetch('/api/directory/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: (fd.get('claimant_name') as string).trim(),
          email: (fd.get('claimant_email') as string).trim(),
          phone: (fd.get('claimant_phone') as string).trim(),
          message: (fd.get('message') as string)?.trim() || `क्लेम अनुरोध — पद: ${(fd.get('designation') as string)?.trim() || 'N/A'}`,
          company_name: selectedCompany?.name || '',
          source: 'claim',
        }),
      })
      const result = await res.json()
      if (!result.success) throw new Error(result.error)
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('कुछ गलत हो गया। कृपया WhatsApp पर संपर्क करें।')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="h-14 w-14 text-[#05420d] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900">क्लेम अनुरोध जमा!</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
          हम 72 घंटे के भीतर आपके क्लेम की जाँच करेंगे। आपके द्वारा दिए गए ईमेल पर अपडेट भेजे जाएँगे।
        </p>
        <a
          href="https://spuds.me/kisan"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1fb855] transition-colors"
        >
          WhatsApp पर संपर्क करें
        </a>
      </div>
    )
  }

  const inputCls = 'w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#05420d]/20 focus:border-[#05420d]'

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <label htmlFor="claim-search" className="block text-sm font-semibold text-gray-900 mb-2">
          अपनी कंपनी खोजें
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              id="claim-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="अपनी कंपनी का नाम दर्ज करें..."
              className={`${inputCls} pl-9`}
            />
          </div>
          <Button variant="secondary" size="md" onClick={handleSearch}>
            खोजें
          </Button>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-3">
          {results.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
              <p className="text-sm text-gray-500">
                &quot;{query}&quot; के लिए कोई लिस्टिंग नहीं मिली।{' '}
                <a href="/directory/submit" className="text-[#ed6442] hover:underline font-medium">
                  नई लिस्टिंग जमा करें
                </a>
              </p>
            </div>
          ) : (
            results.map((result) => {
              const location = [result.city, result.state].filter(Boolean).join(', ')
              const isSelected = selectedSlug === result.slug

              return (
                <div key={result.slug}>
                  <div
                    className={`rounded-xl border bg-white p-4 transition-colors ${
                      isSelected ? 'border-[#05420d] ring-2 ring-[#05420d]/20' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900">{result.name}</h3>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                          {location && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {location}
                            </span>
                          )}
                        </div>
                      </div>
                      {result.isClaimed ? (
                        <span className="text-xs text-gray-400 font-medium">पहले से क्लेम</span>
                      ) : (
                        <Button
                          variant={isSelected ? 'secondary' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedSlug(isSelected ? null : result.slug)}
                        >
                          {isSelected ? (
                            <>चुनी गई <ChevronDown className="h-3.5 w-3.5" /></>
                          ) : (
                            'क्लेम करें'
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <form
                      onSubmit={handleClaim}
                      className="rounded-b-xl border border-t-0 border-gray-200 bg-gray-50 p-5 space-y-4 -mt-1"
                    >
                      {status === 'error' && (
                        <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                          <span>{errorMessage}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="claimant_name" className="block text-sm font-medium text-gray-900 mb-1.5">आपका नाम *</label>
                          <input id="claimant_name" name="claimant_name" type="text" required className={inputCls} placeholder="पूरा नाम" />
                        </div>
                        <div>
                          <label htmlFor="claimant_email" className="block text-sm font-medium text-gray-900 mb-1.5">ईमेल *</label>
                          <input id="claimant_email" name="claimant_email" type="email" required className={inputCls} placeholder="you@company.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="claimant_phone" className="block text-sm font-medium text-gray-900 mb-1.5">फ़ोन *</label>
                          <input id="claimant_phone" name="claimant_phone" type="tel" required className={inputCls} placeholder="+91 9876543210" />
                        </div>
                        <div>
                          <label htmlFor="designation" className="block text-sm font-medium text-gray-900 mb-1.5">पद</label>
                          <input id="designation" name="designation" type="text" className={inputCls} placeholder="उदा., निदेशक, मालिक" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-1.5">संदेश <span className="text-gray-400 font-normal">(वैकल्पिक)</span></label>
                        <textarea id="message" name="message" rows={3} className={`${inputCls} resize-none`} placeholder="क्लेम सत्यापन में मदद के लिए अतिरिक्त जानकारी..." />
                      </div>
                      <Button type="submit" variant="primary" size="md" disabled={status === 'loading'}>
                        {status === 'loading' ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            जमा हो रहा है...
                          </span>
                        ) : (
                          'क्लेम अनुरोध जमा करें'
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
