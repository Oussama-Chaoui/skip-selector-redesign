import { useEffect, useState } from 'react'
import type { SkipOption, RawSkip } from '../types/skip'

export const useSkips = () => {
  const [skips, setSkips] = useState<SkipOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSkips() {
      try {
        const res = await fetch(
          'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
        )
        if (!res.ok) throw new Error('Failed to fetch skips')

        const raw = (await res.json()) as RawSkip[]

        const mapped: SkipOption[] = raw
          .map(s => ({
            id: s.id,
            size: s.size,
            hirePeriodDays: s.hire_period_days,
            transportCost: s.transport_cost,
            perTonneCost: s.per_tonne_cost,
            priceBeforeVat: s.price_before_vat,
            vat: s.vat,
            postcode: s.postcode,
            area: s.area,
            forbidden: s.forbidden,
            createdAt: s.created_at,
            updatedAt: s.updated_at,
            allowedOnRoad: s.allowed_on_road,
            allowsHeavyWaste: s.allows_heavy_waste,
          }))
          .sort((a, b) => a.size - b.size)

        setSkips(mapped)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchSkips()
  }, [])

  return { skips, loading, error }
}
