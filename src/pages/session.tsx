import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { transformDateFromString } from '@/lib/utils'
import { selectSession } from '@/redux/rtk/selectors'

export default function Session() {
  const session = useAppSelector(selectSession)
  const convertedTime = session.timestamptz ? transformDateFromString(session.timestamptz) : 'No data available :('

  return (
    <PageWrapper heading="Information about your session" className="place-contnet-center">
      <div className="flex flex-1 my-auto place-content-center items-center text-center text-2xl">
        <div>
          <h2 className="animate-bounce bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 block text-transparent bg-clip-text">
            Date login of last access:&nbsp;
            {convertedTime}
          </h2>
          <h2 className="animate-pulse bg-gradient-to-r from-pink-600 via-fuchsia-500 to-emerald-600-400 block text-transparent bg-clip-text">
            Email:&nbsp;
            {session.email}
          </h2>
        </div>
      </div>
    </PageWrapper>
  )
}
