import { useRef } from 'react'
import { useInterval } from 'usehooks-ts'

interface Props {
  callback: () => void
  breakCheck: boolean
  ms?: number
  breakPoint?: number
}

export function TailElement({ callback, breakCheck, ms = 700, breakPoint = 300 }: Props) {
  const tailEl = useRef<HTMLDivElement>(null)
  useInterval(() => {
    if (!tailEl.current)
      return
    if (breakCheck)
      return
    const { top } = tailEl.current.getBoundingClientRect()
    const delta = top - window.innerHeight
    if (delta < breakPoint)
      callback()
  }, ms)

  return (
    <div ref={tailEl} />
  )
}
