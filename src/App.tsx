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

function App() {
  return (
    <LayoutWrapper>
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
