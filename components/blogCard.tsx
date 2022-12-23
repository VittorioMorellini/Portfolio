import { Blog } from '.contentlayer/generated'
import { Children } from 'react'

export type BlogProps = Blog & {
    children?: any
}

export default function BlogCard(props: BlogProps) {
  
  console.log(props.body)
  //console.log(props.title)
  
  return (
    <>
    <div>
      <h1 style={{fontSize: '22px', fontStyle: 'bold'}}>{props.title}</h1>
      <h2>{props.description}</h2>
      <p>
        {props.publishedAt}
      </p>
      <img alt={props.title} src={props.image} width="100%" loading="lazy" />
      <br />
      <div>
        {/*props.body?.raw*/}
        {props.children}
      </div>
      {/* <div className='post-body p-5 m-auto' dangerouslySetInnerHTML={{ __html: props?.body?.code }}></div>     */}
    </div>
    <br />
    <br />
    </>
  )
}