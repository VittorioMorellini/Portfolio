import { useMDXComponent } from 'next-contentlayer/hooks'
import {allBlogs, Blog } from '.contentlayer/generated'
import BlogLayout from '../../components/blogCard'

type BlogProps = {
  blog: Blog
}

export default function BlogDetail({ blog }: BlogProps) {
    const Component = useMDXComponent(blog.body?.code)

    return (
        <BlogLayout {...blog}>
            <Component />
        </BlogLayout>
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