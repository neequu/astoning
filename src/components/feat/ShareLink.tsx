import { useCopyToClipboard } from 'usehooks-ts'
import { ArrowUpRightFromSquareIcon } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { showNotificationError, showNotificationSuccess } from '@/lib/utils'
import { BASE_URL, TELEGRAM_SHARED_URL } from '@/lib/constants'

interface Props {
  url: string
}

export function ShareLink({ url }: Props) {
  const location = useLocation()
  const [_, copy] = useCopyToClipboard()

  const sharedUrl = `${TELEGRAM_SHARED_URL}${url}`
  const localUrl = BASE_URL + location.pathname

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        showNotificationSuccess('Copied!')
      })
      .catch(() => {
        showNotificationError('Failed to copy!')
      })
  }

  return (
    <div>
      <a target="_blank" href={sharedUrl} rel="noreferrer">
        <Button aria-label="share" name="share" onClick={handleCopy(localUrl)} variant="ghost" size="icon" title="share on telegram">
          <ArrowUpRightFromSquareIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </a>
    </div>
  )
}
