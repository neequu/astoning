import { Route, Routes } from 'react-router-dom'

import { Home } from '@/pages/home'
import { Search } from '@/pages/search'
import { History } from '@/pages/history'
import { Register } from '@/pages/register'
import { Login } from '@/pages/login'
import { Favorites } from '@/pages/favorites'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/history" element={<History />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default Router
