import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { getHistory } from '../database/database'

export function useHistory() {
  const [rescues, setRescues] = useState([])

  useFocusEffect(
    useCallback(() => {
      const data = getHistory()
      setRescues(data)
    }, [])
  )

  function formatDate(dateStr) {
    const normalized = dateStr.replace(' ', 'T') + 'Z'
    const date = new Date(normalized)
    const dia = String(date.getDate()).padStart(2, '0')
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const ano = date.getFullYear()
    const hora = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')
    return `${dia}/${mes}/${ano} às ${hora}:${min}`
  }

  return {
    rescues,
    formatDate,
  }
}