interface Props {
  children: React.ReactNode
}

export function PageContent({ children }: Props) {
  return (
    <div className="py-12">
      {children}
    </div>
  )
}
