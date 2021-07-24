import '../style.css'
import { ChakraProvider } from "@chakra-ui/react"

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
