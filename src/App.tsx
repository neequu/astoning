import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { Button } from './components/ui/button'
import Home from '@/pages/home'
import About from '@/pages/about'

function App() {
  return (
    <div className=" h-screen">
      <Button onClick={() => toast('This is a sonner toast')}>Click me</Button>
      <NavLink to="/" className="text-pink-400">
        hello
      </NavLink>
      <NavLink to="/about" className="text-pink-400">
        ab
      </NavLink>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
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
