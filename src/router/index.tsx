import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/router/private'
import { routesAuthOnly, routesNoAuthOnly, routesPublic } from '@/router/router-config'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { useAppSelector } from '@/hooks/redux-hooks'

export default function Router() {
  const user = useAppSelector(state => state.auth.user)

  const hasUser = !!user

  return (
    <Suspense fallback={<LoadingSkeleton />}>

      <Routes>
        {routesPublic.map(route => <Route key={route.path} path={route.path} element={<route.component />} />) }

        <Route element={<ProtectedRoute redirectUrl="/login" redirectCondition={!hasUser} />}>
          {routesAuthOnly.map(route => <Route key={route.path} path={route.path} element={<route.component />} />) }
        </Route>

        <Route element={<ProtectedRoute redirectUrl="/" redirectCondition={hasUser} />}>
          {routesNoAuthOnly.map(route => <Route key={route.path} path={route.path} element={<route.component />} />) }
        </Route>

      </Routes>

    </Suspense>

  )
}
