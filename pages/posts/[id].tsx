import Link from "next/link";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Post } from "../../types/post";

interface PostPageProps {
    post: Post;
}

//Pagina di ìnamica di un character
function PostPage({post}: PostPageProps) {    
    // const router = useRouter()
    // console.log('id', router.query.id)
    return (
        <div>
            <section>
                <Link href="/posts">
                    <a><h3 className="hover:text-blue-400">Back to posts list</h3></a>
                </Link>
            </section>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Post of UserId: {post?.userId}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {post.title}
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {post.body}
                        </Typography>
                    </CardContent>
                    <CardActions>
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
        `https://jsonplaceholder.typicode.com/posts/${context.query.id}`
    )

    const post = await res.json();
    return {
        props: {
            post
        }
    }
}

export default PostPage