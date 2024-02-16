import { SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '@/components/ui/input'
import { handleError } from '@/lib/utils'

interface Props {
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  changeQuery: (q: string) => void
  value?: string
  autoFocus?: boolean
}

export function SearchForm({ handleSubmit, changeQuery, value, autoFocus = false }: Props) {
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

  return (
    <form onSubmit={onSubmit} className="flex items-center py-6">
      <Input name="query" autoFocus={autoFocus} value={value} className="text-md rounded-r-none border-r-none" placeholder="Search!" type="text" onChange={e => changeQuery(e.target.value)} />
      <Button type="submit" size="icon" className="rounded-l-none">
        <SearchIcon />
      </Button>
    </form>
  )
}
