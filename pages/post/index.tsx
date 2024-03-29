import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Container } from "../../components/container";
import { Post } from "../../types/post";
import { PostAddSharp, Delete } from '@mui/icons-material'
import { server } from "../../config/config";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { forwardRef, useRef, useState } from "react";
import Confirm from "../../utils/ui/confirm";
import PageTransition from "@/components/pageTransition";
import { IndexPageRef } from "types/types";
import { motion } from "framer-motion";

interface PostProps {
  posts: Post[];
  //ref: IndexPageRef;
}

function PostIndex({posts}: PostProps) {
    const router = useRouter();
    const { addToast } = useToasts()
    //for confirm delete
    const [open, setOpen] = useState(false);
    const onCancel = () => { setOpen(false) };
    const onConfirm = useRef<() => void>();
    const message = useRef<string | JSX.Element | undefined>();
    const ref = useRef(null)

    // handler to assign the function on the confirm method
    const confirmDelete = (id: string | number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true)
        onConfirm.current = () => executeDelete(id);
    }

    //Function that execute fisically the Delete Operation
    const executeDelete = (id: string | number) => {
        console.log({id})
        fetch(server + `/api/post/${id}`, {
            method: 'DELETE',
            //body: Json
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            addToast("Successfully deleted", {
              appearance: 'info',
              autoDismiss: true,
            })  
            router.push('/post');
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
    
    const editPost = (id: number) => router.push('/post/' + id);    
    //Initialize the message that does not change in its lifetime
    message.current = "Do you confir deleting post?"
    //console.log({posts})
    return (
      <PageTransition ref={ref}>
        <div className="flex flex-col">
          <Container>
          <div className="flex flex-col items-center mb-4 md:flex-row">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}              
              >
                  <Button variant="outlined" className="w-32" onClick={() => {    
                      router.push('post/0')
                  }}>
                      Add post
                  </Button>
              </motion.div>
              <div className="text-center w-full">
                <h1 className="text-3xl font-black text-center">Tell me what do you think about my portfolio</h1>
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
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}              
                    >
                      <PostAddSharp />
                    </motion.div>
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
      </PageTransition>
    );
}
export default PostIndex

export async function getServerSideProps(context: any) {
  const res = await fetch(server + '/api/post')
  // console.log('I have res', res)
  //const res = await fetch('api/blog')
  const results: Post[] = await res.json();
  // console.log('I have post ', results)

  return {
    props: {
      posts: results ? results : []
    }
  }
}
