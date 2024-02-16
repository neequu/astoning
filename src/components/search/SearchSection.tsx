interface Props {
  children: React.ReactNode
}
export function SearchSection({ children }: Props) {
  return (
    <div className="relative">
      {children}
    </div>
  )
}
