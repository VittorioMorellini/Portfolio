import React from 'react';
import { useRecoilState } from 'recoil';
import { Category } from '../../types/category';
import { categoriesAtom } from '../../recoil/categoryState';
import { BsTwitter, BsGithub, BsLinkedin } from "react-icons/bs";
import { titleAtom } from '../../recoil/title';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Icon } from '@mui/material';

function DesktopNavBar() {
    const [categories,] = useRecoilState<Category[]>(categoriesAtom)
    const [,setTitle] = useRecoilState<string>(titleAtom);
    const router = useRouter();

    return (
        <>
            <nav className="py-2.5 bg-gradient-to-tr from-blue-200 to-blue-600 pr-2 pl-2">
                <div className="w-full flex justify-between items-center">
                    <div className='flex w-auto items-center'>
                        <Link href="/">
                            <a><img src='/images/portfolio.png' height={30} alt="Vittorio's portfolio"/></a>
                        </Link>
                        <span className="font-bold text-4xl pl-4" style={{flex: '1 0 0%'}}>Vittorio Morellini</span>
                    </div>
                    {/* <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button> */}
                    <div className="flex" id="navbar-default">
                        <div className="flex pt-4">
                            {categories?.map((category, index, categories) => (
                                <div key={category.id}>                                    
                                    {category.external ?
                                        <div key={category.name} className="px-4 hover:underline">                                    
                                        <Link href={category.url} passHref>
                                            <a
                                                target={"_blank"}
                                                rel={category.external && "noreferrer"}
                                            >
                                                {category.name}
                                            </a>
                                        </Link>
                                        </div>
                                    :
                                    <button className="pr-4 pl-3 text-black hover:underline" onClick={() => {
                                        setTitle(category.title);
                                        router.push(category.url)
                                    }}>
                                        {category.description}
                                    </button>
                                    }
                                </div>
                            ))}
                        </div>
                        <div className="flex px-4 pt-4 justify-between">
                            <a href="https://twitter.com/VittoMorellini" target="_blank">
                                <Icon className="h-8 w-8 hover:text-gray-400">
                                    <BsTwitter />
                                </Icon>
                            </a>
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

export default DesktopNavBar;