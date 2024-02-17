interface Props {
  children: React.ReactNode
}

export function HistoryWrapper({ children }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-20">
      {children}
    </div>
  )
}
