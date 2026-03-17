import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(durationSeconds = 5) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds)
  const [isActive, setIsActive] = useState(false)
  const intervalRef = useRef(null)

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    stopInterval()
    setTimeLeft(durationSeconds)
    setIsActive(true)
  }, [durationSeconds, stopInterval])

  const resetTimer = useCallback(() => {
    stopInterval()
    setIsActive(false)
    setTimeLeft(durationSeconds)
  }, [durationSeconds, stopInterval])

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            stopInterval()
            setIsActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => stopInterval()
  }, [isActive, stopInterval])

  function formatTime(seconds) {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0')
    const sec = String(seconds % 60).padStart(2, '0')
    return `${min}:${sec}`
  }

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isUrgent: timeLeft <= 60,
    startTimer,
    resetTimer,
  }
}