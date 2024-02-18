import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { SearchForm } from '@/components/search/SearchForm'

interface Props {
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  changeQuery: (q: string) => void
  children?: React.ReactElement
  query?: string
  shouldKeepFocusState?: boolean
}

export function SearchPanel({ handleSubmit, changeQuery, query, children, shouldKeepFocusState = false }: Props) {
  // alternative: create another input with state and pass it conditionally
  const [isInputFocused, setIsInputFocused] = useState(false)

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child))
    // using as here: need to clone children so explicitly tell ts these are jsx elements
      return React.cloneElement(child as JSX.Element, { isInputFocused })

    return child
  })

  function handleFocus(): void {
    if (!shouldKeepFocusState)
      return

    setIsInputFocused(true)
  }
  function handleBlur(): void {
    if (!shouldKeepFocusState)
      return

    setIsInputFocused(false)
  }

  return (
    <div className="relative">
      <SearchForm handleSubmit={handleSubmit}>
        <Input
          name="query"
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus
          value={query}
          className="text-md py-6 rounded-r-none border-r-none focus-visible:ring-offset-0 focus-visible:ring-0"
          placeholder="Search!"
          type="text"
          onChange={e => changeQuery(e.target.value)}
        />
      </SearchForm>
      {children && childrenWithProps}
    </div>
  )
}
