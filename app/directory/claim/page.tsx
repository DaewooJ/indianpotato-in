import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { generateDirMetadata } from '@/lib/dir-seo'
import { DirBreadcrumbs } from '@/components/directory/DirBreadcrumbs'
import { ClaimListingFlow } from '@/components/directory/ClaimListingFlow'
import { getAllListings } from '@/lib/directory'

export const metadata: Metadata = generateDirMetadata({
  title: 'अपनी लिस्टिंग क्लेम करें — इंडियन पोटैटो डायरेक्टरी',
  description:
    'IndianPotato पर अपनी कंपनी दिख रही है? अपनी लिस्टिंग क्लेम करें, प्रोफ़ाइल प्रबंधित करें और प्लान अपग्रेड करें।',
  path: '/directory/claim',
  noIndex: true,
})

export default function ClaimPage() {
  const allListings = getAllListings().map((l) => ({
    name: l.name,
    slug: l.slug,
    category: l.category,
    city: l.districtEn || l.district,
    state: l.stateEn || l.state,
    isClaimed: false,
  }))

  return (
    <>
      <Navbar />
      <main className="pt-[64px]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
          <DirBreadcrumbs items={[{ label: 'अपनी लिस्टिंग क्लेम करें' }]} />

          <div className="text-center pt-2 pb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              अपनी कंपनी लिस्टिंग क्लेम करें
            </h1>
            <p className="mt-2 text-gray-500 text-sm max-w-lg mx-auto">
              IndianPotato पर अपनी कंपनी दिख रही है? अपनी लिस्टिंग क्लेम करें,
              प्रोफ़ाइल प्रबंधित करें और प्लान अपग्रेड करें।
            </p>
          </div>

          <ClaimListingFlow listings={allListings} />
        </div>
      </main>
      <Footer />
    </>
  )
}
