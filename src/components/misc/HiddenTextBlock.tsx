import { useState } from 'react'
import PropTypes from 'prop-types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { MAX__HIDDEN_BLOCK_TEXT_LEN } from '@/lib/constants'

// @ts-expect-error Prop types cover these props
export function HiddenTextBlock({ text, className }) {
  const isTooLong = text.length >= MAX__HIDDEN_BLOCK_TEXT_LEN
  const [isHidden, setIsHidden] = useState(isTooLong)

  return (
    <div className={cn(className)}>
      <p className="text-muted-foreground font-semibold text-xl mb-2">Synonpsis</p>
      <p className={cn('line-clamp-none', isHidden && 'line-clamp-3')}>
        {text}
      </p>
      {
        isTooLong
        && <Button aria-label="reveal" name="reveal" variant="link" className="p-0 text-muted-foreground font-" onClick={() => setIsHidden(p => !p)}>{isHidden ? 'Show more' : 'Show less'}</Button>
      }
    </div>
  )
}

HiddenTextBlock.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}
