import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux-hooks'

interface Props {
  redirectUrl: string
}

export function ProtectedRoute({ redirectUrl }: Props) {
  const user = useAppSelector(state => state.auth.user)

  if (!user)
    return <Navigate to={redirectUrl} replace />

  return <Outlet />
}
