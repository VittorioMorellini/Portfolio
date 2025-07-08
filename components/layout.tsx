import React, { useEffect, useState } from 'react';
import Footer from './footer';
import { Box} from '@mui/material';
import { useRouter } from 'next/router';
import { NavBar } from './navbar/index';

function Layout({ children }:  { children: any}) {
    const router = useRouter();
    const [showMobileNav, setShowMobileNav] = useState(false);
  
    useEffect(() => {
      router.events.on("routeChangeStart", () => {
        //console.log("CGANGE");
        setShowMobileNav(false);
      });
      window.location.href = 'https://portfolioapp-vittoriomorellini.vercel.app'

      return () => {
        router.events.off("routeChangeStart", () => {});
      };
    }, [router]);  
  
    
    return (
        <Box className='h-full'>
            {/* <Header title={title} />  */}
            <NavBar show={showMobileNav} onChangeVisibility={setShowMobileNav} />            
            <div className="flex pb-8 pt-8 h-[calc(100%-160px)]">
                <div className="w-full mx-4"> 
                    {children}
                </div>
                {/* <div className="w-1/5">
                Banner for advertising 
                </div>*/}
            </div>
            <Footer />
        </Box>
    );
}
export default Layout;