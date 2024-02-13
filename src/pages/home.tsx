import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAnimeQuery } from '@/redux/apis/animeApi'
import { SearchForm } from '@/components/SearchForm'
import { transformQuery } from '@/lib/utils'

export function Home() {
  const { data: animeData, isError, isLoading, isSuccess } = useGetAnimeQuery()

  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleQueryChange(newQuery: string) {
    setQuery(newQuery)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const encodedQuery = transformQuery(query)
    navigate(`/search?q=${encodedQuery}`, { replace: true })
  }

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
      {isSuccess && animeData.data.map(anime => (
        <div key={anime.mal_id}>
          <p>{anime.title_english}</p>

        </div>
      ))}

    </div>
  )
}
