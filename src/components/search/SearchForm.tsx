import { SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { showNotificationError } from '@/lib/utils'

interface Props {
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  children?: React.ReactElement
}

export function SearchForm({ handleSubmit, children }: Props) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    // using as here: typing event in parameters didn't pass down the types :(
    const formElements = (e.target as HTMLFormElement).elements
    const inputValue = (formElements[0] as HTMLInputElement).value

    if (inputValue.trim() === '')
      return showNotificationError('You need to type something')

    if (handleSubmit)
      handleSubmit(e)
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center mt-12 rounded-md transition-[ring_ring-offset-background_50ms] has-[input:focus-visible]:ring-offset-background has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring has-[input:focus-visible]:ring-offset-2" autoComplete="off">
      {children}
      <Button name="search" type="submit" size="icon" className="rounded-l-none py-6 w-16">
        <SearchIcon />
      </Button>
    </form>
  )
}
