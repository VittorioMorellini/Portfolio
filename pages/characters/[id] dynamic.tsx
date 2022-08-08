import { Character } from "../../types/types"
import ImageLoader from "../../utils/imageLoader";
import Image from 'next/image'
import { useRouter } from 'next/router'
//import mypic from '../../public/vercel.svg'
//import Layout from "../../component/layout_old";
import styles from '../../styles/character.module.css'
import Link from "next/link";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

interface CharacterPageProps {
    character: Character;
}

//Pagina di ìnamica di un character
function CharacterPage({character}: CharacterPageProps) {    
    const router = useRouter()

    console.log('id', router.query.id)
    return (
        <div className={styles.main}>
            <section className={styles.buttons}>
                <Link href="/characters">
                    <a><h3>Back to character list</h3></a>
                </Link>
            </section>
            <Box sx={{width: '100%'}}>
                <Card sx={{ maxWidth: 345 }}>
                    {/* <CardMedia
                        component="img"
                        height="200"
                        image={character.image}
                        alt={character.name}
                    /> */}
                    <Image
                        loader={ImageLoader}
                        unoptimized
                        src={character.image}
                        alt={character.name}
                        width="400px"
                        height="400px"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {character.species}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {/* Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica */}
                        {character.status}
                        {character.name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>            
            </Box>
        </div>
    )
}

// CharacterPage.getLayout = function getLauyout(page: typeof CharacterPage) {
//     return <Layout>{page}</Layout>
// }

export async function getServerSideProps(context: any) {
    const res = await fetch(
        `https://rickandmortyapi.com/api/character/${context.query.id}`
    )

    const character = await res.json();
    return {
        props: {
            character
        }
    }
}

export default CharacterPage