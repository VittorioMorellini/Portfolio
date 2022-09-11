import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Container } from '../components/container'
import { server } from '../config/config'
import { categoriesAtom } from '../recoil/categoryState'
import { Category } from '../types/category'
import ImageLoader from '../utils/imageLoader'

interface HomeProps {
  categories: Category[];
}

function Home<NextPage>({categories}: HomeProps) {
  const [, setCategories] = useRecoilState<Category[]>(categoriesAtom)
  
  useEffect(() => {
    setCategories(categories);
  }, [])

  return (
    <div>
      <Container size="2xl">
        <Box className='grid gap-10 md:grid-cols-2'>
          <div className="w-full h-full text-center">
              {/* h-56 md:h-[500px] */}
              <Image
                loader={ImageLoader}
                unoptimized
                src={"/images/vittorio.png"}
                alt="Vittorio Morellini"
                //layout="fill"
                //objectFit="cover"
                //objectPosition="center"
                width="200"
                height="200"
              />
          </div>
          <div className="h-full w-full md:m-0">
              <div className="bg-blue-200">
                <h1 className="font-black text-2xl md:text-5xl">
                  Software engineer at{" "}
                  <a
                    href="https://sixtema.it"
                    className="underline hover:text-blue-400"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sixtema
                  </a>
                  (Modena, Italy)
                </h1>
                <h2 className="text-xl md:text-3xl mt-2">
                  Software Developer .Net (C#) and React (typescript)
                </h2>
              </div>
          </div>
        </Box>
      </Container>
      <Container size="xl">
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 mt-0 md:mt-12">
            <p>
              I am a software engineer. I love web development.
              I have worked as a software engineer for more than
              twenty years in product and consultancy companies.<br />
              Some technical director told me that I am still mid level on the web 
              (I started in vb6), but I have the ambition and the determination 
              to become a <b>SDE II</b> on the Web<br />
              <br />
              <br />
              I am currently working as a <b>Senior Software Engineer</b> at{" "}
              <b>Sixtema</b> in two main languages: <br/>
              React on Frontend<br />
              .Net (C#) on Backend <br />
              <br />
            </p>
            <div className="relative w-full h-48 md:h-full text-center">
              <Image
                loader={ImageLoader}
                unoptimized
                src={"/images/Coding.jpg"}
                alt="Coding is our life"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
      </Container>  
    </div>
  )
}

//Dynamic load categories does not work in component, only in page so I have to load from outside
//Cannot use this function in component
export async function getServerSideProps (context: any) {
  console.log('Sono in server sides category')

  const res = await fetch(server +'/api/category')
  console.log('Res recuperate server sides category', res)
  const results: Category[] = await res.json();
  
  return {
    props: {
      categories: results
    }
  }
}

export default Home
