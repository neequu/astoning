import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export function TheFooter() {
  return (
    <footer className="font-extralight text-sm tracking-wide flex items-baseline justify-center">
      <a href="https://github.com/neequu/astoning" target="_blank" rel="noreferrer">
        <Button variant="link" className="p-0 tracking-wide">
          github
        </Button>
      </a>
      &nbsp;|&nbsp;
      <Link to="/session">
        <Button variant="link" className="p-0 tracking-wide">
          check middleware
        </Button>
      </Link>
    </footer>
  )
}
