import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Layout } from '@/components/Layout'
import Router from '@/router'

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
        <App />
      </ErrorBoundary>
      <Toaster />
    </BrowserRouter>
  )
}

export default WrappedApp
