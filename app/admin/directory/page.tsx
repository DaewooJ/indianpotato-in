'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────
interface Company {
  id: string
  name: string
  slug: string
  category_name: string
  tier: string
  address_state: string | null
  view_count: number | null
  whatsapp_clicks: number | null
  active: boolean
  status: string
  created_at: string
}

interface Submission {
  id: string
  company_name: string
  company_name_hi: string | null
  category_slug: string
  contact_person: string
  email: string
  phone: string
  whatsapp: string | null
  website: string | null
  description: string | null
  city: string | null
  state: string | null
  products: string[] | null
  status: string
  created_at: string
}

interface Enquiry {
  id: string
  name: string
  email: string | null
  phone: string | null
  message: string | null
  company_name: string | null
  source: string | null
  status: string | null
  created_at: string
}

type Tab = 'overview' | 'companies' | 'submissions' | 'enquiries'

const TIER_LABELS: Record<string, string> = {
  platinum: 'प्लैटिनम',
  premium: 'प्रीमियम',
  verified: 'सत्यापित',
  free: 'निःशुल्क',
}

const TIER_COLORS: Record<string, string> = {
  platinum: 'bg-amber-100 text-amber-800',
  premium: 'bg-orange-100 text-orange-800',
  verified: 'bg-green-100 text-green-800',
  free: 'bg-gray-100 text-gray-600',
}

const STATUS_COLORS: Record<string, string> = {
  approved: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800',
}

// ─── Password Gate ───────────────────────────────────────────
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.success) {
        sessionStorage.setItem('admin_auth', 'true')
        onAuth()
      } else {
        setError('गलत पासवर्ड')
      }
    } catch {
      setError('सर्वर त्रुटि')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="पासवर्ड दर्ज करें"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          autoFocus
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'जाँच हो रही है...' : 'लॉगिन'}
        </button>
      </form>
    </div>
  )
}

// ─── Stat Card ───────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

// ─── Badge ───────────────────────────────────────────────────
function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {text}
    </span>
  )
}

// ─── Main Dashboard ──────────────────────────────────────────
export default function AdminDirectoryPage() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>('overview')
  const [companies, setCompanies] = useState<Company[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [companySearch, setCompanySearch] = useState('')
  const [companyTierFilter, setCompanyTierFilter] = useState('all')

  // Check session on mount
  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setAuthed(true)
    }
  }, [])

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [compRes, subRes, enqRes] = await Promise.all([
        fetch('/api/admin/companies'),
        fetch('/api/admin/submissions'),
        fetch('/api/admin/enquiries'),
      ])
      const [compData, subData, enqData] = await Promise.all([
        compRes.json(),
        subRes.json(),
        enqRes.json(),
      ])
      if (compData.success) setCompanies(compData.data)
      if (subData.success) setSubmissions(subData.data)
      if (enqData.success) setEnquiries(enqData.data)
    } catch (e) {
      console.error('Fetch error:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authed) fetchAll()
  }, [authed, fetchAll])

  // ─── Actions ─────────────────────────────────────────────
  async function updateCompany(id: string, updates: Record<string, any>) {
    setActionLoading(id)
    try {
      const res = await fetch('/api/admin/companies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates }),
      })
      const data = await res.json()
      if (data.success) {
        setCompanies((prev) =>
          prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
        )
      }
    } catch (e) {
      console.error(e)
    } finally {
      setActionLoading(null)
    }
  }

  async function handleSubmission(id: string, action: 'approve' | 'reject') {
    setActionLoading(id)
    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: action === 'approve' ? 'approved' : 'rejected' } : s))
        )
        if (action === 'approve') fetchAll() // refresh companies list
      }
    } catch (e) {
      console.error(e)
    } finally {
      setActionLoading(null)
    }
  }

  async function updateEnquiryStatus(id: string, status: string) {
    setActionLoading(id)
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      const data = await res.json()
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status } : e))
        )
      }
    } catch (e) {
      console.error(e)
    } finally {
      setActionLoading(null)
    }
  }

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />

  // ─── Computed stats ──────────────────────────────────────
  const totalCompanies = companies.length
  const pendingSubmissions = submissions.filter((s) => s.status === 'pending').length
  const newEnquiries = enquiries.filter((e) => !e.status || e.status === 'new').length
  const totalViews = companies.reduce((sum, c) => sum + (c.view_count || 0), 0)
  const totalWhatsApp = companies.reduce((sum, c) => sum + (c.whatsapp_clicks || 0), 0)

  const tierCounts = companies.reduce<Record<string, number>>((acc, c) => {
    acc[c.tier] = (acc[c.tier] || 0) + 1
    return acc
  }, {})

  // Filtered companies
  const filteredCompanies = companies.filter((c) => {
    const matchSearch = !companySearch || c.name.toLowerCase().includes(companySearch.toLowerCase()) || c.slug.includes(companySearch.toLowerCase())
    const matchTier = companyTierFilter === 'all' || c.tier === companyTierFilter
    return matchSearch && matchTier
  })

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'overview', label: '📊 ओवरव्यू' },
    { key: 'companies', label: '🏢 कंपनियाँ', count: totalCompanies },
    { key: 'submissions', label: '📝 अनुरोध', count: pendingSubmissions },
    { key: 'enquiries', label: '💬 पूछताछ', count: newEnquiries },
  ]

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">🥔 Admin — डायरेक्टरी</h1>
          <button
            onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthed(false) }}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            लॉगआउट
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t.key
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
              {t.count !== undefined && t.count > 0 && (
                <span className="ml-1.5 bg-red-100 text-red-700 text-xs px-1.5 py-0.5 rounded-full">
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <div className="text-center py-20 text-gray-400">लोड हो रहा है...</div>
        ) : (
          <>
            {/* ─── OVERVIEW TAB ──────────────────────────── */}
            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  <StatCard label="कुल कंपनियाँ" value={totalCompanies} />
                  <StatCard label="लंबित अनुरोध" value={pendingSubmissions} />
                  <StatCard label="नई पूछताछ" value={newEnquiries} />
                  <StatCard label="कुल व्यूज" value={totalViews.toLocaleString('en-IN')} />
                  <StatCard label="WhatsApp क्लिक" value={totalWhatsApp.toLocaleString('en-IN')} />
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h2 className="font-semibold text-gray-900 mb-3">टियर वितरण</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['platinum', 'premium', 'verified', 'free'].map((tier) => (
                      <div key={tier} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <Badge text={TIER_LABELS[tier]} color={TIER_COLORS[tier]} />
                        <span className="text-lg font-bold text-gray-900">{tierCounts[tier] || 0}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent submissions */}
                {pendingSubmissions > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h2 className="font-semibold text-gray-900 mb-3">लंबित अनुरोध</h2>
                    <div className="space-y-2">
                      {submissions
                        .filter((s) => s.status === 'pending')
                        .slice(0, 5)
                        .map((s) => (
                          <div key={s.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{s.company_name}</p>
                              <p className="text-xs text-gray-500">{s.contact_person} · {s.category_slug} · {formatDate(s.created_at)}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSubmission(s.id, 'approve')}
                                disabled={actionLoading === s.id}
                                className="text-xs bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 disabled:opacity-50"
                              >
                                स्वीकार
                              </button>
                              <button
                                onClick={() => handleSubmission(s.id, 'reject')}
                                disabled={actionLoading === s.id}
                                className="text-xs bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 disabled:opacity-50"
                              >
                                अस्वीकार
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ─── COMPANIES TAB ─────────────────────────── */}
            {tab === 'companies' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="कंपनी खोजें..."
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex-1 outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <select
                    value={companyTierFilter}
                    onChange={(e) => setCompanyTierFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">सभी टियर</option>
                    <option value="platinum">प्लैटिनम</option>
                    <option value="premium">प्रीमियम</option>
                    <option value="verified">सत्यापित</option>
                    <option value="free">निःशुल्क</option>
                  </select>
                </div>

                <div className="text-sm text-gray-500">{filteredCompanies.length} कंपनियाँ</div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left px-4 py-3 font-medium text-gray-600">कंपनी</th>
                          <th className="text-left px-4 py-3 font-medium text-gray-600">श्रेणी</th>
                          <th className="text-left px-4 py-3 font-medium text-gray-600">टियर</th>
                          <th className="text-left px-4 py-3 font-medium text-gray-600">राज्य</th>
                          <th className="text-right px-4 py-3 font-medium text-gray-600">व्यूज</th>
                          <th className="text-right px-4 py-3 font-medium text-gray-600">WA</th>
                          <th className="text-center px-4 py-3 font-medium text-gray-600">स्थिति</th>
                          <th className="text-center px-4 py-3 font-medium text-gray-600">एक्शन</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCompanies.map((c) => (
                          <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <p className="font-medium text-gray-900">{c.name}</p>
                              <p className="text-xs text-gray-400">{c.slug}</p>
                            </td>
                            <td className="px-4 py-3 text-gray-600">{c.category_name}</td>
                            <td className="px-4 py-3">
                              <select
                                value={c.tier}
                                onChange={(e) => updateCompany(c.id, { tier: e.target.value })}
                                disabled={actionLoading === c.id}
                                className="text-xs border border-gray-200 rounded px-2 py-1 outline-none"
                              >
                                <option value="free">निःशुल्क</option>
                                <option value="verified">सत्यापित</option>
                                <option value="premium">प्रीमियम</option>
                                <option value="platinum">प्लैटिनम</option>
                              </select>
                            </td>
                            <td className="px-4 py-3 text-gray-600 text-xs">{c.address_state || '—'}</td>
                            <td className="px-4 py-3 text-right text-gray-600">{c.view_count || 0}</td>
                            <td className="px-4 py-3 text-right text-gray-600">{c.whatsapp_clicks || 0}</td>
                            <td className="px-4 py-3 text-center">
                              <Badge
                                text={c.active ? 'सक्रिय' : 'निष्क्रिय'}
                                color={c.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => updateCompany(c.id, { active: !c.active })}
                                disabled={actionLoading === c.id}
                                className={`text-xs px-3 py-1 rounded-md transition-colors disabled:opacity-50 ${
                                  c.active
                                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                              >
                                {c.active ? 'निष्क्रिय करें' : 'सक्रिय करें'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredCompanies.length === 0 && (
                    <div className="text-center py-10 text-gray-400">कोई कंपनी नहीं मिली</div>
                  )}
                </div>
              </div>
            )}

            {/* ─── SUBMISSIONS TAB ───────────────────────── */}
            {tab === 'submissions' && (
              <div className="space-y-4">
                <div className="text-sm text-gray-500">{submissions.length} कुल अनुरोध · {pendingSubmissions} लंबित</div>

                <div className="space-y-3">
                  {submissions.map((s) => (
                    <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900">{s.company_name}</h3>
                            <Badge
                              text={s.status === 'pending' ? 'लंबित' : s.status === 'approved' ? 'स्वीकृत' : 'अस्वीकृत'}
                              color={STATUS_COLORS[s.status] || 'bg-gray-100 text-gray-600'}
                            />
                          </div>
                          {s.company_name_hi && <p className="text-sm text-gray-500">{s.company_name_hi}</p>}
                          <div className="mt-2 text-xs text-gray-500 space-y-0.5">
                            <p>👤 {s.contact_person} · 📧 {s.email} · 📱 {s.phone}</p>
                            <p>📁 {s.category_slug} · 📍 {[s.city, s.state].filter(Boolean).join(', ') || '—'}</p>
                            {s.website && <p>🌐 {s.website}</p>}
                            {s.description && <p className="text-gray-600 mt-1">{s.description}</p>}
                            {s.products && s.products.length > 0 && (
                              <p>उत्पाद: {s.products.join(', ')}</p>
                            )}
                            <p className="text-gray-400">{formatDate(s.created_at)}</p>
                          </div>
                        </div>

                        {s.status === 'pending' && (
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => handleSubmission(s.id, 'approve')}
                              disabled={actionLoading === s.id}
                              className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                            >
                              स्वीकार करें
                            </button>
                            <button
                              onClick={() => handleSubmission(s.id, 'reject')}
                              disabled={actionLoading === s.id}
                              className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                            >
                              अस्वीकार करें
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {submissions.length === 0 && (
                    <div className="text-center py-10 text-gray-400">कोई अनुरोध नहीं</div>
                  )}
                </div>
              </div>
            )}

            {/* ─── ENQUIRIES TAB ─────────────────────────── */}
            {tab === 'enquiries' && (
              <div className="space-y-4">
                <div className="text-sm text-gray-500">{enquiries.length} कुल पूछताछ · {newEnquiries} नई</div>

                <div className="space-y-3">
                  {enquiries.map((e) => (
                    <div key={e.id} className="bg-white rounded-xl border border-gray-200 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900">{e.name}</h3>
                            {e.company_name && (
                              <span className="text-xs text-gray-500">→ {e.company_name}</span>
                            )}
                          </div>
                          <div className="mt-1 text-xs text-gray-500 space-y-0.5">
                            {e.email && <p>📧 {e.email}</p>}
                            {e.phone && <p>📱 {e.phone}</p>}
                            {e.message && <p className="text-gray-700 text-sm mt-1">{e.message}</p>}
                            <p className="text-gray-400">{formatDate(e.created_at)}</p>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <select
                            value={e.status || 'new'}
                            onChange={(ev) => updateEnquiryStatus(e.id, ev.target.value)}
                            disabled={actionLoading === e.id}
                            className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <option value="new">नई</option>
                            <option value="read">पढ़ी</option>
                            <option value="replied">उत्तर दिया</option>
                            <option value="archived">संग्रहीत</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                  {enquiries.length === 0 && (
                    <div className="text-center py-10 text-gray-400">कोई पूछताछ नहीं</div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
