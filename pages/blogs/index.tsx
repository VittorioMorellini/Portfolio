import BlogCard from '../../components/blogCard'
import { allBlogs, Blog } from '.contentlayer/generated'
import { select } from '../../utils/function';
import { useRouter } from 'next/router';
import { Button, Divider } from '@mui/material';
import { Container } from "../../components/container";
import { forwardRef, useRef, useState } from 'react';
import PageTransition from '@/components/pageTransition';
import { IndexPageRef } from 'types/types';

interface BlogIndexProps {
    blogs: Blog[],
    //ref: IndexPageRef
}
function BlogIndex({blogs}: BlogIndexProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const ref = useRef(null)

  const handleClick = (slug: string) => (event: React.MouseEvent<HTMLDivElement>) => {
    //console.log(slug)
    router.push('/blogs/' + slug);
  }

  const handleFilterBlog = (value: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setSearchValue(value)
  }
  return (
    <PageTransition ref={ref} allowScroll={true}>
        <Container>
          <div className="flex flex-row items-center mb-4">
              <div className="text-center w-full">
                <h1 className="text-3xl font-black text-center">My personal Blog</h1>
                <input
                    className='border-solid border border-slate-300 rounded-2xl px-2'
                    type="text"
                    placeholder="Filter your search"
                    onChange={({ target: { value } }) => setSearchValue(value)}
                    value={searchValue}
                />
              </div>
          </div>
          {/*YYYY-MM-DDTHH:mm:ss.sssZ  post.Date.toString() */}
        </Container>
        <Divider className="border-1"/>
          <div className='flex-auto text-center mt-4 gap-4'>
            <Button variant="outlined" className="rounded-xl br-1" onClick={handleFilterBlog('')}>All Articles</Button>
            <Button variant="outlined" className="rounded-xl br-1" onClick={handleFilterBlog('React')}>React.js</Button>
            <Button variant="outlined" className="rounded-xl br-1" onClick={handleFilterBlog('Next.js')}>Next.js</Button>
            <Button variant="outlined" className="rounded-xl br-1" onClick={handleFilterBlog('dotnet')}>dotnet</Button>
            <Button variant="outlined" className="rounded-xl br-1" onClick={handleFilterBlog('Docker')}>Docker</Button>
            <Button variant="outlined" className="rounded-xl br-1" onClick={handleFilterBlog('Angular')}>Angular</Button>
          </div>
          <div>
            <Container>
              <div className='bg-blue-200 text-center mt-4'>      
                <main>
                {blogs.filter(x => x.category === searchValue || searchValue === '').map(
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
                      <div key={slug} role="button" onClick={handleClick(slug)}>
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
                            readingTime={readingTime.text}                            
                        />
                      </div>
                    )
                )}
                </main>
              </div>
            </Container>
          </div>
    </PageTransition>    
  )
}

export function getStaticProps() {
    const blogs = allBlogs.map((blog: Blog) =>
      select(blog, [
        'slug',
        'title',
        'description',
        'publishedAt',
        'readingTime',
        //'author',
        'category',
        'image',
      ])
    )
    // .sort(
    //   (a: any, b: any) =>
    //     Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    // );

    return { props: { blogs } };
}

export default BlogIndex