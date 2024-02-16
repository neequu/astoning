import type { Anime } from '@/types/anime'

export function transformAnimeData(anime: Anime): Anime {
  return {
    ...anime,
    year: anime.year === null ? 'N/D' : anime.year,
    score: anime.score === null ? 'N/D' : anime.score,
  }
}
