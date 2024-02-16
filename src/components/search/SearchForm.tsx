import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '@/components/ui/input'
import { handleError } from '@/lib/utils'

interface Props {
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  changeQuery: (q: string) => void
  children?: React.ReactElement
  query?: string
}

export function SearchForm({ handleSubmit, changeQuery, query, children }: Props) {
  const [isInputFocused, setIsInputFocused] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // using as here: typing event in parameters didn't pass down the types :(
    const formElements = (e.target as HTMLFormElement).elements
    const inputValue = (formElements[0] as HTMLInputElement).value

    if (inputValue.trim() === '')
      return handleError('You need to type something')

    if (handleSubmit)
      handleSubmit(e)
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child))
    // using as here: need to clone children so explicitly tell ts these are jsx elements
      return React.cloneElement(child as JSX.Element, { isInputFocused })

    return child
  })

  return (
    <div className="relative">
      <form onSubmit={onSubmit} className="flex items-center rounded-md transition-[ring_ring-offset-background_50ms] has-[input:focus-visible]:ring-offset-background has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring has-[input:focus-visible]:ring-offset-2" autoComplete="off">
        {/* review: move state to custom input */}
        <Input
          name="query"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          autoFocus
          value={query}
          className="text-md py-6 rounded-r-none border-r-none focus-visible:ring-offset-0 focus-visible:ring-0 "
          placeholder="Search!"
          type="text"
          onChange={e => changeQuery(e.target.value)}
        />
        <Button type="submit" size="icon" className="rounded-l-none py-6 w-16">
          <SearchIcon />
        </Button>
      </form>
      {children && childrenWithProps}
    </div>
  )
}
