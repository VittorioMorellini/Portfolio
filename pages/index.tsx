import { Box } from '@mui/material'
import Image from 'next/image'
import {  useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { server } from '../config/config'
import { categoriesAtom } from '../recoil/categoryState'
import { Category } from '../types/category'
import { redirect, RedirectType } from 'next/navigation';

interface HomeProps {
  categories: Category[];
}
function Home<NextPage>({categories}: HomeProps) {
  const [, setCategories] = useRecoilState<Category[]>(categoriesAtom)
  const ref = useRef<HTMLDivElement>(null)
  
  const svgVariants = {
    initial: {
        //rotate: -360
        opacity: 0
    },
    animate: {
        //rotate: 0,
        opacity: 1,
        transition: {
            duration: 2.5,
            ease: 'easeInOut'
        }
    },
    exit: {
        opacity: 0.5
    }
  }

  const pathOneVariants = {
    initial: {
        opacity: 0,
        pathLength: 0
    },
    animate: {
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 2,
            ease: 'easeInOut'
        }
    }
  }

  const pathTwoVariants = {
    initial: {
        opacity: 1,
        pathLength: 1
    },
    animate: {
        opacity: 0,
        pathLength: 0,
        transition: {
            duration: 2,
            delay: 2,
            ease: 'easeInOut'
        }
    }
  }  
  
  useEffect(() => {
    //setCategories(categories);
    //window.location.href = 'https://portfolioapp-vittoriomorellini.vercel.app'
    redirect('https://portfolioapp-vittoriomorellini.vercel.app', RedirectType.replace)
  }, [])

  return (
    <div className="flex items-center justify-center h-screen">
      <span className='text-2xl'>Site no longer available</span> goto: https://portfolioapp-vittoriomorellini.vercel.app 
    </div>
  )
}
export default Home
      {/* 
      <PageTransition ref={ref} allowScroll={false}>
      <div>
        <Container size="2xl">
          <Box className='grid gap-10 md:grid-cols-2'>
            <motion.div className="w-full h-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
                <Image
                  loader={ImageLoader}
                  unoptimized
                  src={"/images/vittorio.png"}
                  alt="Vittorio Morellini"
                  // layout="fill"
                  // objectFit="cover"
                  // objectPosition="center"
                  width="300"
                  height="300"
                />
            </motion.div>
            <AnimatePresence>
            <motion.div className="h-full w-full lg:m-0"
                variants={svgVariants}
                initial="initial"
                animate="animate"
                exit="exit"            
            >
                <div className="bg-blue-200">
                  <h1 className="font-black text-2xl md:text-5xl">
                    Software engineer at{" "}
                    <a
                      href="https://sixtema.it"
                      className="underline hover:text-blue-400"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Sixtema
                    </a>
                    <br />(Modena, Italy)
                  </h1>
                  <h2 className="text-xl md:text-3xl mt-2">
                    Software Developer dotnet (C#) and React.js (typescript)
                  </h2>
                </div>
            </motion.div>
            </AnimatePresence>          
          </Box>
        </Container>
        <Container size="xl">
            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 mt-0 md:mt-12">
              <p>
                <br/>
                <b style={{fontSize: '16px'}}>Who am I?</b><br/>
                I am a software engineer and I love web development.<br />
                I am not so young, unfortunately, I am a full stack developer because I don&apos;t want to leave nor backend neither frontend<br />
                I have worked as a software engineer for more than
                twenty years in product and consultancy companies.<br />
                I have the determination to be a reference as a <b>Senior SDE</b> on the Web<br />
                <br />
                I started at the beginning of new millenium working as a developer in Visual Basic 6.
                But I have always felt the desire to develop on the Web.<br />
                If on the backend I&apos;ve always been certain to select dotnet ecosystem,
                for the front end, after a road on more companies, I am convinced to develop 
                in javascript with the best frameworks that are available:
                React, Angular, Vue...<br />
                I am a React.js developer since october 2020, every day I work to improve in the front end enviroment  
                <br /><br />
                I am currently working as a <b>Software Engineer</b> at{" "}
                <b>Sixtema</b> in two main ecosystem: <br/>
                React.js & Next.js (Typescript) on Frontend<br />
                dotnet (C#) on Backend <br />
                <br />
              </p>
              <motion.div className="relative w-full h-48 md:h-full text-center"
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  loader={ImageLoader}
                  unoptimized
                  src={"/images/Coding.jpg"}
                  alt="Coding is our life"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </motion.div>
            </div>
        </Container>  
      </div>
    </PageTransition>
    */}

//Static load categories does not work in component, only in page so I have to load from outside
//Cannot use this function in component
export async function getStaticProps (context: any) {
  //console.log('Sono in server sides category')

  const res = await fetch(server +'/api/category')
  //console.log('Res recuperate server sides category', res)
  const results: Category[] = await res.json();
  
  return {
    props: {
      categories: results
    }
  }
}
