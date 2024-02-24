import { useCopyToClipboard } from 'usehooks-ts'
import { ArrowUpRightFromSquareIcon } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { showNotificationError, showNotificationSuccess } from '@/lib/utils'
import { BASE_URL } from '@/lib/constants'

interface Props {
  url: string
}

export function ShareLink({ url }: Props) {
  const location = useLocation()
  const [_, copy] = useCopyToClipboard()

  const sharedUrl = `${import.meta.env.VITE_TELEGRAM_SHARED_URL}${url}`
  const localUrl = BASE_URL + location.pathname

  const handleCopied = (text: string) => () => {
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
        <Button aria-label="share" name="share" onClick={handleCopied(localUrl)} variant="ghost" size="icon" title="share on telegram">
          <ArrowUpRightFromSquareIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </a>
    </div>
  )
}
