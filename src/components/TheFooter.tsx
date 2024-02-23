import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export function TheFooter() {
  return (
    <footer className="font-extralight text-sm flex items-baseline justify-center">
      <a href="https://github.com/neequu/astoning" target="_blank" rel="noreferrer">
        <Button name="github link" variant="link" className="p-0">
          github
        </Button>
      </a>
      &nbsp;|&nbsp;
      <Link to="/visit">
        <Button name="visits page" variant="link" className="p-0">
          check visits
        </Button>
      </Link>
    </footer>
  )
}
