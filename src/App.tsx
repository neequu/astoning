import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'sonner'
import { useInitializeUser } from '@/hooks/use-initialize-user'
import { ThemeProvider } from '@/providers/theme-provider'
import { LayoutWrapper } from '@/components/wrappers/LayoutWrapper'
import { ErrorLayout } from '@/components/ErrorLayout'
import Router from '@/router'
import { authService } from '@/services/auth'

function App() {
  useInitializeUser(authService.getUser)

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
