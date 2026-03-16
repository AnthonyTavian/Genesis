const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function getHistory(sessionId) {
  const response = await fetch(`${API_URL}/rescues/history`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar histórico')
  }

  return await response.json()
}