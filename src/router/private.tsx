import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  redirectUrl: string
  redirectCondition: boolean
}

export function ProtectedRoute({ redirectUrl, redirectCondition }: Props) {
  if (redirectCondition)
    return <Navigate to={redirectUrl} replace />

  return <Outlet />
}
