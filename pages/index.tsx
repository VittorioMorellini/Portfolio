import { Box } from '@mui/material'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Container } from '../components/container'
import { server } from '../config/config'
import { categoriesAtom } from '../recoil/categoryState'
import { Category } from '../types/category'
import ImageLoader from '../utils/function'
import PageTransition from '@/components/pageTransition'
import { IndexPageRef } from 'types/types'
import { AnimatePresence, motion } from 'framer-motion'
import * as S from "../components/banner/banner";

interface HomeProps {
  categories: Category[];
  ref: IndexPageRef
}
function Home<NextPage>({categories, ref}: HomeProps) {
  const [, setCategories] = useRecoilState<Category[]>(categoriesAtom)
  
  const svgVariants = {
    initial: {
        rotate: -360
    },
    animate: {
        rotate: 0,
        transition: {
            duration: 1
        }
    },
    exit: {
        rotate: -180
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
    setCategories(categories);
  }, [])

  return (
    <PageTransition ref={ref}>
      <div>
        <Container size="2xl">
          <Box className='grid gap-10 md:grid-cols-2'>
            <AnimatePresence>
              <motion.div className="w-full h-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                  {/* h-56 md:h-[500px] */}
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
              <motion.div className="h-full w-full md:m-0"
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
                A technical director told me that I am still mid level on the web, 
                but I have the ambition and the determination to become a <b>Senior SDE</b> on the Web<br />
                <br />
                I started at the new millenium working as a developer in Visual Basic 6.
                But I have always felt the desire to develop on the Web.<br />
                If on the backend I&apos;ve always been certain to select dotnet ecosystem,
                for the front end, after a road on more companies, I am convinced to develop 
                in javascript with the best frameworks that are available:
                React, Angular, Vue...<br />
                I am a React.js developer since october 2020, every day I work to improve in the front end enviroment  
                <br /><br />
                I am currently working as a <b>Software Engineer</b> at{" "}
                <b>Sixtema</b> in two main ecosystem: <br/>
                React.js / Next.js (Typescript) on Frontend<br />
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
  )
}

//Dynamic load categories does not work in component, only in page so I have to load from outside
//Cannot use this function in component
export async function getServerSideProps (context: any) {
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

export default Home
