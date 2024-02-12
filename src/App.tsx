import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Layout } from '@/components/Layout'

function App() {
  return (
    <Layout />
  )
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  )
}

export default WrappedApp
