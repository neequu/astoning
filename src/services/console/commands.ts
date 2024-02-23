export const commands = {
  'anime-get-all': '/anime',
  'anime-get-one': '/anime/',
  'anime-search': '/search/',

  'like-add': '/like/',
  'like-remove': '/like/rm/',
  'likes-get-all': '/likes',

  'login': '/login/',
  'register': '/register/',
  'signout': '/signout',

  'history-get-all': '/history',
  'history-add': '/history/new/',
  'history-remove-one': '/history/rm/',
  'history-remove-all': '/history/clear',
}
export const availableCommands = Object.entries(commands)
