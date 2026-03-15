import { useState } from 'react'
import { uuidv7 } from 'uuidv7'
import { startSession, getDecision } from '../services/offer.service'
import { saveRescue } from '../database/database'

export function useChat() {
  const [messages, setMessages] = useState([])
  const [session, setSession] = useState(null)
  const [offerIndex, setOfferIndex] = useState(0)
  const [currentOffer, setCurrentOffer] = useState(null)
  const [isTyping, setIsTyping] = useState(false)

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  async function sendBotMessages(texts) {
    if (!texts || texts.length === 0) return
    setIsTyping(true)
    for (const text of texts) {
      await delay(800)
      setMessages(prev => [...prev, { id: uuidv7(), type: 'bot', text }])
    }
    setIsTyping(false)
  }

  const startNewSession = async () => {
    try {
      const data = startSession()

      setMessages([])
      setSession(data)
      setOfferIndex(0)
      setCurrentOffer(data.currentOffer)

      await sendBotMessages(data.messages)
      await delay(500)

      setMessages(prev => [...prev, {
        id: uuidv7(),
        type: 'offer',
        offer: data.currentOffer,
        offerNumber: data.currentOfferNumber,
        total: data.totalOffers,
        decided: false
      }])
    } catch (error) {
      console.error('Erro ao iniciar sessão:', error)
    }
  }

  const handleDecision = async (accepted) => {
    if (isTyping) return

    try {
      setMessages(prev => prev.map(msg =>
        msg.type === 'offer' && msg.offer.id === currentOffer.id
          ? { ...msg, decided: true, accepted }
          : msg
      ))

      const userText = accepted ? 'Quero essa oferta! ✅' : 'Não, obrigado. ❌'
      setMessages(prev => [...prev, { id: uuidv7(), type: 'user', text: userText }])

      if (accepted && session && currentOffer) {
        saveRescue(session.sessionId, currentOffer)
      }

      const result = getDecision(offerIndex, accepted)

      await sendBotMessages(result.messages)

      if (result.finished) {
        await delay(500)
        setMessages(prev => [...prev, { id: uuidv7(), type: 'new_session' }])
      } else {
        setOfferIndex(prev => prev + 1)
        setCurrentOffer(result.nextOffer)

        await delay(800)

        setMessages(prev => [...prev, {
          id: uuidv7(),
          type: 'offer',
          offer: result.nextOffer,
          offerNumber: result.currentOfferNumber,
          total: result.totalOffers,
          decided: false
        }])
      }
    } catch (error) {
      console.error('Erro ao processar decisão:', error)
    }
  }

  return {
    messages,
    startNewSession,
    handleDecision,
    isTyping
  }
}