const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function getCurrentOffer(sessionId) {
  const response = await fetch(`${API_URL}/offers/current?sessionId=${sessionId}`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar oferta atual')
  }

  return await response.json()
}

export async function getDecision(sessionId, offerIndex, accepted) {
  const response = await fetch(`${API_URL}/offers/decision`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, accepted })
  })

  if (!response.ok) {
    throw new Error('Erro ao processar decisão')
  }

  return await response.json()
}