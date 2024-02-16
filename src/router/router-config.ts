import { lazy } from 'react'

const Home = lazy(() => import('@/pages/home'))
const Search = lazy(() => import('@/pages/search'))
const AnimeItem = lazy(() => import('@/pages/anime-item'))
const History = lazy(() => import('@/pages/history'))
const Register = lazy(() => import('@/pages/register'))
const Login = lazy(() => import('@/pages/login'))
const Favorites = lazy(() => import('@/pages/favorites'))
const NotFound = lazy(() => import('@/pages/notFound'))

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
  },
  {
    path: '/register',
    component: Register,
  },
]