import { ChakraProvider } from '@chakra-ui/react'
import { Fonts, Navbar, theme } from 'components/Layout'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
