import { ChakraProvider } from "@chakra-ui/react"
import {
  QueryClient,
  QueryClientProvider
} from "react-query"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
