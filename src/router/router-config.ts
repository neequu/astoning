import { lazily } from 'react-lazily'

const { Home } = lazily(() => import('@/pages/home'))
const { Search } = lazily(() => import('@/pages/search'))
const { AnimeItem } = lazily(() => import('@/pages/anime-item'))
const { History } = lazily(() => import('@/pages/history'))
const { Register } = lazily(() => import('@/pages/register'))
const { Login } = lazily(() => import('@/pages/login'))
const { Favorites } = lazily(() => import('@/pages/favorites'))
const { NotFound } = lazily(() => import('@/pages/notFound'))
const { Visit } = lazily(() => import('@/pages/visit'))

export const routesPublic = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/anime/:id',
    component: AnimeItem,
  },
  {
    path: '/not-found',
    component: NotFound,
  },
  {
    path: '/visit',
    component: Visit,
    exact: true,
  },
  {
    path: '*',
    component: NotFound,
  },
]

export const routesAuthOnly = [
  {
    path: '/history',
    component: History,
    exact: true,
  },
  {
    path: '/favorites',
    component: Favorites,
    exact: true,
  },
]

export const routesNoAuthOnly = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/register',
    component: Register,
    exact: true,
  },
]
