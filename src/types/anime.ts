export interface Pagination {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: {
    count: number
    total: number
    per_page: number
  }
}

export interface Anime {
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
  score: number
  year: number | null | string
  rating: string
  type: string
  synopsis: string
}

export interface ApiResponse {
  pagination: Pagination
  data: Anime[]
}

export interface ApiResponseSingle {
  data: Anime
}

export interface Image {
  image_url: string
  small_image_url: string
  large_image_url: string
}
