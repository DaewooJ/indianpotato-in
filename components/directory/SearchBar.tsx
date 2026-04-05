'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

interface SearchBarProps {
  categories: { slug: string; name: string }[]
}

export function SearchBar({ categories }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [categorySlug, setCategorySlug] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())

    const basePath = categorySlug
      ? `/directory/${categorySlug}`
      : '/directory/seed-suppliers'

    const url = params.toString()
      ? `${basePath}?${params.toString()}`
      : basePath

    router.push(url)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:bg-white sm:rounded-xl sm:shadow-lg sm:ring-1 sm:ring-black/5 sm:p-1.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="कंपनी, उत्पाद या राज्य खोजें..."
            className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg bg-white sm:bg-transparent py-3 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <div className="relative sm:border-l sm:border-gray-200">
          <select
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="w-full sm:w-48 appearance-none bg-white sm:bg-transparent py-3 px-3 text-sm text-gray-900 focus:outline-none rounded-lg sm:rounded-none cursor-pointer"
          >
            <option value="">सभी श्रेणियाँ</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#ed6442] hover:bg-[#d94e2a] text-white font-semibold px-6 py-3 sm:py-2 rounded-lg text-sm transition-colors cursor-pointer"
        >
          खोजें
        </button>
      </div>
    </form>
  )
}
