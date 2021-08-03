import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Navbar } from '../components'
import { Box } from '@chakra-ui/react'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Navbar/>
        <Box px='176px' py='48px'>
          <Component {...pageProps} />
        </Box> 
      </ChakraProvider>
    </QueryClientProvider>
  )
}