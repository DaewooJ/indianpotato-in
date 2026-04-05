import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X, HelpCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { generateDirMetadata } from '@/lib/dir-seo'
import { PLANS, COMPARISON_FEATURES, FAQS } from '@/lib/dir-constants'
import { formatPrice, cn } from '@/lib/dir-utils'
import { DirBreadcrumbs } from '@/components/directory/DirBreadcrumbs'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = generateDirMetadata({
  title: 'डायरेक्टरी लिस्टिंग प्लान और मूल्य — इंडियन पोटैटो',
  description:
    'अपने आलू उद्योग व्यवसाय के लिए सही लिस्टिंग प्लान चुनें। निःशुल्क, सत्यापित, प्रीमियम और प्लैटिनम प्लान उपलब्ध।',
  path: '/directory/pricing',
})

export default function PricingPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <Navbar />
      <main className="pt-[64px]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DirBreadcrumbs items={[{ label: 'मूल्य योजनाएँ' }]} />

          <div className="text-center pt-4 pb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              अपना लिस्टिंग प्लान चुनें
            </h1>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              भारत के आलू उद्योग में खरीदारों, निर्यातकों और भागीदारों द्वारा खोजे जाएँ
            </p>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {PLANS.map((plan) => {
              const isPopular = plan.isPopular
              const isFree = plan.tier === 'free'
              const href = isFree ? '/directory/submit' : `/directory/submit?plan=${plan.tier}`

              return (
                <div
                  key={plan.tier}
                  className={cn(
                    'relative flex flex-col rounded-xl border bg-white shadow-sm',
                    isPopular
                      ? 'border-[#ed6442] shadow-md ring-2 ring-[#ed6442]/20 scale-[1.02] lg:scale-105'
                      : 'border-gray-200'
                  )}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-[#ed6442] px-4 py-1 text-xs font-bold text-white shadow-sm">
                        सबसे लोकप्रिय
                      </span>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <h2 className="text-lg font-bold text-gray-900">{plan.name}</h2>
                    <p className="mt-1 text-xs text-gray-500">{plan.tagline}</p>

                    <div className="mt-4 mb-5">
                      {isFree ? (
                        <div className="text-3xl font-bold text-gray-900">निःशुल्क</div>
                      ) : (
                        <>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-gray-900">
                              {formatPrice(plan.priceMonthly * 100)}
                            </span>
                            <span className="text-sm text-gray-500">/माह</span>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            या {formatPrice(plan.priceAnnual * 100)}/वर्ष (2 महीने बचाएँ)
                          </p>
                        </>
                      )}
                    </div>

                    <ul className="space-y-2.5 flex-1">
                      {plan.features.map((feature) => {
                        const isHeader = feature.includes('सभी सुविधाएँ')
                        return (
                          <li key={feature} className="flex items-start gap-2">
                            {isHeader ? (
                              <span className="text-xs text-gray-500 italic pt-0.5">{feature}</span>
                            ) : (
                              <>
                                <Check className="h-4 w-4 text-[#05420d] shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-900">{feature}</span>
                              </>
                            )}
                          </li>
                        )
                      })}
                    </ul>

                    <div className="mt-6">
                      <Link href={href}>
                        <Button
                          variant={isPopular ? 'primary' : isFree ? 'outline' : 'secondary'}
                          size="md"
                          className="w-full"
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Comparison Table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              फ़ीचर तुलना
            </h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 w-[40%]">फ़ीचर</th>
                    {PLANS.map((plan) => (
                      <th key={plan.tier} className={cn('py-3 px-3 text-center font-semibold', plan.isPopular ? 'text-[#ed6442]' : 'text-gray-900')}>
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((feature, i) => (
                    <tr key={feature.name} className={cn('border-b border-gray-200', i % 2 === 0 && 'bg-gray-50/50')}>
                      <td className="py-3 px-4 text-gray-900">{feature.name}</td>
                      {(['free', 'verified', 'premium', 'platinum'] as const).map((tier) => (
                        <td key={tier} className="py-3 px-3 text-center">
                          {feature[tier] ? (
                            <Check className="h-4.5 w-4.5 text-[#05420d] mx-auto" />
                          ) : (
                            <X className="h-4.5 w-4.5 text-gray-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQs */}
          <section className="max-w-3xl mx-auto pb-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              अक्सर पूछे जाने वाले प्रश्न
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white overflow-hidden"
                >
                  <summary className="flex items-center gap-3 cursor-pointer px-5 py-4 text-sm font-semibold text-gray-900 list-none [&::-webkit-details-marker]:hidden">
                    <HelpCircle className="h-5 w-5 text-[#ed6442] shrink-0" />
                    <span className="flex-1">{faq.question}</span>
                    <span className="shrink-0 text-gray-400 transition-transform group-open:rotate-180">▾</span>
                  </summary>
                  <div className="px-5 pb-4 pl-13 text-sm text-gray-500 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
