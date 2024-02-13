import { Input } from '@/components/ui/input'

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  changeQuery: (q: string) => void
  value?: string
  autoFocus?: boolean
}

export function SearchForm({ handleSubmit, changeQuery, value, autoFocus = false }: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <Input autoFocus={autoFocus} value={value} className="text-md py-6" placeholder="Search!" type="text" onChange={e => changeQuery(e.target.value)} />
    </form>
  )
}
