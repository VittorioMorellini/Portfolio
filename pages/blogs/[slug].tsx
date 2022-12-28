import { useMDXComponent } from 'next-contentlayer/hooks'
import {allBlogs, Blog } from '.contentlayer/generated'
import BlogLayout from '../../components/blogCard'
import Head from 'next/head'

type BlogProps = {
  blog: Blog
}

export default function BlogDetail({ blog }: BlogProps) {
    const Component = useMDXComponent(blog.body?.code)

    return (
        // <BlogLayout {...blog}>
        //     <Component />
        //     {/* <div dangerouslySetInnerHTML={{__html: blog.body?.raw}}>        
        //     </div> */}
        // </BlogLayout>
        <>
        <Head>
            <title>{blog.title}</title>
        </Head>
        <article className="prose prose-slate lg:prose-xl">
            <h1 className="text-center mb-3">{blog.title}</h1>
            <p className="text-slate-500 text-center">
                Posted on{' '}
                <time dateTime={blog.publishedAt} title={new Date(blog.publishedAt).toString()}>
                    {new Date(blog.publishedAt).toLocaleDateString('en-CA')}
                </time>
            </p>
            <Component />
        </article>    
        </>
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