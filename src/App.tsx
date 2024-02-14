import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ErrorBoundary } from 'react-error-boundary'
import { LayoutWrapper } from '@/components/wrappers/LayoutWrapper'
import Router from '@/router'
import { ThemeProvider } from '@/providers/theme-provider'
import Error from '@/pages/error'

function App() {
  return (
    <LayoutWrapper>
      <Router />
    </LayoutWrapper>
  )
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={Error}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </ErrorBoundary>
      <Toaster />
    </BrowserRouter>
  )
}

export default WrappedApp
