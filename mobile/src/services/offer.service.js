import { offers, messages } from '../data/mock'

const TOTAL_OFFERS = offers.length

export function startSession() {
  return {
    sessionId: Date.now().toString(),
    currentOfferNumber: 1,
    totalOffers: TOTAL_OFFERS,
    messages: messages.session_start,
    currentOffer: offers[0],
  }
}

export function getDecision(currentIndex, accepted) {
  const nextIndex = currentIndex + 1
  const isLast = nextIndex >= TOTAL_OFFERS

  const reaction = accepted 
    ? messages.offer_accept 
    : [messages.offer_decline[currentIndex % messages.offer_decline.length]]

  if (isLast) {
    const closing = accepted 
      ? [...reaction, ...messages.session_end]
      : [...messages.last_offer_decline, ...messages.session_end]

    return {
      accepted,
      finished: true,
      messages: closing,
      nextOffer: null,
    }
  }

  const introduction = nextIndex === TOTAL_OFFERS - 1
    ? messages.last_offer
    : [messages.offer_present[nextIndex % messages.offer_present.length]]

  return {
    accepted,
    finished: false,
    messages: [...reaction, ...introduction],
    currentOfferNumber: nextIndex + 1,
    totalOffers: TOTAL_OFFERS,
    nextOffer: offers[nextIndex],
  }
}