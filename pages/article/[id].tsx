import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { server } from '../../config/config';
import { Article } from '../../types/article';
import PageTransition from '@/components/pageTransition';
import { motion } from 'framer-motion';
import { Button, TextareaAutosize } from '@mui/material';
import { getArticle } from 'lib/articleSupport';

function ArticleDetail({ article }: { article: Article }) {
    const router = useRouter()
    //console.log('id', router.query.id)        
    //console.log('I am in detail page blog')
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [id, setId] = useState<string | null>(null)
    const { addToast } = useToasts()

    const showToast = () => {
        addToast("Succesfully updated", {
            appearance: 'info',
            autoDismiss: true,
        })        
    }
    useEffect(() => {
        // console.log('First load fill the data')
        setDescription(article.description ? article.description : '')
        setName(article.name ? article.name : '')
        setSummary(article.summary ? article.summary : '')
        // setId(post.Id);
    }, [])
    const saveArticle = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const response = fetch(server + `/api/article/${article?._id}`, {
            method: 'POST',
            body: JSON.stringify({
                _id: article._id, 
                name: name, description: description,
                summary: summary, 
                listing_url: article.listing_url, 
                property_type: article.property_type, 
                bedrooms: article.bedrooms,
                bathrooms: article.bathrooms, 
                amenities: article.amenities
            }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            showToast()
            if (article?._id === '0')
                router.push('/article');
            })
        .catch(err => {
            addToast(err, {
                appearance: 'error',
                autoDismiss: true,
            })  
        })        
        
    }
    return (
        <PageTransition>
            <div className='flex relative max-w-full'>
                <div className="w-1/5">
                    <Link href="/article" passHref className='text-black hover:text-blue-500'>Back
                    </Link>
                </div>
                <div className="flex flex-col items-center w-4/5 gap-2">
                    <div className="text-center mb-4">
                        <h1 className=''>{article?._id}</h1>
                    </div>
                    <div className='block'>
                        <label className='italic'>Name</label>
                        <TextareaAutosize
                            className='w-full border-gray-400 border-solid bg-gray-200'
                            cols={250}  
                            minRows={1}                      
                            maxRows={1}                         
                            value={name}                        
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Text"                         
                        />                
                    </div>
                    <div className='mt-8 block'>
                        <label className='italic'>Description</label>
                        <TextareaAutosize
                            className='bg-gray-200 w-full border-gray-400 border-solid'
                            cols={250}
                            placeholder="Description" 
                            minRows={10}                      
                            maxRows={30}                         
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}                         
                        />
                    </div>
                    <div className='mt-8 block'>
                        <label className='italic'>Summary</label>
                        <TextareaAutosize
                            className='bg-gray-200 w-full border-gray-400 border-solid'
                            cols={250}
                            placeholder="Summary" 
                            minRows={3}                      
                            maxRows={10}                         
                            value={summary} 
                            onChange={(e) => setSummary(e.target.value)}                         
                        />
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}              
                    >
                        <Button
                            variant="outlined"
                            onClick={saveArticle}
                        >
                            Save
                        </Button>
                    </motion.div>
                </div>
            </div>
        </PageTransition>    
    )
}
export default ArticleDetail;

export async function getServerSideProps(context: any) {
    //console.log('I am in server side props loading SSR')
    // const data = await fetch(server + `/api/article/${context.query.id}`)
    // const result: Article = await data.json();
    let result: Article | null = await getArticle(context.query.id)
    console.log('Data fetched json() in server side props api id article SSR', result)

    const mongo = require('mongodb');
    return {
      props: { article: result ?? 
        {_id: new mongo.ObjectId('0'), 
            name: '', 
            description: '', 
            summary: '', 
            listing_url: '', property_type: '', 
            bedrooms: 0, bathrooms: 0, amenities: [] 
        } 
      }, // will be passed to the page component as props
    }     
}

