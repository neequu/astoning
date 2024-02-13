import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoadingSkeleton } from '@/components/LoadingSkeleton'

const Home = lazy(() => import('@/pages/home'))
const Search = lazy(() => import('@/pages/search'))
const History = lazy(() => import('@/pages/history'))
const Register = lazy(() => import('@/pages/register'))
const Login = lazy(() => import('@/pages/login'))
const Favorites = lazy(() => import('@/pages/favorites'))
const NotFound = lazy(() => import('@/pages/notFound'))

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={(
          <Suspense fallback={<LoadingSkeleton />}>
            <Home />
          </Suspense>
        )}

      />
      <Route path="/search" element={<Suspense fallback={<LoadingSkeleton />}><Search /></Suspense>} />
      <Route path="/favorites" element={<Suspense fallback={<LoadingSkeleton />}><Favorites /></Suspense>} />
      <Route path="/history" element={<Suspense fallback={<LoadingSkeleton />}><History /></Suspense>} />
      <Route path="/register" element={<Suspense fallback={<LoadingSkeleton />}><Register /></Suspense>} />
      <Route path="/login" element={<Suspense fallback={<LoadingSkeleton />}><Login /></Suspense>} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default Router
