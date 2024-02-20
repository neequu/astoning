import type { Anime, AnimeApi, Pagination, PaginationApi } from '@/types/api/anime'

export function transformAnimeData(anime: AnimeApi): Anime {
  const { mal_id, title_japanese, year, score, ...rest } = anime

  return {
    ...rest,
    year: year === null ? 'N/D' : year,
    score: score === null ? 'N/D' : score,
    malId: mal_id,
    titleJapanese: title_japanese,
  }
}

export function transformPaginationData(pagination: PaginationApi): Pagination {
  const { current_page, has_next_page, last_visible_page, ...rest } = pagination

  return {
    ...rest,
    currentPage: current_page,
    hasNextPage: has_next_page,
    lastVisiblePage: last_visible_page,
  }
}
