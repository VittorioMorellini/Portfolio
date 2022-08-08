import { Meme } from "../../types/meme"
import ImageLoader from "../../utils/imageLoader";
import Image from 'next/image'
import { useRouter } from 'next/router'
//import mypic from '../../public/vercel.svg'
//import Layout from "../../component/layout_old";
import styles from '../../styles/character.module.css'
import Link from "next/link";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import axios from "axios";

interface MemePageProps {
    meme: Meme;
}
//Pagina di ìnamica di un character
function MemePage({meme}: MemePageProps) {    
    return (
        <div className="relative">
            <section className="">
                <Link href="/memes">
                    <a><h3>Back to meme list</h3></a>
                </Link>
            </section>
            <Box>
                <Card>
                    <Image
                        loader={ImageLoader}
                        unoptimized
                        src={meme.url}
                        alt={meme.name}
                        width="400px"
                        height={meme.height}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {/* Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica */}
                            {meme.box_count}
                            {meme.name}
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

export async function getStaticPaths() {
    const { data } = await axios.get("https://api.imgflip.com/get_memes")
    return  {
        paths: data.data.memes.map((meme: Meme) => {
            return {params: {id: String(meme.id)} };
        }),
        fallback: false
    }
}

export async function getStaticProps({params}: {params: {id: string} }) {
    console.log('params meme id server side', params)
    const res = await axios.get(
        `https://api.imgflip.com/get_memes/${params.id}`
    )
    console.log('meme id server side', res)
    //const meme = await res.json();
    return {
        props: {
            meme: res
        }
    }
}

export default MemePage