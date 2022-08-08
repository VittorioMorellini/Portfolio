import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import Layout from '../components/layout'
import { RecoilRoot } from "recoil";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SEO from '../components/SEO';

// type NextPageWithLayout = AppProps & {
//   getLayout?: (page: ReactElement) => ReactNode
// }

// type AppHomeProps = AppProps & {
//   categories: Category[]
// }

function MyApp({ Component, pageProps/*, categories*/ }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  
  //const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>    
        <RecoilRoot>
          <Layout>
            <SEO />
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Layout>
        </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>    
    </>
  )
}

//Dynamic load categories does not work in component, only in page so I have to load from outside
// export async function getServerSideProps (context: any) {
//   console.log('Sono in server sides category')

//   const res = await fetch('http://localhost:3000/api/category')
//   console.log('Res recuperate server sides category', res.json())
//   const results: Category[] = await res.json();

//   return {
//     props: {
//       categories: results
//     }
//   }

// }

export default MyApp
