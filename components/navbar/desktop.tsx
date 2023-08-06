import React from 'react';
import { useRecoilState } from 'recoil';
import { Category } from '../../types/category';
import { categoriesAtom } from '../../recoil/categoryState';
import { BsTwitter, BsGithub, BsLinkedin } from "react-icons/bs";
import { titleAtom } from '../../recoil/title';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Icon } from '@mui/material';
import Image from 'next/image';
import ImageLoader from 'utils/imageLoader';

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
                            <Image 
                                loader={ImageLoader} 
                                unoptimized
                                src='/images/portfolio.png' 
                                height={30} 
                                width={30} 
                                alt="Vittorio's portfolio"
                                //fill
                            />
                        </Link>
                        <span className="font-bold text-4xl pl-4" style={{flex: '1 0 0%'}}>Vittorio Morellini</span>
                    </div>
                    <div className="flex" id="navbar-default">
                        <ul className="flex pt-4">
                            {categories?.map((category, index, categories) => (
                                <li key={category.id}>                                    
                                    {category.external ?
                                        <div key={category.name} className="px-4 hover:underline">                                    
                                            <Link href={category.url} passHref
                                                    target={"_blank"}
                                                    rel={category.external && "noreferrer"}
                                                >
                                                    {category.name}
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
                                </li>
                            ))}
                        </ul>
                        <div className="flex px-4 pt-4 justify-between">
                            <Link href="https://twitter.com/VittoMorellini" target="_blank" rel="noreferrer">
                                <Icon className="h-8 w-8 hover:text-gray-400">
                                    <BsTwitter />
                                </Icon>
                            </Link>
                            <Link href="https://www.linkedin.com/in/vittorio-morellini-0325b620" target="_blank" rel="noreferrer">
                                <Icon className="h-8 w-8 hover:text-gray-400">
                                    <BsLinkedin />
                                </Icon>
                            </Link>
                            <Link href="https://github.com/vittoriomorellini" target="_blank" rel="noreferrer">
                                <Icon className="h-8 w-8 hover:text-gray-400">
                                    <BsGithub />
                                </Icon>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default DesktopNavBar;