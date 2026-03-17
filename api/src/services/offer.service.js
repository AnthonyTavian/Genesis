const db = require('../db/database')

const TOTAL_OFFERS = db.prepare('SELECT COUNT(*) AS count FROM offers').get().count

function getMessages(event, index = null) {
  const all = db.prepare(`
    SELECT text FROM messages WHERE event = ? ORDER BY order_index ASC
  `).all(event).map(m => m.text)

  if (index !== null && index !== undefined && all.length > 0) {
    return [all[index % all.length]]
  }

  return all
}

function getCurrentOffer(sessionId) {
  const session = db.prepare(`
    SELECT id, current_offer_index, finished FROM sessions WHERE id = ?
  `).get(sessionId)

  if (!session) return { error: 'Sessão não encontrada' }
  if (session.finished) return { finished: true, message: 'Sessão encerrada' }

  const offer = db.prepare(`
    SELECT id, title, description, type, original_price, discount_price, discount, value
    FROM offers LIMIT 1 OFFSET ?
  `).get(session.current_offer_index)

  const introduction = session.current_offer_index === TOTAL_OFFERS - 1
    ? getMessages('last_offer')
    : getMessages('offer_present', session.current_offer_index)

  return {
    offerNumber: session.current_offer_index + 1,
    total: TOTAL_OFFERS,
    messages: introduction,
    offer
  }
}

function processDecision(sessionId, accepted) {
  const session = db.prepare(`
    SELECT id, current_offer_index, finished FROM sessions WHERE id = ?
  `).get(sessionId)

  if (!session) return { error: 'Sessão não encontrada' }
  if (session.finished) return { finished: true, message: 'Sessão encerrada' }

  if (accepted) {
    const offer = db.prepare(`SELECT id FROM offers LIMIT 1 OFFSET ?`).get(session.current_offer_index)
    db.prepare(`INSERT INTO rescues (session_id, offer_id) VALUES (?, ?)`).run(sessionId, offer.id)

    
    db.prepare(`UPDATE sessions SET finished = 1 WHERE id = ?`).run(sessionId)

    return {
      accepted: true,
      finished: true,
      messages: [...getMessages('offer_accept'), ...getMessages('session_end')],
      offer: null
    }
  }

  const nextIndex = session.current_offer_index + 1
  const isLast = nextIndex >= TOTAL_OFFERS

  const reaction = accepted
    ? getMessages('offer_accept', session.current_offer_index)
    : getMessages('offer_decline', session.current_offer_index)

  if (isLast) {
    db.prepare(`
      UPDATE sessions SET current_offer_index = ?, finished = 1 WHERE id = ?
    `).run(nextIndex, sessionId)

    const closing = accepted
      ? [...reaction, ...getMessages('session_end')]
      : [...getMessages('last_offer_decline'), ...getMessages('session_end')]

    return { finished: true, messages: closing }
  }

  db.prepare(`
    UPDATE sessions SET current_offer_index = ? WHERE id = ?
  `).run(nextIndex, sessionId)

  const nextOffer = db.prepare(`
    SELECT id, title, description, type, original_price, discount_price, discount, value
    FROM offers LIMIT 1 OFFSET ?
  `).get(nextIndex)

  const introduction = nextIndex === TOTAL_OFFERS - 1
    ? getMessages('last_offer')
    : getMessages('offer_present', nextIndex)

  return {
    finished: false,
    messages: reaction,
    nextMessages: introduction,
    offerNumber: nextIndex + 1,
    total: TOTAL_OFFERS,
    offer: nextOffer
  }
}

module.exports = { getCurrentOffer, processDecision }