import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <p>404</p>
      <NavLink to="/">
        Home
      </NavLink>
    </div>
  )
}
