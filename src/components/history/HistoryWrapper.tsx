interface Props {
  children: React.ReactNode
}

export function HistoryWrapper({ children }: Props) {
  return (
    <div className="flex flex-1 flex-col mb-20 min-h-[60vh]">
      {children}
    </div>
  )
}
