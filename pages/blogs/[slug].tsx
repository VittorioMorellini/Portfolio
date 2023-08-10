import { useMDXComponent } from 'next-contentlayer/hooks'
import {allBlogs, Blog } from '.contentlayer/generated'
import BlogLayout from '../../components/blogCard'
import Head from 'next/head'
import PageTransition from '@/components/pageTransition'
import { IndexPageRef } from 'types/types'

type BlogProps = {
  blog: Blog,
  ref: IndexPageRef
}

export default function BlogDetail({ blog, ref }: BlogProps) {
    const Component = useMDXComponent(blog.body?.code)

    // <BlogLayout {...blog}>
    //     <Component />
    //     {/* <div dangerouslySetInnerHTML={{__html: blog.body?.raw}}>        
    //     </div> */}
    // </BlogLayout>
    return (
        <PageTransition ref={ref}>
        <>
            <Head>
                <title>{blog.title}</title>
            </Head>
            <div className="flex justify-center mx-auto">
                <article className="prose prose-slate lg:prose-xl">
                    <h1 className="text-center mb-3">{blog.title}</h1>
                    <p className="text-slate-500 text-center">
                        Posted on{' '}
                        <time dateTime={blog.publishedAt} title={new Date(blog.publishedAt).toString()}>
                            {new Date(blog.publishedAt).toLocaleDateString('en-CA')}
                        </time>
                    </p>
                    <h4 className='text-center'>{blog.description}</h4>
                    <div className='grid'>
                        <Component />
                    </div>
                </article>    
            </div>
        </>
        </PageTransition>      
    )
}

export async function getStaticPaths() {
    return {
        paths: allBlogs.map((blog: Blog) => ({ params: { slug: blog.slug } })),
        fallback: false,
    }
}

export async function getStaticProps({ params }: any) {
    const blog = allBlogs.find((blog: Blog) => blog.slug === params.slug)
    return { props: { blog } }
}