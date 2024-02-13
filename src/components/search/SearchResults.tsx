interface Props {
  children: React.ReactNode
}

export function SearchResults({ children }: Props) {
  return (
    <div>
      {children}
    </div>
  )
}
