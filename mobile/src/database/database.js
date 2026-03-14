import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('genesis.db')

export function setupDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS rescues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      offer_id INTEGER NOT NULL,
      offer_title TEXT NOT NULL,
      offer_description TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `)
}

export function saveRescue(sessionId, offer) {
  db.runSync(
    `INSERT INTO rescues (session_id, offer_id, offer_title, offer_description) VALUES (?, ?, ?, ?)`,
    [sessionId, offer.id, offer.title, offer.description]
  )
}

export function getHistory() {
  return db.getAllSync(`
    SELECT id, offer_id, offer_title, offer_description, created_at 
    FROM rescues 
    ORDER BY created_at DESC
  `)
}