import { Avatar, Button, IconButton, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Container } from "../../components/container";
import { Post } from "../../types/post";
import { Delete, Edit, Add } from '@mui/icons-material'
import { server } from "../../config/config";
import { useRouter } from "next/navigation";
import { useToasts } from "react-toast-notifications";
import { useRef, useState } from "react";
import Confirm from "../../utils/ui/confirm";
import PageTransition from "@/components/pageTransition";
import { motion } from "framer-motion";
import { getPosts } from "lib/postSupport";
import Link from "next/link";
import React from "react";

interface PostProps {
  posts: Post[];
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
    message.current = "Do you confir deleting post?"

    // handler to assign the function on the confirm method
    const confirmDelete = (id: string | number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpen(true)
        onConfirm.current = () => executeDelete(id);
    }

    //Function that execute fisically the Delete Operation
    const executeDelete = (id: string | number) => {
        //console.log('Sto per chiamare Api Delete post with Id', {id})
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
            setOpen(false);
            router.push('/post');
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
    React.useEffect(() => {
      //console.log('PostIndex useEffect')  
      window.location.href = 'https://portfolioapp-vittoriomorellini.vercel.app'
    }, [])
    return (
      <div>
        Post
      </div>
    );
}
export default PostIndex
      {/*<PageTransition ref={ref}>
        <div className="flex flex-col">
          <Container>
          <div className="flex flex-col items-center mb-4 md:flex-row">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}              
              >
                  <Button variant="outlined" className="w-32">
                    <Link href='/post/0' className='font-black hover:text-blue-500' title="New">Add post</Link>
                  </Button>
              </motion.div>
              <div className="text-center w-full">
                <h1 className="text-3xl font-black text-center">Tell me what do you think about my portfolio</h1>
              </div>
          </div>
          </Container>
          <div>
          <Container>
            <div className='bg-blue-200 text-center'>
              {posts && posts?.map((post: Post, index: number) => {
                //To manage the timezone in formatting date
                //const date = new Date()
                return <ListItem key={index} className="px-5 w-[90%]">
                  <ListItemText>
                    {post.Content ? post.Content?.substring(0, 100) + '...' : ''}
                  </ListItemText>
                  <ListItemIcon>
                    <IconButton onClick={(e: React.MouseEvent<HTMLButtonElement>) => editPost(post.Id)} >
                      <Edit />
                    </IconButton> 
                  </ListItemIcon> 
                  {post.Id !== 2 &&
                    <ListItemIcon>
                      <IconButton onClick={confirmDelete(post.Id)}>                    
                        <Delete />
                      </IconButton>
                    </ListItemIcon> 
                  }
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
      */}

export async function getStaticProps(context: any) {  
  let posts = await getPosts()
  
  return {
    props: {
      posts: posts ?? []
    },
    revalidate: 3600, // In seconds
  }  
}
