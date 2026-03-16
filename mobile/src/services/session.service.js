const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function startSession() {
  const response = await fetch(`${API_URL}/session/start`, {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Erro ao iniciar sessão')
  }

  return await response.json()
}