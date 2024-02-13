interface Props {
  children: React.ReactNode
}

export function MediaGrid({ children }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 pt-6">
      {children}
    </div>
  )
}
