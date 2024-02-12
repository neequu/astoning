import { useGetAnimeQuery } from '@/store/api/apiSlice'

export function Home() {
  const { data, isError, isLoading, isSuccess, refetch } = useGetAnimeQuery()

  function handleClick() {
    refetch()
  }

  return (
    <div onClick={handleClick}>
      {data?.data.map(anime => (
        <div key={anime.mal_id}>
          <p>{anime.title_english}</p>
          <p>{anime.title_japanese}</p>
          <p>{anime.score}</p>
          <p>{anime.episodes}</p>
          <p>{anime.duration}</p>
          <p>{anime.year}</p>
          <p>{anime.url}</p>
        </div>
      ))}
      {isLoading && 'loading'}
      {isError && 'error'}
      {isSuccess && 'all good '}
    </div>
  )
}
