import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetAnimeSearchQuery } from '@/store/api/apiSlice'
import { SearchForm } from '@/components/SearchForm'
import { transformQuery } from '@/lib/utils'

export function Search() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const debouncedQuery = useDebounce(query, 500)

  const { data: animeData, isLoading, isError, isSuccess } = useGetAnimeSearchQuery(debouncedQuery)

  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  function handleQueryChange(newQuery: string) {
    setQuery(newQuery)
  }

  useEffect(() => {
    if (!debouncedQuery)
      return navigate(`/search`)

    const encodedQuery = transformQuery(debouncedQuery)
    navigate(`/search?q=${encodedQuery}`, { replace: true })
  }, [debouncedQuery, navigate])

  return (
    <div>
      <SearchForm handleSubmit={handleSubmit} changeQuery={handleQueryChange} />

      {/* todo: move to comp Loader */}
      {isLoading && <p>loading...</p>}

      {/* todo: move to comp Error */}
      {isError && <p>there was an error</p>}

      {/* todo: move to comp NoResults */}
      {isSuccess && animeData.pagination.items.count === 0 && <p>no results</p>}

      {/* todo: move to comp Grid */}
      {isSuccess && (
        <div>
          <p>
            Results:
            {animeData.pagination.items.count}
          </p>

          {animeData.data.map(anime => (
            <div key={anime.mal_id}>
              {anime.title_japanese}
            </div>
          ))}

        </div>
      )}

    </div>
  )
}
