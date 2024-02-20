export interface PaginationApi {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: {
    count: number
    total: number
  }
}
export type Pagination = Omit<PaginationApi, 'last_visible_page' | 'has_next_page' | 'current_page'> & {
  lastVisiblePage: number
  hasNextPage: boolean
  currentPage: number
}

export interface AnimeApi {
  mal_id: number
  url: string
  images: {
    jpg: Image
    webp: Image
  }
  title: string
  title_japanese: string
  episodes: number
  duration: string
  score: number | string
  year: number | string
  rating: string
  type: string
  synopsis: string | null
}

export type Anime = Omit<AnimeApi, 'mal_id' | 'title_japanese'> & {
  malId: number
  titleJapanese: string
}

export interface QueryResponse {
  pagination: Pagination
  data: Anime[]
}
export interface QueryResponseSingle {
  data: Anime
}
export interface ApiResponse {
  pagination: PaginationApi
  data: AnimeApi[]
}
export interface ApiResponseSingle {
  data: AnimeApi
}

export interface Image {
  image_url: string
  small_image_url: string
  large_image_url: string
}
