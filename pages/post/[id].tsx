import { Button, TextareaAutosize } from '@mui/material';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { server } from '../../config/config';
import { Post } from '../../types/post';
import { motion } from 'framer-motion';
import { IndexPageRef } from 'types/types';
import PageTransition from '@/components/pageTransition';
import { GetStaticPaths } from 'next/types';
import { getPost, getPosts } from 'lib/postSupport';

interface PostDetailProps {
    post: Post,
    ref: IndexPageRef
}
function PostDetail({ post, ref }: PostDetailProps) {
    const router = useRouter()
    // console.log('I am in detail page post')
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [id, setId] = useState(0)
    const { addToast } = useToasts()

    const showToast = () => {
        addToast("Succesfully updated", {
            appearance: 'info',
            autoDismiss: true,
        })        
    }
    const savePost = async (event: React.MouseEvent<HTMLButtonElement>) => {
        //console.log('save post in my blog');
        const response = fetch(server + `/api/post/${post.Id}`, {
            method: 'POST',
            body: JSON.stringify({Content: text, Author: author, Id: post.Id ? post.Id : 0, PostDate: parseISO(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            showToast()
            if (post.Id === 0)
                router.push('/post');
        })
        .catch(err => {
            addToast(err, {
                appearance: 'error',
                autoDismiss: true,
            })  
        })        
    }

    useEffect(() => {
        setText(post.Content ? post.Content : '')
        setAuthor(post.Author ? post.Author : '')
        setId(post.Id);
    }, [])
    return (
        <PageTransition ref={ref}>
        <>
            <div className='flex relative max-w-full'>
                <div className="w-1/5">
                    <motion.div 
                        //whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}              
                    >
                        <Link href="/post" passHref className='text-black hover:text-blue-500'>Back
                        </Link>
                    </motion.div>
                </div>
                <div className="flex flex-col items-center w-4/5">
                    <div className="text-center mb-4">
                        <h3>Post Id: {post?.Id}</h3>
                    </div>
                    <div className='block'>
                        <label className='italic'>Content</label>
                        <TextareaAutosize
                            className='w-full border-gray-400 border-solid bg-gray-200'
                            cols={250}  
                            minRows={15}                      
                            maxRows={50}                         
                            value={text}                        
                            onChange={(e) => setText(e.target.value)} 
                            placeholder="Text"                         
                        />                
                    </div>
                    <div className='mt-8 block'>
                        <label className='italic'>Author</label>
                        <TextareaAutosize
                            className='bg-gray-200 w-full border-gray-400 border-solid'
                            cols={250}
                            placeholder="Author" 
                            maxRows={1}                         
                            value={author} 
                            onChange={(e) => setAuthor(e.target.value)}                         
                        />
                    </div>
                    {post.Id !== 2 &&
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}              
                        >
                            <Button
                                variant="outlined"
                                onClick={savePost}
                            >
                                Save
                            </Button>
                        </motion.div>
                    }
                </div>
            </div>
        </>    
        </PageTransition>    
    )
}
export default PostDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    let posts: Post[] = await getPosts()
    const paths: string[] = posts.map((post: Post) => `/post/${post.Id}`)
    return {
        paths,
        fallback: "blocking",
    }
}
export async function getStaticProps({ params }: { params: { id: string } }) {
    const id = params.id;
    if (id !== '0') {
        const post = await getPost(parseInt(id as string))
        //console.log('Data fetched json() in static props api id blog SSG', post)
        return {
            props: {
                post: post
            },
            revalidate: 3600 // 1 hour,
        }
    } else {
        //Return a new post
        let post: Post = {Id: 0, Content: '', Author: '', PostDate: ''}
        return {
            props: {
                post: post
            },
            revalidate: 3600 // 1 hour,
        }
    }
}
