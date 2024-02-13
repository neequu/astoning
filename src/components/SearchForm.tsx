interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  changeQuery: (q: string) => void
}

export function SearchForm({ handleSubmit, changeQuery }: Props) {
  return (
    <form onSubmit={handleSubmit} className="py-4">
      <input className="border-b" placeholder="search" type="text" onChange={e => changeQuery(e.target.value)} />
    </form>
  )
}
