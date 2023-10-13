import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'components'
import { Fonts, Navbar } from 'components/Layout'
import { Footer } from 'components/Layout/Footer'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
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
      <DefaultSeo
        title="Mutual Aid NYC"
        description="Our community-sourced, volunteer-curated library is a growing collection of the many resources available to New Yorkers. Mutual Aid NYC is committed to building a comprehensive list of high-quality resources—check back frequently, as new resources are added every day!"
        canonical="https://lists.mutualaid.nyc/"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://lists.mutualaid.nyc/',
          siteName: 'Mutual Aid NYC',
          title: 'Mutual Aid NYC',
          description:
            'Our community-sourced, volunteer-curated library is a growing collection of the many resources available to New Yorkers. Mutual Aid NYC is committed to building a comprehensive list of high-quality resources—check back frequently, as new resources are added every day!',
          images: [
            {
              url: 'https://lists.mutualaid.nyc/manyc_logo.png',
              type: 'png',
              alt: 'Mutual Aid NYC Banner',
            },
          ],
        }}
        twitter={{
          handle: '@MutualAidNYC',
          site: '@MutualAidNYC',
          cardType: 'summary_large_image',
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
