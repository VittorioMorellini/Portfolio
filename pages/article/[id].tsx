import { Button, TextareaAutosize, TextField } from '@mui/material';
import axios from 'axios';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { server } from '../../config/config';
import { Article } from '../../types/article';

interface ArticleDetailProps {
    article: Article;
}

function ArticleDetail({ article }: ArticleDetailProps) {
    const router = useRouter()
    console.log('id', router.query.id)        
    console.log('I am in detail page blog')
    const [summary, setSummary] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState(0)
    const { addToast } = useToasts()

    const showToast = () => {
        addToast("Succesfully updated", {
            appearance: 'info',
            autoDismiss: true,
        })        
    }

    useEffect(() => {
        // console.log('First load fill the data')
        // console.log({post})
        setSummary(article.summary ? article.summary : '')
        setName(article.name ? article.name : '')
        // setId(post.Id);
    }, [])

    return (
        <>
        <div className='flex relative max-w-full'>
            <div className="w-1/5">
                <Link href="/article" passHref>
                    <a className='text-black hover:text-blue-500'>Back</a>
                </Link>
            </div>
            <div className="flex flex-col items-center w-4/5">
                <div className="text-center mb-4">
                    <h1 className=''>{article?._id} - {article.name}</h1>
                </div>
                <div className='block'> 
                    <div dangerouslySetInnerHTML={{ __html: article.summary}} />
                </div>
            </div>
        </div>
        </>    
    )
}

export async function getServerSideProps(context: any) {
    //console.log('I am in server side props loading SSR')
    const data = await fetch(server + `/api/article/${context.query.id}`)
    const result: Article = await data.json();
    console.log('Data fetched json() in server side props api id article SSR', result)

    return {
      props: { article: result }
    }
}

export default ArticleDetail;