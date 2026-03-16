const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, '../../genesis.db'))

function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      current_offer_index INTEGER DEFAULT 0,
      finished INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS offers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'product',
      original_price REAL,
      discount_price REAL,
      discount INTEGER,
      value REAL
    );

    CREATE TABLE IF NOT EXISTS rescues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      offer_id INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event TEXT NOT NULL,
      text TEXT NOT NULL,
      order_index INTEGER DEFAULT 0
    );
  `)

  const offersCount = db.prepare('SELECT COUNT(*) AS count FROM offers').get()
  if (offersCount.count === 0) {
    const insertOffer = db.prepare(`
      INSERT INTO offers (title, description, type, original_price, discount_price, discount, value)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    const ofertas = [
      ['Arroz 5kg', 'Arroz Tio João 5kg', 'product', 26.90, 22.90, 15, null],
      ['Leve 3 Pague 2', 'Leve 3 iogurtes Danone e pague apenas 2', 'product', 14.90, 9.90, 33, null],
      ['Chocolate Lacta', 'Chocolate Lacta ao Leite 165g', 'product', 12.90, 10.30, 20, null],
      ['Cupom 10% OFF', 'Para compras acima de R$80', 'coupon', null, null, null, 10],
      ['Brinde Refrigerante', 'Refrigerante 2L grátis na compra de qualquer pizza congelada', 'gift', null, null, null, null],
    ]

    for (const oferta of ofertas) {
      insertOffer.run(...oferta)
    }
  }

  const messagesCount = db.prepare('SELECT COUNT(*) AS count FROM messages').get()
  if (messagesCount.count === 0) {
    const insertMessage = db.prepare(`
      INSERT INTO messages (event, text, order_index) VALUES (?, ?, ?)
    `)

    const messages = [
      ['session_start', 'Olá! Me chamo Márcio, seu consultor de ofertas.', 0],
      ['session_start', 'Separei 5 ofertas exclusivas pra você hoje. Vamos lá?', 1],
      ['offer_present', 'Olha o que tenho pra você...', 0],
      ['offer_present', 'Essa aqui é especial...', 1],
      ['offer_present', 'Não encontra isso em qualquer lugar...', 2],
      ['offer_present', 'Vale muito a pena essa...', 3],
      ['offer_accept', 'Ótima escolha!', 0],
      ['offer_decline', 'Tudo bem, vamos para a próxima.', 0],
      ['offer_decline', 'Sem problemas!', 1],
      ['offer_decline', 'Entendido.', 2],
      ['offer_decline', 'Ok, próxima oferta!', 3],
      ['last_offer', 'Última oferta do dia, não deixa passar!', 0],
      ['last_offer_decline', 'Que pena!', 0],
      ['session_end', 'Foi um prazer! Até a próxima visita. 👋', 0],
    ]

    for (const message of messages) {
      insertMessage.run(...message)
    }
  }
}

migrate()

module.exports = db