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
        <Box className='h-screen'>
            <Header title={title}/>
            <div className="flex w-5/5 pb-4 pt-4" style={{height: 'calc(100vh - 160px)'}}>
                {/* <div className='w-1/5'>
                </div> */}
                <div className="w-4/5 pr-2 pl-2 overflow-y-auto"> 
                    {children}
                </div>
                <div className="w-1/5"> 
                </div>
            </div>
            <Footer />
        </Box>
    );
}

export default Layout;