import { Button, TextareaAutosize, TextField } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { server } from '../../config/config';
import { Post } from '../../types/post';

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
    const saveBlog = async (event: React.MouseEvent<HTMLButtonElement>) => {
        debugger;
        console.log('save post in my blog');
        const response = await fetch(server + `/api/blog/${post.Id}`, {
            method: 'POST',
            body: JSON.stringify({Text: text, Author: author, Id: post.Id ? post.Id : 0, Date: new Date()}),
            headers: {'Content-Type': 'application/json'}
        })
        const data: Post = await response.json()
        console.log(data)
        //setId(data.Id);
        if (post.Id === 0) {
            router.push('/blog');
        }
    }

    useEffect(() => {
        setText(post.Text ? post.Text : '')
        setAuthor(post.Author ? post.Author : '')
        setId(post.Id);
    }, [])

    return (
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
                <div>
                    <TextareaAutosize
                        className='w-full border-gray-400 border-solid bg-gray-200'
                        cols={200}  
                        minRows={5}                      
                        maxRows={50}                         
                        value={text}                        
                        onChange={(e) => setText(e.target.value)} 
                        placeholder="Text"                         
                    />                
                </div>
                <div>
                    <TextareaAutosize
                        className='bg-gray-200 w-full mt-8 border-gray-400 border-solid'
                        cols={200}
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
        post: result
      }
    }
}

export default BlogDetail;