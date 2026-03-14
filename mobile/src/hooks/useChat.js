import { useState, useEffect, useRef } from 'react'
import { uuidv7 } from 'uuidv7'
import { startSession, getDecision } from '../services/offer.service'
import { saveRescue } from '../database/database'

export function useChat() {
  const [messages, setMessages] = useState([])
  const [session, setSession] = useState(null)
  const [offerIndex, setOfferIndex] = useState(0)
  const [currentOffer, setCurrentOffer] = useState(null)
  const [offerDecided, setOfferDecided] = useState(false)
  const timeoutsRef = useRef([])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function addBotMessages(texts, delay = 800) {
    for (const text of texts) {
      setMessages(prev => [...prev, { id: uuidv7(), text, type: 'bot' }])
      await sleep(delay)
    }
  }

  function addUserMessage(text) {
    setMessages(prev => [...prev, { id: uuidv7(), text, type: 'user' }])
  }

  function addOfferCard(offer, offerNumber, total) {
    setMessages(prev => [...prev, {
      id: uuidv7(),
      type: 'offer',
      offer,
      offerNumber,
      total,
      decided: false,
      accepted: null
    }])
  }

  async function handleBotSequence(result) {
    await addBotMessages(result.messages)
    if (result.finished) {
      setMessages(prev => [...prev, { id: uuidv7(), type: 'new_session' }])
      return
    }
    if (result.nextMessages) {
      await addBotMessages(result.nextMessages)
    }
    setOfferDecided(false)
    addOfferCard(result.offer, result.offerNumber, result.total)
  }

  function initSession() {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    const result = startSession()
    setSession(result)
    setCurrentOffer(result.offer)
    setOfferIndex(0)
    setOfferDecided(false)
    setMessages([])
    handleBotSequence({
      messages: result.messages,
      nextMessages: [],
      offer: result.offer,
      offerNumber: result.offerNumber,
      total: result.total
    })
  }

  function handleDecision(accepted) {
    if (offerDecided) return
    setOfferDecided(true)
    setMessages(prev => prev.map(msg =>
      msg.type === 'offer' && msg.offer.id === currentOffer.id
        ? { ...msg, decided: true, accepted }
        : msg
    ))
    addUserMessage(accepted ? 'Quero essa oferta! ✅' : 'Não, obrigado. ❌')
    const result = getDecision(session.sessionId, offerIndex, accepted)
    if (accepted) saveRescue(session.sessionId, currentOffer)
    setOfferIndex(prev => prev + 1)
    setCurrentOffer(result.offer)
    handleBotSequence(result)
  }

  return {
    messages,
    initSession,
    handleDecision,
  }
}