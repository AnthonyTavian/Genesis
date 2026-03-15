import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('genesis.db')

export function setupDatabase() {
  try {
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
  } catch (error) {
    console.error('Erro ao criar tabela:', error)
  }
}

export function saveRescue(sessionId, offer) {
  if (!sessionId || !offer) {
    console.warn('saveRescue: sessionId ou offer inválido')
    return
  }
  try {
    db.runSync(
      `INSERT INTO rescues (session_id, offer_id, offer_title, offer_description) VALUES (?, ?, ?, ?)`,
      [sessionId, offer.id, offer.title, offer.description]
    )
  } catch (error) {
    console.error('Erro ao salvar resgate:', error)
  }
}

export function getHistory() {
  try {
    return db.getAllSync(`
      SELECT id, offer_id, offer_title, offer_description, created_at 
      FROM rescues 
      ORDER BY created_at DESC
    `)
  } catch (error) {
    console.error('Erro ao buscar histórico:', error)
    return []
  }
}