import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Container } from "../../components/container";
import { Post } from "../../types/post";
import { PostAddSharp, Delete } from '@mui/icons-material'
import { server } from "../../config/config";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { useRef, useState } from "react";
import Confirm from "../../utils/ui/confirm";

interface BlogProps {
  posts: Post[];
}

export default function BlogIndex({posts}: BlogProps) {
    const router = useRouter();
    const { addToast } = useToasts()
    //for confirm delete
    const [open, setOpen] = useState(false);
    const onCancel = () => { setOpen(false) };
    const onConfirm = useRef<() => void>();
    const message = useRef<string | JSX.Element | undefined>();
    
    // handler to assign the function on the confirm method
    const confirmDelete = (id: string | number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true)
        onConfirm.current = () => executeDelete(id);
    }

    //Function that execute fisically the Delete Operation
    const executeDelete = (id: string | number) => {
        console.log({id})
        fetch(server + `/api/blog/${id}`, {
            method: 'DELETE',
            //body: Json
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            addToast("Successfully deleted", {
              appearance: 'info',
              autoDismiss: true,
            })  
            router.push('/blog');
            setOpen(false);
        })
        .catch(err => {
          addToast(err, {
            appearance: 'error',
            autoDismiss: true,
          })          
          setOpen(false);
        })
    }
    
    const editPost = (id: number) => router.push('/blog/' + id);
    
    //Initialize the message that does not change in its lifetime
    message.current = "Confermi cancellazione del post?"
    //console.log({posts})
    return (
        <div className="flex flex-col">
          <Container>
          <div className="flex flex-row items-center mb-4">
              <div>
                  <Button variant="outlined" className="w-32" onClick={() => {    
                      router.push('blog/0')
                  }}>
                      Add post
                  </Button>
              </div>
              <div className="text-center w-full">
                <h1 className="text-3xl font-black text-center">Tell me what do you think about my personal site</h1>
              </div>
          </div>
          {/*YYYY-MM-DDTHH:mm:ss.sssZ  post.Date.toString() */}
          {/* format(new Date(parseISO(post.Date).valueOf() + date.getTimezoneOffset() * 60 * 1000), "yyyy-MM-dd'T'HH:mm:ss") */}
          </Container>
          <div>
          <Container>
            <div className='bg-blue-200 text-center'>
              {posts && posts?.map((post: Post, index: number) => {
                  //To manage the timezone in formatting date
                  //const date = new Date()
                  return <ListItem key={index} className="px-5">
                  <ListItemText>
                    {post.Content ? post.Content?.substring(0, 100) + '...' : ''}
                  </ListItemText>
                  <ListItemButton onClick={(e: React.MouseEvent<HTMLDivElement>) => editPost(post.Id)} className="justify-end">
                      <PostAddSharp />
                  </ListItemButton> 
                  {/*             
                  <ListItemIcon>
                    <IconButton onClick={confirmDelete(post.Id)}>                    
                      <Delete />
                    </IconButton>
                  </ListItemIcon> 
                  */}                               
                </ListItem>
              })}
            </div>
          </Container>
          </div>
          <Confirm
              open={open}
              onCancel={onCancel}
              onConfirm={onConfirm.current!}
              message={message.current}
          />
        </div>  
    );
}

export async function getServerSideProps(context: any) {
  console.log('Sono in server side props')
  
  const res = await fetch(server + '/api/blog')
  console.log('I have res', res)
  //const res = await fetch('api/blog')
  const results: Post[] = await res.json();
  console.log('I have post ', results)

  return {
    props: {
      posts: results ? results : []
    }
  }
}
