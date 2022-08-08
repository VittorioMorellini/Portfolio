import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Container } from '../components/container'
import { categoriesAtom } from '../recoil/categoryState'
import { Category } from '../types/category'
import { Photo } from '../types/photos'
import ImageLoader from '../utils/imageLoader'

interface HomeProps {
  categories: Category[];
  //photos: Photo[]
}

function Home<NextPage>({categories}: HomeProps) {
  const [, setCategories] = useRecoilState<Category[]>(categoriesAtom)
  
  useEffect(() => {
    setCategories(categories);
  }, [])

  return (
    <div>
    <Container size="2xl">
      <Box className='grid grid-cols-2'>
        <div className="relative w-full h-56 md:h-[500px]">
            <Image
              loader={ImageLoader}
              unoptimized
              src={"/images/vittorio.png"}
              alt="Vittorio Morellini"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
        </div>
        <div className="md:-translate-x-8 md:mt-28 h-full w-11/12 md:w-full m-auto md:m-0">
            <div className="-translate-y-10 md:-translate-x-0 bg-blue-200 p-5 md:p-10">
              <h1 className="font-black text-2xl md:text-5xl">
                Software engineer at{" "}
                <a
                  href="https://sixtema.it"
                  className="underline hover:text-blue-400"
                  target="_blank"
                >
                  Sixtema
                </a>
              </h1>
              <h2 className="text-xl md:text-3xl mt-2">
                Software Developer .Net (C#) and React (typescript)
              </h2>
            </div>
        </div>
      </Box>
    </Container>
    <Container size="xl">
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 mt-0 md:mt-24">
          <p>
            I'm a passionate and experienced software engineer. 
            I've worked as a software engineer for almost
            twenty years in product and consultancy
            companies, taking the best from both worlds. <br />
            <br />
            <br />
            I'm currently working as a <b>Senior Software Engineer</b> at{" "}
            <b>Sixtema</b> in two main languages: <br/>
            TypeScript and React on Frontend<br />
            .Net(C#) and SqlServer on Backend <br />
            <br />
          </p>
          <div className="relative w-full h-48 md:h-full">
            <Image
              loader={ImageLoader}
              unoptimized
              src={"/images/micheleriva_bejs.jpg"}
              alt="Michele Riva at BeJS 2022, Brussels, Belgium"
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

  const res = await fetch('http://localhost:3000/api/category')
  console.log('Res recuperate server sides category', res)
  const results: Category[] = await res.json();

  const photos = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');
  console.log('photos recuperate server sides category', photos)
  const photoses: Photo[] = await photos.json();
  
  return {
    props: {
      categories: results,
      photos: photoses
    }
  }
}

export default Home
