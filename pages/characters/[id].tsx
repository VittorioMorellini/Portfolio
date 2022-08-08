import { Character, GetCharacterResults } from "../../types/types"
import ImageLoader from "../../utils/imageLoader";
import Image from 'next/image'
import Link from "next/link";
import { Box, Button, Card, CardActions, CardContent, Paper, Typography } from "@mui/material";

interface CharacterPageProps {
    character: Character;
}
//Pagina di ìnamica di un character
function CharacterPage({character}: CharacterPageProps) {    
    return (
        <Box className="flex flex-row relative">
            <section className="w-1/3">
                <Link href="/characters">
                    <a><h3 className="text-2xl hover:text-blue-400">Back to list</h3></a>
                </Link>
            </section>
            <Box className="w-2/3 text-center">
                <Card sx={{ maxWidth: 345 }}>
                    {/* <CardMedia
                        component="img"
                        height="200"
                        image={character.image}
                        alt={character.name}
                    /> */}
                    <Image
                        className="rounded-full"
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
                    <CardActions className="flex justify-center">
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>            
            </Box>
        </Box>
    )
}

export async function getStaticPaths() {

    const res = await fetch("https://rickandmortyapi.com/api/character")
    const {results}: GetCharacterResults = await res.json()

    return  {
        paths: results.map((character) => {
            return {params: {id: String(character.id)} };
        }),
        fallback: false
    }
}

export async function getStaticProps({params}: {params: {id: string} }) {
    const res = await fetch(
        `https://rickandmortyapi.com/api/character/${params.id}`
    )

    const character = await res.json();
    return {
        props: {
            character
        }
    }
}

export default CharacterPage