import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

import { ErrorLayout } from '@/components/error/ErrorLayout'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }

  render() {
    if (this.state.hasError)
      return <ErrorLayout />

    return this.props.children
  }
}

export { ErrorBoundary }
