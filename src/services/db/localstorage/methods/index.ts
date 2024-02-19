// export * from './favorites'
// export * from './history'
// export * from './auth'

export { getUser, loginWithCredentials, loginWithOAuth, register, signOut } from './auth'
export { addFavorite, getFavoriteById, getFavorites, removeFavorite } from './favorites'
export { addHistory, deleteAllHistory, deleteHistoryById, getHistory } from './history'
