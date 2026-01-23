import { useState, useEffect } from 'react'
import { breakpoints } from '@/lib/breakpoints'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

export const useIsMobile = () => !useMediaQuery(`(min-width: ${breakpoints.md})`)
export const useIsTablet = () =>
  useMediaQuery(`(min-width: ${breakpoints.md})`) &&
  !useMediaQuery(`(min-width: ${breakpoints.lg})`)
export const useIsDesktop = () => useMediaQuery(`(min-width: ${breakpoints.lg})`)
