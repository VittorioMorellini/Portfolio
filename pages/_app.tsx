import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { RecoilRoot } from "recoil";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SEO from '../components/SEO';
import { useRouter } from 'next/router';
import { ToastProvider, DefaultToast } from 'react-toast-notifications';
import { AnimatePresence } from 'framer-motion'

function App({ Component, pageProps/*, categories*/ }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter()
	const pageKey = router.asPath

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
        <ToastProvider autoDismiss={true} 
          autoDismissTimeout={6000} 
          placement="top-center"
          //components={{ Toast: CustomToast }}
        >       
        <RecoilRoot>
        <AnimatePresence initial={false} mode="popLayout">
          <Layout>
            <SEO />
            <Component key={pageKey} {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
            {/* <CookieConsent /> */}
          </Layout>
        </AnimatePresence>
        </RecoilRoot>
        </ToastProvider>
        </Hydrate>
      </QueryClientProvider>    
    </>
  )
}
export default App
