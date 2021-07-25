import { ChakraProvider } from "@chakra-ui/react"
import {
  QueryClient,
  QueryClientProvider
} from "react-query"
import { Navbar } from '../components'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Navbar/>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}