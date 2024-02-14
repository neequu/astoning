import { Auth } from '@/components/Auth'
import { PageWrapper } from '@/components/wrappers/PageWrapper'

export default function Login() {
  return (
    <PageWrapper className="mt-12">
      <div className="sm:w-1/3 sm:min-w-80 sm:mx-auto">
        <h1 className="font-bold text-2xl mb-8">Log Into your account</h1>
        <Auth />
      </div>
    </PageWrapper>
  )
}
