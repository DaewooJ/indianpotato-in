import { translateMarket, translateState } from '@/lib/mandi-translations'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Test translations directly
  const tests = [
    { en: 'Agra', hi: translateMarket('Agra') },
    { en: 'Azadpur', hi: translateMarket('Azadpur') },
    { en: 'Deesa', hi: translateMarket('Deesa') },
    { en: 'Lucknow', hi: translateMarket('Lucknow') },
    { en: 'Uttar Pradesh', hi: translateState('Uttar Pradesh') },
    { en: 'Delhi', hi: translateState('Delhi') },
    { en: 'Gujarat', hi: translateState('Gujarat') },
    { en: 'West Bengal', hi: translateState('West Bengal') },
  ]

  // Test with actual API data if key is available
  let sampleRecord = null
  let translatedSample = null
  const ak = process.env.DATA_GOV_IN_API_KEY
  if (ak) {
    try {
      const res = await fetch(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${ak}&format=json&limit=3&filters%5Bcommodity%5D=Potato`,
        { cache: 'no-store' }
      )
      const json = await res.json()
      sampleRecord = json?.records?.[0] || null
      if (sampleRecord) {
        translatedSample = {
          original_market: sampleRecord.market,
          translated_market: translateMarket(
            (sampleRecord.market || '').replace(/\(.*?\)/g, '').replace(/apmc/gi, '').replace(/\s+/g, ' ').trim()
          ),
          original_state: sampleRecord.state,
          translated_state: translateState(sampleRecord.state || ''),
        }
      }
    } catch (e: any) {
      sampleRecord = { error: e.message }
    }
  }

  return NextResponse.json({
    translations_working: tests,
    api_key_configured: !!ak,
    raw_api_sample: sampleRecord,
    translated_sample: translatedSample,
    api_field_names: sampleRecord && !('error' in sampleRecord) ? Object.keys(sampleRecord) : 'no data',
  }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
