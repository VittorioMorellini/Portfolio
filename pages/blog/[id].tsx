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

interface BlogDetailProps {
    post: Post;
}

function BlogDetail({ post }: BlogDetailProps) {
    const router = useRouter()
    console.log('id', router.query.id)        
    console.log('I am in detail page blog')
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

    const saveBlog = async (event: React.MouseEvent<HTMLButtonElement>) => {
        debugger;
        console.log('save post in my blog');
        const response = fetch(server + `/api/blog/${post.Id}`, {
            method: 'POST',
            body: JSON.stringify({Text: text, Author: author, Id: post.Id ? post.Id : 0, Date: parseISO(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            showToast()
            if (post.Id === 0)
                router.push('/blog');
            })
        .catch(err => {
            addToast(err, {
                appearance: 'error',
                autoDismiss: true,
            })  
        })        
    }

    useEffect(() => {
        setText(post.Text ? post.Text : '')
        setAuthor(post.Author ? post.Author : '')
        setId(post.Id);
    }, [])

    return (
        <>
        <div className='flex relative max-w-full'>
            <div className="w-1/5">
                <Link href="/blog" passHref>
                    <a className='text-black hover:text-blue-500'>Back</a>
                </Link>
            </div>
            <div className="flex flex-col items-center w-4/5">
                <div className="text-center mb-4">
                    <h3>Post Id: {id}</h3>
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
                <div>
                    <Button
                        variant="outlined"
                        onClick={saveBlog}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
        </>    
    )
}

export async function getServerSideProps(context: any) {
    console.log('I am in server side props loading SSR')
    //const { data } = await axios.get(server + `/api/blog/${context.query.id}`)
    const  data  = await fetch(server + `/api/blog/${context.query.id}`)
    //const results: Post = await JSON.parse(res.json());
    console.log('Data fetched in server side props api id blog SSR', data)
    const result: Post = await data.json();
    console.log('Data fetched json() in server side props api id blog SSR', result)

    return {
      props: {
        post: JSON.parse(JSON.stringify(result))
      }
    }
}

export default BlogDetail;