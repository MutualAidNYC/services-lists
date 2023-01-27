import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from 'components/AuthProvider'
import { Fonts, Navbar } from 'components/Layout'
import { Footer } from 'components/Layout/Footer'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { theme } from '../components/theme'
import { sendPageView } from '../gtag'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  // send URL changes to Google Analytics
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      sendPageView(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)

    // unsubscribe from events on unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <Fonts />
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  )
}
