/**
 * Migration script: JSON directory listings → Supabase companies table
 *
 * Usage:
 *   node scripts/migrate-to-supabase.js
 *
 * Reads .env.local for Supabase credentials.
 * Uses SUPABASE_SERVICE_ROLE_KEY to bypass RLS.
 *
 * DO NOT run in production — this is a one-time migration tool.
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// ─── Config ────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
})

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'directory')

// Map local folder slugs → Supabase category slugs
const CATEGORY_MAP = {
  'seed-suppliers': 'seed-companies',
  'processors': 'processors',
  'exporters': 'exporters',
  'traders': 'exporters',
  'equipment': 'equipment',
  'processing-machines': 'equipment',
  'farming-machines': 'equipment',
  'cold-storage': 'cold-storage',
  'transport': 'cold-storage',
  'research': 'research',
  'progressive-farmers': 'associations',
}

// Platinum tier overrides (company name substrings)
const PLATINUM_NAMES = ['Kavya Agro', 'Urban Agrigalla', 'McPatel', 'Happiyum']

// ─── Helpers ───────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function determineTier(company) {
  const nameEn = company.nameEn || ''
  const name = company.name || ''
  const combined = nameEn + ' ' + name

  for (const platName of PLATINUM_NAMES) {
    if (combined.includes(platName)) return 'platinum'
  }
  if (company.premium) return 'premium'
  if (company.featured) return 'verified'
  return 'free'
}

function cleanEmail(email) {
  if (!email || email === 'Not Available' || email === 'N/A' || email === '-') return null
  return email.trim()
}

function cleanPhone(phone) {
  if (!phone) return null
  // phone can be string or array
  if (Array.isArray(phone)) return phone[0] || null
  if (phone === 'Not Available' || phone === 'N/A' || phone === '-') return null
  return phone.trim()
}

// ─── Main ──────────────────────────────────────────────────

async function main() {
  console.log('🥔 IndianPotato JSON → Supabase Migration')
  console.log('─'.repeat(50))

  // Step 1: Fetch category IDs from Supabase
  console.log('\n📂 Fetching categories from Supabase...')
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, slug')

  if (catError) {
    console.error('❌ Failed to fetch categories:', catError.message)
    process.exit(1)
  }

  const categoryIdMap = {}
  for (const cat of categories) {
    categoryIdMap[cat.slug] = cat.id
  }
  console.log(`   Found ${categories.length} categories:`, Object.keys(categoryIdMap).join(', '))

  // Step 2: Read all JSON files
  console.log('\n📄 Reading JSON files...')
  const folders = fs.readdirSync(CONTENT_DIR).filter((f) =>
    fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
  )

  const allCompanies = []
  const skippedFolders = []

  for (const folder of folders) {
    const supabaseSlug = CATEGORY_MAP[folder]
    if (!supabaseSlug) {
      skippedFolders.push(folder)
      console.log(`   ⚠ Skipping folder "${folder}" — no category mapping`)
      continue
    }

    const categoryId = categoryIdMap[supabaseSlug]
    if (!categoryId) {
      console.log(`   ⚠ Skipping folder "${folder}" — category "${supabaseSlug}" not found in Supabase`)
      skippedFolders.push(folder)
      continue
    }

    const folderPath = path.join(CONTENT_DIR, folder)
    const jsonFiles = fs.readdirSync(folderPath).filter((f) => f.endsWith('.json'))

    for (const file of jsonFiles) {
      try {
        const raw = fs.readFileSync(path.join(folderPath, file), 'utf-8')
        const company = JSON.parse(raw)
        allCompanies.push({
          ...company,
          _folder: folder,
          _file: file,
          _categorySlug: supabaseSlug,
          _categoryId: categoryId,
        })
      } catch (err) {
        console.log(`   ⚠ Failed to parse ${folder}/${file}: ${err.message}`)
      }
    }
  }

  console.log(`   Total JSON files read: ${allCompanies.length}`)
  if (skippedFolders.length) {
    console.log(`   Skipped folders: ${skippedFolders.join(', ')}`)
  }

  // Step 3: Build insert objects with unique slugs
  console.log('\n🔧 Building insert objects...')
  const usedSlugs = new Set()
  const insertRows = []

  for (const company of allCompanies) {
    let baseSlug = slugify(company.nameEn || company.name || 'unknown')
    if (!baseSlug) baseSlug = 'company'

    let slug = baseSlug
    let counter = 2
    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${counter}`
      counter++
    }
    usedSlugs.add(slug)

    const tier = determineTier(company)
    const email = cleanEmail(company.email)
    const phone = cleanPhone(company.phone)

    insertRows.push({
      slug,
      category_id: company._categoryId,
      name: company.nameEn || company.name,
      name_hi: company.name,
      description: company.description || null,
      description_hi: company.description || null,
      website: company.website || null,
      email: email,
      phone: phone,
      whatsapp: company.whatsapp || phone || null,
      address_street: company.address || null,
      address_city: company.districtEn || company.district || null,
      address_district: company.districtEn || company.district || null,
      address_state: company.stateEn || company.state || null,
      address_pin: null,
      address_country: 'India',
      tier: tier,
      featured: company.featured || false,
      verified: company.premium || tier === 'verified' || tier === 'premium' || tier === 'platinum',
      active: true,
      status: 'approved',
      products: [],
      logo_url: null,
      images: [],
      _originalFolder: company._folder,
      _originalFile: company._file,
    })
  }

  // Step 4: Insert in batches
  console.log(`\n📤 Inserting ${insertRows.length} companies into Supabase (batches of 10)...`)
  console.log('─'.repeat(50))

  let successCount = 0
  let failCount = 0
  const categoryCounts = {}
  const failures = []

  const BATCH_SIZE = 10
  for (let i = 0; i < insertRows.length; i += BATCH_SIZE) {
    const batch = insertRows.slice(i, i + BATCH_SIZE)

    // Strip internal fields before inserting
    const cleanBatch = batch.map(({ _originalFolder, _originalFile, ...row }) => row)

    const { data, error } = await supabase.from('companies').insert(cleanBatch).select('id, slug, name')

    if (error) {
      // Try one by one to identify which row fails
      for (const row of batch) {
        const { _originalFolder, _originalFile, ...cleanRow } = row
        const { data: singleData, error: singleError } = await supabase
          .from('companies')
          .insert(cleanRow)
          .select('id, slug')

        if (singleError) {
          console.log(`   ❌ Failed: ${row.name} (${_originalFolder}/${_originalFile}) — ${singleError.message}`)
          failures.push({ name: row.name, folder: _originalFolder, error: singleError.message })
          failCount++
        } else {
          console.log(`   ✅ Inserted: ${row.name} (${row.tier})`)
          successCount++
          categoryCounts[row._originalFolder] = (categoryCounts[row._originalFolder] || 0) + 1
        }
      }
    } else {
      for (const row of batch) {
        console.log(`   ✅ Inserted: ${row.name} (${row.tier})`)
        successCount++
        categoryCounts[row._originalFolder] = (categoryCounts[row._originalFolder] || 0) + 1
      }
    }
  }

  // Step 5: Summary
  console.log('\n' + '═'.repeat(50))
  console.log('📊 MIGRATION SUMMARY')
  console.log('═'.repeat(50))
  console.log(`   Total JSON files:    ${allCompanies.length}`)
  console.log(`   Successfully inserted: ${successCount}`)
  console.log(`   Failed:              ${failCount}`)
  console.log('')
  console.log('   By source folder:')
  for (const [folder, count] of Object.entries(categoryCounts).sort()) {
    const supabaseCat = CATEGORY_MAP[folder]
    console.log(`     ${folder} → ${supabaseCat}: ${count}`)
  }

  if (failures.length > 0) {
    console.log('')
    console.log('   ❌ Failures:')
    for (const f of failures) {
      console.log(`     ${f.name} (${f.folder}): ${f.error}`)
    }
  }

  console.log('\n' + '═'.repeat(50))
  console.log(successCount === allCompanies.length ? '✅ Migration complete!' : '⚠ Migration completed with errors')
}

main().catch((err) => {
  console.error('💥 Unexpected error:', err)
  process.exit(1)
})
