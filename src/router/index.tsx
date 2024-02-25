import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/router/private'
import { routesAuthOnly, routesNoAuthOnly, routesPublic } from '@/router/router-config'
import { LoadingSkeleton } from '@/components/loading-state/LoadingSkeleton'
import { useUser } from '@/hooks/use-user'

export function Router() {
  const { user } = useUser()

  return (
    <Suspense fallback={<LoadingSkeleton />}>

      <Routes>
        {routesPublic.map(route => <Route key={route.path} path={route.path} element={<route.component />} />) }

        <Route element={<ProtectedRoute redirectUrl="/" redirectCondition={!!user} />}>
          {routesNoAuthOnly.map(route => <Route key={route.path} path={route.path} element={<route.component />} />) }
        </Route>

        <Route element={<ProtectedRoute redirectUrl="/login" redirectCondition={!user} />}>
          {routesAuthOnly.map(route => <Route key={route.path} path={route.path} element={<route.component />} />) }
        </Route>

      </Routes>

    </Suspense>

  )
}
