import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './private'
import { protectedRoutes, regularRoutes } from './router-config'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'

export default function Router() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>

      <Routes>
        {regularRoutes.map(route => <Route key={route.path} path={route.path} element={<route.component />} />) }
        <Route element={<ProtectedRoute redirectUrl="/login" />}>
          {protectedRoutes.map(route => <Route key={route.path} path={route.path} element={<route.component />} />) }
        </Route>
      </Routes>

    </Suspense>

  )
}
