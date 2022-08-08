import { HtmlProps } from 'next/dist/shared/lib/html-context';
import { ReactNode } from 'react';
import styles from '../../styles/menu.module.css'
import next from 'next';
import React from 'react';
import { Box, Button, Icon, Link } from '@mui/material';
import { useRecoilState } from 'recoil';
import { Category } from '../../types/category';
import { categoriesAtom } from '../../recoil/categoryState';
//import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { BsTwitter, BsGithub, BsLinkedin, BsFacebook } from "react-icons/bs";
import { titleAtom } from '../../recoil/title';
import { useRouter } from 'next/router';

function Navbar() {
    const [categories,] = useRecoilState<Category[]>(categoriesAtom)
    const [,setTitle] = useRecoilState<string>(titleAtom);
    const router = useRouter();

    return (
        <>
            <nav className="py-2.5 bg-blue-400 pr-2 pl-2">
                <div className="w-full flex justify-between items-center">
                    <div className='flex w-auto items-center'>
                        <Link href="/">
                            <a><img src='/images/portfolio.png' height={30} /></a>
                        </Link>
                        <span className="font-bold text-4xl pl-4" style={{flex: '1 0 0%'}}>Vittorio Morellini</span>
                    </div>
                    {/* <a href="/" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Sixtema</span>
                    </a> */}
                    {/* <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button> */}
                    <div className="flex" id="navbar-default">
                        <ul className="flex pt-4">
                            {categories?.map((category, index, categories) => (
                                <li>
                                    <button className="pr-4 pl-3 text-black hover:text-gray-400" onClick={() => {
                                        setTitle(category.title);
                                        router.push(category.url)
                                    }}>
                                        {category.description}
                                    </button>

                                    {/*<Button variant="outlined" className="pl-4 w-32" onClick={() => {
                                        setTitle(category.title);
                                        router.push(category.url)
                                    }}>{category.description}
                                    </Button>
                                    */}

                                </li>
                            ))}
                        </ul>
                        <div className="flex px-4 pt-4 justify-between">
                            {/* <span style={{marginRight: 8}}>Seguici su:</span> */}
                            <a href="https://www.linkedin.com/in/vittorio-morellini-0325b620" target="_blank">
                                <Icon className="h-8 w-8 hover:text-gray-400">
                                    <BsLinkedin />
                                </Icon>
                            </a>
                            <a href="https://github.com/vittoriomorellini" target="_blank">
                                <Icon className="h-8 w-8 hover:text-gray-400">
                                    <BsGithub />
                                </Icon>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;