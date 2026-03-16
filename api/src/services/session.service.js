const { uuidv7 } = require('uuidv7')
const db = require('../db/database')

const TOTAL_OFFERS = db.prepare('SELECT COUNT(*) AS count FROM offers').get().count

function getMessages(event) {
  return db.prepare(`
    SELECT text FROM messages WHERE event = ? ORDER BY order_index ASC
  `).all(event).map(m => m.text)
}

function startSession() {
  const sessionId = uuidv7()

  db.prepare(`
    INSERT INTO sessions (id, current_offer_index, finished) VALUES (?, 0, 0)
  `).run(sessionId)

  const offer = db.prepare(`
    SELECT id, title, description, type, original_price, discount_price, discount, value
    FROM offers LIMIT 1 OFFSET 0
  `).get()

  return {
    sessionId,
    currentOfferNumber: 1,
    totalOffers: TOTAL_OFFERS,
    messages: getMessages('session_start'),
    currentOffer: offer
  }
}

module.exports = { startSession }