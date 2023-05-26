import { Button, TextareaAutosize, TextField } from '@mui/material';
import axios from 'axios';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { server } from '../../config/config';
import { Post } from '../../types/post';
import Confirm from '../../utils/ui/confirm';

interface PostDetailProps {
    post: Post;
}

function PostDetail({ post }: PostDetailProps) {
    const router = useRouter()
    console.log('id', router.query.id)        
    console.log('I am in detail page post')
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
        console.log('save post in my blog');
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
        // console.log('First load fill the data')
        // console.log({post})
        setText(post.Content ? post.Content : '')
        setAuthor(post.Author ? post.Author : '')
        setId(post.Id);
    }, [])

    return (
        <>
        <div className='flex relative max-w-full'>
            <div className="w-1/5">
                <Link href="/post" passHref className='text-black hover:text-blue-500'>Back
                </Link>
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
                <div>
                    <Button
                        variant="outlined"
                        onClick={savePost}
                    >
                        Save
                    </Button>
                </div>
                }
            </div>
        </div>
        </>    
    )
}

export async function getServerSideProps(context: any) {
    //console.log('I am in server side props loading SSR')
    const data = await fetch(server + `/api/post/${context.query.id}`)
    const result: Post = await data.json();
    console.log('Data fetched json() in server side props api id blog SSR', result)

    return {
      props: {
        //post: JSON.parse(JSON.stringify(result))
        post: result
      }
    }
}

export default PostDetail;