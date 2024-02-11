import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'

function App() {
  return (
    <>
      <NavLink to='/' className='text-pink-400'>
        hello
      </NavLink>
      <NavLink to='/about' className='text-pink-400'>
        ab
      </NavLink>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
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
