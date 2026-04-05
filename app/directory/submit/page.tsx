import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { generateDirMetadata } from '@/lib/dir-seo'
import { DirBreadcrumbs } from '@/components/directory/DirBreadcrumbs'

export const metadata: Metadata = generateDirMetadata({
  title: 'अपनी कंपनी जोड़ें — इंडियन पोटैटो डायरेक्टरी',
  description:
    'भारत की सबसे बड़ी B2B आलू डायरेक्टरी पर अपनी कंपनी लिस्ट करें। निःशुल्क लिस्टिंग उपलब्ध।',
  path: '/directory/submit',
  noIndex: true,
})

export default function SubmitPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[64px]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
          <DirBreadcrumbs items={[{ label: 'अपनी कंपनी जोड़ें' }]} />

          <div className="text-center pt-2 pb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              अपनी कंपनी जोड़ें
            </h1>
            <p className="mt-2 text-gray-500 text-sm">
              भारत की प्रमुख B2B आलू डायरेक्टरी पर अपना व्यवसाय लिस्ट करें।
              निःशुल्क लिस्टिंग 48 घंटे में प्रकाशित होती है।
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <p className="text-gray-500 text-sm mb-4">
              अपनी कंपनी लिस्ट करने के लिए हमसे WhatsApp पर संपर्क करें
            </p>
            <a
              href="https://wa.me/919499668831?text=नमस्ते%2C%20मैं%20अपनी%20कंपनी%20IndianPotato.in%20डायरेक्टरी%20में%20लिस्ट%20करना%20चाहता%20हूँ।"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1fb855] transition-colors"
            >
              WhatsApp पर संपर्क करें
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
