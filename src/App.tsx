import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { Button } from './components/ui/button'
import Home from '@/pages/home'
import About from '@/pages/about'

function App() {
  return (
    <div className=" h-screen">
      <Button>Click me</Button>
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
    </BrowserRouter>
  )
}

export default WrappedApp
