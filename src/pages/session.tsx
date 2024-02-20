import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { transformDateFromString } from '@/lib/utils'
import { selectSession } from '@/store/utils/selectors'

export function Session() {
  const session = useAppSelector(selectSession)
  const convertedTime = session.timestamptz ? transformDateFromString(session.timestamptz) : 'No data available :('

  return (
    <PageWrapper heading="Information about your session" className="place-contnet-center">
      <div className="flex flex-1 my-auto place-content-center items-center text-center text-2xl">
        <div>
          <h2 className="animate-bounce bg-gradient-to-r from-pink-400 via-emerald-500 to-purple-600 block text-transparent bg-clip-text">
            Date of last access:&nbsp;
            {convertedTime}
          </h2>
        </div>
      </div>
    </PageWrapper>
  )
}
