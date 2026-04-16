// @ts-check
const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

async function migrate() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  await pool.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      filename TEXT PRIMARY KEY,
      run_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  const { rows } = await pool.query('SELECT filename FROM _migrations')
  const applied = new Set(rows.map((r) => r.filename))

  const migrationsDir = path.join(__dirname, '..', 'migrations')
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  for (const file of files) {
    if (applied.has(file)) {
      console.log(`[migrate] skip: ${file}`)
      continue
    }
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')
    await pool.query(sql)
    await pool.query('INSERT INTO _migrations (filename) VALUES ($1)', [file])
    console.log(`[migrate] applied: ${file}`)
  }

  await pool.end()
}

migrate().catch((err) => {
  console.error('[migrate] FAILED:', err)
  process.exit(1)
})
