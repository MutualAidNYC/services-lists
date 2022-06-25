import { QueryClient, QueryClientProvider } from 'react-query'

interface QueryClientWrapperProps {
  children?: React.ReactNode
}

export const createQueryClientWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      }
    }
  })

  return ({ children }: QueryClientWrapperProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
