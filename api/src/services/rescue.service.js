const db = require('../db/database')

function getHistory() {
  const rescues = db.prepare(`
    SELECT 
      r.id,
      r.created_at,
      o.id AS offer_id,
      o.title AS offer_title,
      o.description AS offer_description,
      o.type,
      o.original_price,
      o.discount_price,
      o.discount,
      o.value
    FROM rescues r
    JOIN offers o ON r.offer_id = o.id
    ORDER BY r.created_at DESC
  `).all()

  return { rescues }
}

module.exports = { getHistory }