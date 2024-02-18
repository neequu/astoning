import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, ms: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, ms)

    return () => clearTimeout(timer)
  }, [value])

  return debouncedValue
}
