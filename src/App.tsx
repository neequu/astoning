import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'sonner'
import { useEffect } from 'react'
import supabase from './services/supabase'
import { useAppDispatch } from './hooks/reduxHooks'
import { setUser } from './redux/slices/authSlice'
import { ThemeProvider } from '@/providers/theme-provider'
import { LayoutWrapper } from '@/components/wrappers/LayoutWrapper'
import { ErrorLayout } from '@/components/ErrorLayout'
import Router from '@/router'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      dispatch(setUser(!!user))
    }

    checkAuth()
  }, [])

  return (
    <LayoutWrapper>
      <Router />
    </LayoutWrapper>
  )
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorLayout}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </ErrorBoundary>
      <Toaster />
    </BrowserRouter>
  )
}

export default WrappedApp
