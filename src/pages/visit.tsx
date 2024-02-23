import { PageWrapper } from '@/components/wrappers/PageWrapper'
import EntityGrind from '@/components/grind/EntityGrind'
import SelectorGrind from '@/components/grind/SelectorGrind'

export function Visit() {
  return (
    <PageWrapper heading="Your visits" className="place-contnet-center">
      <div className="flex flex-1 flex-col gap-5 my-auto place-content-center items-center text-center text-2xl">
        <div className="flex gap-10">
          <EntityGrind />
          <SelectorGrind />
        </div>
      </div>
    </PageWrapper>
  )
}
