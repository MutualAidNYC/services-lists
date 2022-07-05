import { QueryClient, QueryClientProvider } from 'react-query'

interface QueryClientWrapperProps {
  children?: React.ReactNode
}

export const createUseQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const useQueryWrapper = ({ children }: QueryClientWrapperProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return useQueryWrapper
}
