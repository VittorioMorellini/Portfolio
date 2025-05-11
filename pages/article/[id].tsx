import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { server } from '../../config/config';
import { Article } from '../../types/article';
import { IndexPageRef } from 'types/types';
import PageTransition from '@/components/pageTransition';

interface ArticleDetailProps {
    article: Article,
    //ref: IndexPageRef
}
function ArticleDetail({ article }: ArticleDetailProps) {
    const router = useRouter()
    //console.log('id', router.query.id)        
    console.log('I am in detail page blog')
    //const [summary, setSummary] = useState('');
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
        //setSummary(article.summary ? article.summary : '')
        setName(article.name ? article.name : '')
        // setId(post.Id);
    }, [])

    return (
        <PageTransition>
            <div className='flex relative max-w-full'>
                <div className="w-1/5">
                    <Link href="/article" passHref className='text-black hover:text-blue-500'>Back
                    </Link>
                </div>
                <div className="flex flex-col items-center w-4/5">
                    <div className="text-center mb-4">
                        <h1 className=''>{article?._id} - {article.name}</h1>
                    </div>
                    <div className='block'> 
                        <div dangerouslySetInnerHTML={{ __html: article.description}} />
                    </div>
                </div>
            </div>
        </PageTransition>    
    )
}
export default ArticleDetail;

export async function getServerSideProps(context: any) {
    //console.log('I am in server side props loading SSR')
    const data = await fetch(server + `/api/article/${context.query.id}`)
    const result: Article = await data.json();
    console.log('Data fetched json() in server side props api id article SSR', result)

    return {
      props: { article: result }
    }
}

