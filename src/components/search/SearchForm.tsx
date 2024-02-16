import { SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '@/components/ui/input'

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  changeQuery: (q: string) => void
  value?: string
  autoFocus?: boolean
}

export function SearchForm({ handleSubmit, changeQuery, value, autoFocus = false }: Props) {
  return (
    <form onSubmit={handleSubmit} className="flex items-center py-6">
      <Input autoFocus={autoFocus} value={value} className="text-md rounded-r-none border-r-none" placeholder="Search!" type="text" onChange={e => changeQuery(e.target.value)} />
      <Button type="submit" size="icon" className="rounded-l-none">
        <SearchIcon />
      </Button>
    </form>
  )
}
