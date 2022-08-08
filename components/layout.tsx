import React from 'react';
import Header from './header';
import Footer from './footer';
import Navigation from './navigation';
import { Box} from '@mui/material';
import { useRecoilState } from 'recoil';
import { titleAtom } from '../recoil/title';
import AppMenu from './menu/navbar';
import Navbar from './menu/navbar';

type Props = {
    children: any;
}

function Layout({ children }: Props) {
    const [title,] = useRecoilState<string>(titleAtom)

    return (
        <Box className='h-full'>
            <Header title={title} /> {/*  */}
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