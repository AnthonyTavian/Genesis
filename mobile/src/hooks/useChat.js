import { useState, useEffect, useRef } from 'react'
import { uuidv7 } from 'uuidv7'
import { startSession } from '../services/session.service'
import { getDecision } from '../services/offer.service'
import { useTimer } from './useTimer'

export function useChat() {
  const [messages, setMessages] = useState([])
  const [session, setSession] = useState(null)
  const [currentOffer, setCurrentOffer] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [wasAccepted, setWasAccepted] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const timer = useTimer()

  const currentOfferRef = useRef(null)
  const handleDecisionRef = useRef(null)
 

  useEffect(() => {
    currentOfferRef.current = currentOffer
  }, [currentOffer])

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  async function sendBotMessages(texts) {
    if (!texts || texts.length === 0) return
    setIsTyping(true)
    for (const text of texts) {
      await delay(1000)
      setMessages(prev => [...prev, { id: uuidv7(), type: 'bot', text }])
    }
    setIsTyping(false)
  }

  const startNewSession = async () => {
    try {
      const data = await startSession()

      setMessages([])
      setSession(data)
      setCurrentOffer(data.currentOffer)
      setIsFinished(false)
      setWasAccepted(false)
      setIsExpired(false)
      timer.resetTimer()

      await sendBotMessages(data.messages)
      await delay(500)

      setMessages(prev => [...prev, {
        id: uuidv7(),
        type: 'offer',
        offer: data.currentOffer,
        offerNumber: data.currentOfferNumber,
        total: data.totalOffers,
        decided: false,
        expired: false,
      }])
      timer.startTimer()
    } catch (error) {
      console.error('Erro ao iniciar sessão:', error)
    }
  }

 const handleDecision = async (accepted, expired = false) => {
    if (isTyping) return

    timer.resetTimer()

    try {
      const offer = currentOfferRef.current

      setMessages(prev => {
        const updated = prev.map(msg =>
          msg.type === 'offer' && msg.offer.id === offer.id
            ? { ...msg, decided: true, accepted, expired }
            : msg
        )
        return updated
      })

      const userText = accepted ? 'Quero essa oferta! ✅' : 'Não, obrigado. ❌'
      if (!expired) {
        setMessages(prev => [...prev, { id: uuidv7(), type: 'user', text: userText }])
      }

      const result = await getDecision(session.sessionId, accepted)

      await sendBotMessages(result.messages)

      if (result.finished) {
        timer.resetTimer()
        await delay(500)
        await sendBotMessages(['Sua sessão será encerrada em instantes... 👋'])
        await delay(5000)
        setWasAccepted(expired ? false : accepted)
        setIsFinished(true)
      } else {
        setCurrentOffer(result.offer)
        setIsExpired(false)

        if (result.nextMessages) {
          await sendBotMessages(result.nextMessages)
        }

        await delay(800)

        setMessages(prev => [...prev, {
          id: uuidv7(),
          type: 'offer',
          offer: result.offer,
          offerNumber: result.offerNumber,
          total: result.total,
          decided: false,
          expired: false,
        }])

        timer.startTimer()
      }
    } catch (error) {
      console.error('Erro ao processar decisão:', error)
    }
  }

  useEffect(() => {
    handleDecisionRef.current = handleDecision
  })

  useEffect(() => {
    if (timer.timeLeft === 0 && currentOfferRef.current && !isTyping) {
      setIsExpired(true)
      handleDecisionRef.current(false, true)
    }
  }, [timer.timeLeft])

  return {
    messages,
    startNewSession,
    handleDecision,
    isTyping,
    timer,
    isFinished,
    wasAccepted,
    isExpired,
  }
}