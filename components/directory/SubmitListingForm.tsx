'use client'

import { useState } from 'react'
import { CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { COMPANY_SIZE_LABELS, TURNOVER_LABELS, CERTIFICATIONS } from '@/lib/dir-constants'

const STEPS = ['कंपनी की बुनियादी जानकारी', 'संपर्क और स्थान', 'व्यवसाय विवरण', 'समीक्षा और जमा करें']

const CATEGORIES = [
  { id: 'seed-suppliers', name: 'बीज आपूर्तिकर्ता' },
  { id: 'traders', name: 'व्यापारी / आढ़तिया' },
  { id: 'farming-machines', name: 'कृषि मशीनें' },
  { id: 'cold-storage', name: 'कोल्ड स्टोरेज' },
  { id: 'processors', name: 'प्रसंस्करण कंपनियाँ' },
  { id: 'progressive-farmers', name: 'प्रगतिशील किसान' },
  { id: 'research', name: 'अनुसंधान संस्थान' },
  { id: 'transport', name: 'परिवहन / लॉजिस्टिक्स' },
  { id: 'processing-machines', name: 'प्रसंस्करण मशीनें' },
  { id: 'exporters', name: 'निर्यातक' },
]

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

interface FormData {
  company_name: string
  category_id: string
  short_description: string
  description: string
  email: string
  phone: string
  whatsapp: string
  website: string
  address_line: string
  city: string
  state: string
  pin_code: string
  year_established: string
  company_size: string
  annual_turnover: string
  products_services: string
  certifications: string[]
  fssai_number: string
  apeda_number: string
  gst_number: string
  iec_number: string
}

const INITIAL: FormData = {
  company_name: '', category_id: '', short_description: '', description: '',
  email: '', phone: '', whatsapp: '', website: '', address_line: '',
  city: '', state: '', pin_code: '', year_established: '', company_size: '',
  annual_turnover: '', products_services: '', certifications: [],
  fssai_number: '', apeda_number: '', gst_number: '', iec_number: '',
}

export function SubmitListingForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function toggleCert(cert: string) {
    setForm((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert],
    }))
  }

  function validateStep(s: number): boolean {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (s === 0) {
      if (!form.company_name.trim()) e.company_name = 'कंपनी का नाम आवश्यक है'
      if (!form.category_id) e.category_id = 'श्रेणी चुनें'
      if (!form.description.trim() || form.description.trim().length < 20)
        e.description = 'विवरण आवश्यक है (न्यूनतम 20 अक्षर)'
    }
    if (s === 1) {
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = 'सही ईमेल दर्ज करें'
      if (!form.phone.trim() || form.phone.trim().length < 10)
        e.phone = 'सही फ़ोन नंबर दर्ज करें'
      if (!form.city.trim()) e.city = 'शहर आवश्यक है'
      if (!form.state) e.state = 'राज्य चुनें'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function nextStep() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  function prevStep() {
    setStep((s) => Math.max(s - 1, 0))
  }

  async function handleSubmit() {
    setStatus('loading')
    setErrorMessage('')

    const productsArray = form.products_services
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean)

    try {
      const res = await fetch('/api/directory/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: form.company_name.trim(),
          category_slug: form.category_id,
          description: form.description.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          whatsapp: form.whatsapp.trim() || null,
          website: form.website.trim() || null,
          city: form.city.trim() || null,
          state: form.state || null,
          products: productsArray.length > 0 ? productsArray.join(', ') : null,
        }),
      })
      const result = await res.json()
      if (!result.success) throw new Error(JSON.stringify(result))
      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setErrorMessage(`Error: ${err?.message || 'Unknown'}`)
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="h-14 w-14 text-[#05420d] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900">लिस्टिंग जमा हो गई!</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
          आपकी कंपनी की जानकारी प्राप्त हो गई है। जल्दी लिस्टिंग के लिए WhatsApp पर संपर्क करें।
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
  const labelCls = 'block text-sm font-medium text-gray-900 mb-1.5'
  const errorCls = 'text-xs text-red-600 mt-1'

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  i < step
                    ? 'bg-[#05420d] text-white'
                    : i === step
                      ? 'bg-[#ed6442] text-white'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className="hidden sm:block text-xs font-medium text-gray-400">{label}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-[#05420d] rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 mb-6">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        {/* Step 1: Company Basics */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">कंपनी की बुनियादी जानकारी</h2>
            <div>
              <label htmlFor="company_name" className={labelCls}>कंपनी का नाम *</label>
              <input id="company_name" type="text" value={form.company_name} onChange={(e) => updateField('company_name', e.target.value)} className={inputCls} placeholder="उदा., आगरा पोटैटो एक्सपोर्ट्स प्रा. लि." />
              {errors.company_name && <p className={errorCls}>{errors.company_name}</p>}
            </div>
            <div>
              <label htmlFor="category" className={labelCls}>श्रेणी *</label>
              <select id="category" value={form.category_id} onChange={(e) => updateField('category_id', e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
                <option value="">श्रेणी चुनें</option>
                {CATEGORIES.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
              </select>
              {errors.category_id && <p className={errorCls}>{errors.category_id}</p>}
            </div>
            <div>
              <label htmlFor="short_desc" className={labelCls}>संक्षिप्त विवरण <span className="text-gray-400 font-normal">(SEO के लिए, अधिकतम 160 अक्षर)</span></label>
              <input id="short_desc" type="text" maxLength={160} value={form.short_description} onChange={(e) => updateField('short_description', e.target.value)} className={inputCls} placeholder="आपकी कंपनी के बारे में एक पंक्ति" />
              <p className="text-xs text-gray-400 mt-1">{form.short_description.length}/160</p>
            </div>
            <div>
              <label htmlFor="description" className={labelCls}>पूर्ण विवरण *</label>
              <textarea id="description" rows={5} value={form.description} onChange={(e) => updateField('description', e.target.value)} className={`${inputCls} resize-none`} placeholder="अपनी कंपनी, उत्पाद, सेवाएँ और विशेषताएँ बताएँ..." />
              {errors.description && <p className={errorCls}>{errors.description}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Contact & Location */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">संपर्क और स्थान</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className={labelCls}>ईमेल *</label>
                <input id="email" type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} className={inputCls} placeholder="info@company.com" />
                {errors.email && <p className={errorCls}>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className={labelCls}>फ़ोन *</label>
                <input id="phone" type="tel" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} className={inputCls} placeholder="+91 9876543210" />
                {errors.phone && <p className={errorCls}>{errors.phone}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="whatsapp" className={labelCls}>WhatsApp</label>
                <input id="whatsapp" type="tel" value={form.whatsapp} onChange={(e) => updateField('whatsapp', e.target.value)} className={inputCls} placeholder="+91 9876543210" />
              </div>
              <div>
                <label htmlFor="website" className={labelCls}>वेबसाइट</label>
                <input id="website" type="url" value={form.website} onChange={(e) => updateField('website', e.target.value)} className={inputCls} placeholder="https://www.company.com" />
              </div>
            </div>
            <div>
              <label htmlFor="address" className={labelCls}>पता</label>
              <input id="address" type="text" value={form.address_line} onChange={(e) => updateField('address_line', e.target.value)} className={inputCls} placeholder="गली का पता" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className={labelCls}>शहर *</label>
                <input id="city" type="text" value={form.city} onChange={(e) => updateField('city', e.target.value)} className={inputCls} placeholder="उदा., आगरा" />
                {errors.city && <p className={errorCls}>{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="state" className={labelCls}>राज्य *</label>
                <select id="state" value={form.state} onChange={(e) => updateField('state', e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
                  <option value="">राज्य चुनें</option>
                  {STATES.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
                {errors.state && <p className={errorCls}>{errors.state}</p>}
              </div>
              <div>
                <label htmlFor="pincode" className={labelCls}>पिन कोड</label>
                <input id="pincode" type="text" maxLength={6} value={form.pin_code} onChange={(e) => updateField('pin_code', e.target.value.replace(/\D/g, ''))} className={inputCls} placeholder="282001" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Business Details */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">व्यवसाय विवरण</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="established" className={labelCls}>स्थापना वर्ष</label>
                <input id="established" type="number" min="1900" max={new Date().getFullYear()} value={form.year_established} onChange={(e) => updateField('year_established', e.target.value)} className={inputCls} placeholder="1995" />
              </div>
              <div>
                <label htmlFor="size" className={labelCls}>कंपनी का आकार</label>
                <select id="size" value={form.company_size} onChange={(e) => updateField('company_size', e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
                  <option value="">चुनें</option>
                  {Object.entries(COMPANY_SIZE_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="turnover" className={labelCls}>वार्षिक टर्नओवर</label>
                <select id="turnover" value={form.annual_turnover} onChange={(e) => updateField('annual_turnover', e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
                  <option value="">चुनें</option>
                  {Object.entries(TURNOVER_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="products" className={labelCls}>उत्पाद और सेवाएँ <span className="text-gray-400 font-normal">(अल्पविराम से अलग)</span></label>
              <input id="products" type="text" value={form.products_services} onChange={(e) => updateField('products_services', e.target.value)} className={inputCls} placeholder="उदा., आलू चिप्स, फ्रेंच फ्राइज़, फ्रोज़न आलू" />
            </div>
            <div>
              <label className={labelCls}>प्रमाणपत्र</label>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS.map((cert) => (
                  <button key={cert} type="button" onClick={() => toggleCert(cert)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
                      form.certifications.includes(cert)
                        ? 'bg-[#05420d] text-white border-[#05420d]'
                        : 'bg-white text-gray-900 border-gray-200 hover:border-[#05420d]'
                    }`}
                  >{cert}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fssai" className={labelCls}>FSSAI नंबर</label>
                <input id="fssai" type="text" value={form.fssai_number} onChange={(e) => updateField('fssai_number', e.target.value)} className={inputCls} placeholder="14 अंकों का FSSAI नंबर" />
              </div>
              <div>
                <label htmlFor="apeda" className={labelCls}>APEDA पंजीकरण</label>
                <input id="apeda" type="text" value={form.apeda_number} onChange={(e) => updateField('apeda_number', e.target.value)} className={inputCls} placeholder="APEDA पंजीकरण नंबर" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gst" className={labelCls}>GST नंबर</label>
                <input id="gst" type="text" value={form.gst_number} onChange={(e) => updateField('gst_number', e.target.value)} className={inputCls} placeholder="15 अंकों का GSTIN" />
              </div>
              <div>
                <label htmlFor="iec" className={labelCls}>IEC नंबर</label>
                <input id="iec" type="text" value={form.iec_number} onChange={(e) => updateField('iec_number', e.target.value)} className={inputCls} placeholder="Import Export Code" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">अपनी लिस्टिंग की समीक्षा करें</h2>
            <ReviewSection title="कंपनी की बुनियादी जानकारी" onEdit={() => setStep(0)}>
              <ReviewRow label="कंपनी का नाम" value={form.company_name} />
              <ReviewRow label="श्रेणी" value={CATEGORIES.find((c) => c.id === form.category_id)?.name || '—'} />
              <ReviewRow label="विवरण" value={form.description} />
            </ReviewSection>
            <ReviewSection title="संपर्क और स्थान" onEdit={() => setStep(1)}>
              <ReviewRow label="ईमेल" value={form.email} />
              <ReviewRow label="फ़ोन" value={form.phone} />
              {form.whatsapp && <ReviewRow label="WhatsApp" value={form.whatsapp} />}
              {form.website && <ReviewRow label="वेबसाइट" value={form.website} />}
              <ReviewRow label="स्थान" value={[form.city, form.state, form.pin_code].filter(Boolean).join(', ')} />
            </ReviewSection>
            <ReviewSection title="व्यवसाय विवरण" onEdit={() => setStep(2)}>
              {form.year_established && <ReviewRow label="स्थापना" value={form.year_established} />}
              {form.company_size && <ReviewRow label="आकार" value={COMPANY_SIZE_LABELS[form.company_size] || form.company_size} />}
              {form.products_services && <ReviewRow label="उत्पाद" value={form.products_services} />}
              {form.certifications.length > 0 && <ReviewRow label="प्रमाणपत्र" value={form.certifications.join(', ')} />}
              {form.gst_number && <ReviewRow label="GST" value={form.gst_number} />}
            </ReviewSection>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        {step > 0 ? (
          <Button variant="ghost" size="md" onClick={prevStep}>
            <ChevronLeft className="h-4 w-4" />
            पिछला
          </Button>
        ) : (
          <div />
        )}
        {step < STEPS.length - 1 ? (
          <Button variant="secondary" size="md" onClick={nextStep}>
            अगला
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="primary" size="lg" onClick={handleSubmit} disabled={status === 'loading'}>
            {status === 'loading' ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                जमा हो रहा है...
              </span>
            ) : (
              'लिस्टिंग जमा करें'
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

function ReviewSection({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
        <button type="button" onClick={onEdit} className="text-xs font-medium text-[#ed6442] hover:underline cursor-pointer">बदलें</button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex gap-3 text-sm">
      <span className="text-gray-400 shrink-0 w-28">{label}</span>
      <span className="text-gray-900 break-words">{value}</span>
    </div>
  )
}
