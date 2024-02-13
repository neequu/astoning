import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import { Layout } from '@/components/Layout'
import Router from '@/router'
import { ThemeProvider } from '@/providers/theme-provider'

function App() {
  return (
    <Layout>
      <Router />
    </Layout>
  )
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </ErrorBoundary>
      <Toaster />
    </BrowserRouter>
  )
}

export default WrappedApp
