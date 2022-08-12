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
import CustomToast from '../components/customToast';


function MyApp({ Component, pageProps/*, categories*/ }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  
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
          <Layout>
            <SEO />
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Layout>
        </RecoilRoot>
        </ToastProvider>
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
