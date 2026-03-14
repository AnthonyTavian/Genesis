import { ofertas, mensagens } from '../data/mock'

export function startSession() {
  return {
    sessionId: Date.now().toString(),
    offerNumber: 1,
    total: 5,
    messages: mensagens.session_start,
    offer: ofertas[0],
  }
}

export function getDecision(sessionId, offerIndex, accepted) {
  const nextIndex = offerIndex + 1

  if (accepted) {
    const messages = mensagens.offer_accept
    if (nextIndex >= 5) {
      return {
        accepted: true,
        finished: true,
        messages: [...messages, ...mensagens.session_end],
        offer: null
      }
    }
    return {
      accepted: true,
      finished: false,
      messages,
      offerNumber: nextIndex + 1,
      total: 5,
      offer: ofertas[nextIndex],
      nextMessages: nextIndex === 4 
        ? mensagens.last_offer 
        : [mensagens.offer_present[nextIndex - 1]]
    }
  }

  if (nextIndex >= 5) {
    return {
      accepted: false,
      finished: true,
      messages: [...mensagens.last_offer_decline, ...mensagens.session_end],
      offer: null
    }
  }

  return {
    accepted: false,
    finished: false,
    messages: [mensagens.offer_decline[offerIndex % mensagens.offer_decline.length]],
    offerNumber: nextIndex + 1,
    total: 5,
    offer: ofertas[nextIndex],
    nextMessages: nextIndex === 4 
        ? mensagens.last_offer 
        : [mensagens.offer_present[nextIndex - 1]]
  }
}