import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, rgbToHex, Stack, Theme, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { categoriesAtom } from '../recoil/categoryState'
import { Category } from '../types/category'
import { Photo } from '../types/photos'

interface HomeProps {
  categories: Category[];
  photos: Photo[]
}

function Home<NextPage>({categories, photos}: HomeProps)  {
  const [, setCategories] = useRecoilState<Category[]>(categoriesAtom)
  
  useEffect(() => {
    setCategories(categories);
  }, [])

  return (
    <Box>
        <Box>
          <Container maxWidth="sm">
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" sx={{color: (theme: Theme) => theme.palette.primary.dark}} className="hover:text-white">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {photos.map((photo) => (
              <Grid item key={photo.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={photo.thumbnailUrl}
                    alt={photo.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      <a href={photo.url} target="_blank" rel="noreferrer"><h5 style={{fontSize: '1.25rem'}}>Go to image</h5></a>
                    </Typography>
                    <Typography>
                      {photo.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => window.open(photo.url)}>View</Button>
                    <Button size="small" onClick={() => alert('Edit not allowed')}>Edit</Button> 
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box className="flex mt-2 justify-between">
          <Button variant="contained" sx={{color: (theme: Theme) => theme.palette.primary.dark}} className="hover:text-white">Try portal business</Button>
          <Button variant="outlined">Portal Free at Home</Button>
        </Box>  
    </Box>
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
