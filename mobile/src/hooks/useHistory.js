import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { getHistory } from '../services/rescue.service'

export function useHistory() {
  const [rescues, setRescues] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useFocusEffect(
    useCallback(() => {
      loadHistory()
    }, [])
  )

  async function loadHistory() {
    setIsLoading(true)
    try {
      const data = await getHistory()
      setRescues(data.rescues)
    } catch (error) {
      console.error('Erro ao buscar histórico:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function formatDate(dateString) {
    if (!dateString) return ''
    try {
      const normalized = dateString.replace(' ', 'T') + 'Z'
      const date = new Date(normalized)
      if (isNaN(date.getTime())) return dateString
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch (e) {
      return dateString
    }
  }

  return {
    rescues,
    isLoading,
    formatDate,
    refreshHistory: loadHistory
  }
}