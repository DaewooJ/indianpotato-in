'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface StateOption {
  slug: string
  name: string
  nameEn: string
}

interface FilterSidebarProps {
  states?: StateOption[]
}

export function FilterSidebar({ states = [] }: FilterSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentState = searchParams.get('state') ?? ''
  const currentQuery = searchParams.get('q') ?? ''

  const [mobileOpen, setMobileOpen] = useState(false)

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === '') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      }
      params.delete('page')
      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname)
    },
    [router, pathname, searchParams]
  )

  const clearAll = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  const hasFilters = currentState || currentQuery

  const filterContent = (
    <div className="space-y-6">
      <div>
        <label htmlFor="filter-search" className="block text-sm font-semibold text-gray-900 mb-2">
          खोजें
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            id="filter-search"
            type="text"
            defaultValue={currentQuery}
            placeholder="कंपनी खोजें..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#05420d]/20 focus:border-[#05420d]"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateParams({ q: e.currentTarget.value || null })
              }
            }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="filter-state" className="block text-sm font-semibold text-gray-900 mb-2">
          राज्य
        </label>
        <select
          id="filter-state"
          value={currentState}
          onChange={(e) => updateParams({ state: e.target.value || null })}
          className="w-full rounded-lg border border-gray-200 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#05420d]/20 focus:border-[#05420d] appearance-none bg-white cursor-pointer"
        >
          <option value="">सभी राज्य</option>
          {states.map((s) => (
            <option key={s.slug} value={s.nameEn}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" className="w-full" onClick={clearAll}>
          सभी फ़िल्टर हटाएँ
        </Button>
      )}
    </div>
  )

  return (
    <>
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="h-4 w-4" />
          फ़िल्टर
          {hasFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ed6442] text-white text-xs">!</span>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">फ़िल्टर</h2>
              <button type="button" onClick={() => setMobileOpen(false)} className="p-2 -mr-2 text-gray-400 hover:text-gray-900 cursor-pointer" aria-label="बंद करें">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{filterContent}</div>
            <div className="p-4 border-t border-gray-200">
              <Button variant="secondary" size="md" className="w-full" onClick={() => setMobileOpen(false)}>
                परिणाम दिखाएँ
              </Button>
            </div>
          </div>
        </div>
      )}

      <aside className="hidden lg:block">
        <div className="sticky top-20 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-5">फ़िल्टर</h2>
          {filterContent}
        </div>
      </aside>
    </>
  )
}
