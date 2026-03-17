import { useState, useMemo } from 'react'

export function useHistorySearch(rescues) {
  const [search, setSearch] = useState('')

  const filteredRescues = useMemo(() => {
    if (!rescues) return []
    if (!search.trim()) return rescues
    return rescues.filter(item =>
      item.offer_title?.toLowerCase().includes(search.toLowerCase().trim())
    )
  }, [search, rescues])

  const totalSaved = useMemo(() => {
    if (!rescues) return 0
    return rescues.reduce((acc, curr) => {
      const original = curr.original_price ?? 0
      const price = curr.discount_price ?? 0
      const saving = original > price ? original - price : 0
      return acc + saving
    }, 0)
  }, [rescues])

  return {
    search,
    setSearch,
    filteredRescues,
    totalSaved
  }
}