import { Avatar, Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Link from "next/link";
import { Container } from "../../components/container";
import { Post } from "../../types/post";
import { PostAddSharp } from '@mui/icons-material'
import { server } from "../../config/config";
import { useRouter } from "next/router";
import {format, formatISO, parseISO} from 'date-fns'

interface BlogProps {
  posts: Post[];
}

export default function BlogIndex({posts}: BlogProps) {
    const router = useRouter();
    console.log({posts})
    return (
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-4 gap-4 text-center justify-center">
              <div>
                <Button variant="outlined" className="w-32" onClick={() => {    
                            //setTitle(category.title);
                            router.push('blog/0')
                        }}>Add post
                </Button>
              </div>
              <div>
                <h1 className="text-3xl font-black text-center">Tell me what do think about my personal site</h1>
              </div>
          </div>
          {/*YYYY-MM-DDTHH:mm:ss.sssZ  post.Date.toString() */}
          <div>
          <Container>
            <div className='bg-blue-200 text-center'>
              {posts?.map((post: Post, index: number) => {
                  //To manage the timezone in formatting date
                  const date = new Date()
                  console.log('this.date', post.Date);
                  return <ListItem key={index} className="px-5"
                    secondaryAction={
                      <Link href={`/blog/${post.Id}`}>
                        <a className="hover:text-blue-400">{format(new Date(parseISO(post.Date).valueOf() + date.getTimezoneOffset() * 60 * 1000), "yyyy-MM-dd'T'HH:mm:ss")}</a>
                      </Link>
                  }>
                  <ListItemAvatar>
                    <Avatar>
                      <PostAddSharp />
                    </Avatar>
                  </ListItemAvatar>              
                  <ListItemText>
                    {post.Text}
                  </ListItemText>
                </ListItem>
              })}
            </div>
          </Container>
          </div>
        </div>  
    );
}

export async function getServerSideProps(context: any) {
  console.log('Sono in server side props')
  
  const res = await fetch(server + '/api/blog')
  //const res = await fetch('api/blog')
  const results: Post[] = await res.json();
  console.log('I have post ', results)

  return {
    props: {
      posts: results ? results : []
    }
  }
}
