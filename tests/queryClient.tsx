import { QueryClient, QueryClientProvider } from 'react-query'

interface QueryClientWrapperProps {
  children?: React.ReactNode
}

export const createQueryClientWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const queryClientWrapper = ({ children }: QueryClientWrapperProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return queryClientWrapper
}
