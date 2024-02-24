import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { FeatureProvider } from './providers/feature-flag-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { LayoutWrapper } from '@/components/wrappers/LayoutWrapper'
import { ErrorLayout } from '@/components/misc/ErrorLayout'
import { Router } from '@/router'
import { store } from '@/store'
import { useInitializeUser } from '@/hooks/use-initialize-user'
import { authService } from '@/services/auth'
import { initializeConsole } from '@/services/console/init'

function App() {
  // initialization in here for clarity of initialization flow + single entry point
  const { isLoading } = useInitializeUser(authService.getUser)
  initializeConsole()
  return (
    <LayoutWrapper isLoading={isLoading}>
      <Router />
    </LayoutWrapper>
  )
}

function WrappedApp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorLayout}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <FeatureProvider>
              <App />
            </FeatureProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <Toaster />
      </BrowserRouter>
    </Provider>
  )
}

export default WrappedApp
