import Head from 'next/head'
import BlogCard from '../../components/blogCard'
import { allBlogs, Blog } from '.contentlayer/generated'
import { select } from '../../utils/select';
import { useRouter } from 'next/router';

interface BlogIndexProps {
    blogs: Blog[];
}
export default function BlogIndex({blogs}: BlogIndexProps) {
  const router = useRouter();

  const handleClick = (slug: string) => (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(slug)
    router.push('/blogs/' + slug);
  }

  return (
    <div>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
      
        <main>
        {blogs.map(
            ({
                title,
                description,
                slug,
                category,
                publishedAt,
                body,
                cover,
                type,
                _id,
                _raw,
                image,
                readingTime,
            }: Blog) => (
                <div role="button" onClick={handleClick(slug)}>
                <BlogCard
                    key={_id}
                    _id={_id}
                    title={title}
                    description={description}
                    publishedAt={publishedAt}
                    cover={cover}
                    slug={slug}
                    body={body}
                    type={type}
                    _raw={_raw}
                    image={image}
                    category={category}
                    //dateTime={publishedAt}
                    //date={publishedAt}
                    readingTime={readingTime.text}
                    
                />
                </div>
                )
        )}

        </main>
    </div>
    )
}

export function getStaticProps() {
  const blogs = allBlogs
    .map((blog: Blog) =>
      select(blog, [
        'slug',
        'title',
        'description',
        'publishedAt',
        'readingTime',
        // 'author',
        // 'category',
        // 'image',
      ])
    )
    // .sort(
    //   (a: any, b: any) =>
    //     Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    // );

  return { props: { blogs } };
}