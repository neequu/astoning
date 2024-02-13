import PropTypes from 'prop-types'
import { Loader2Icon } from 'lucide-react'

export function Spinner({ size = 36 }) {
  return (
    <div className="animate-spin w-min h-min">
      <Loader2Icon size={size} />
    </div>
  )
}

Spinner.propTypes = {
  size: PropTypes.number,
}
