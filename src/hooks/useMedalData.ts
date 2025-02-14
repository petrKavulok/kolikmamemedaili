import { useQuery } from '@tanstack/react-query'
import { fetchMedalData } from '../utils/fetchData'
import type { ProcessedMedalData } from '../utils/types'

export function useMedalData(countryCode: 'CZE' | 'SVK') {
    return useQuery<ProcessedMedalData>({
        queryKey: ['medals', countryCode],
        queryFn: async () => {
            const result = await fetchMedalData(countryCode);
            if (!result) throw new Error('No data returned');
            return result;
        },
        staleTime: 30000,
        refetchOnWindowFocus: true,
        retry: 3, // Retry failed requests 3 times
    })
} 