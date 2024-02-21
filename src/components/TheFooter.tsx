import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export function TheFooter() {
  return (
    <footer className="font-extralight text-sm flex items-baseline justify-center">
      <a href="https://github.com/neequu/astoning" target="_blank" rel="noreferrer">
        <Button variant="link" className="p-0">
          github
        </Button>
      </a>
      &nbsp;|&nbsp;
      <Link to="/session">
        <Button variant="link" className="p-0">
          check middleware
        </Button>
      </Link>
      &nbsp;|&nbsp;
      <Link to="/visit">
        <Button variant="link" className="p-0">
          check visits
        </Button>
      </Link>
    </footer>
  )
}
