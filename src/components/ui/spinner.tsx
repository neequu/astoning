import { Loader2Icon } from 'lucide-react'
import PropTypes from 'prop-types'
import { cn } from '@/lib/utils'

// @ts-expect-error covered by prop types
export function Spinner({ className, size = 36 }) {
  return (
    <div className={cn('animate-spin w-min h-min', className)}>
      <Loader2Icon size={size} />
    </div>
  )
}

Spinner.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
}
