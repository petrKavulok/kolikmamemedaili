import { useQuery } from '@tanstack/react-query'
import { fetchMedalData } from '../utils/fetchData'

export type MedalData = {
  medalDisciplines: {
    gold: string[]
    silver: string[]
    bronze: string[]
  }
  globalData: {
    total: number
    gold: number
    silver: number
    bronze: number
  }
}

export function useMedalData(countryCode: 'CZE' | 'SVK') {
  return useQuery<MedalData, Error>({
    queryKey: ['medals', countryCode],
    queryFn: () => fetchMedalData(countryCode),
    staleTime: 30000,
    refetchOnWindowFocus: true,
    retry: 3, // Retry failed requests 3 times
  })
} 