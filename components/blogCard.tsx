import { Blog } from '.contentlayer/generated'
import { Children } from 'react'
import ImageLoader from "../utils/imageLoader";
import Image from 'next/image';
import Proj4 from "../public/images/proj3.jpg";

export type BlogProps = Blog & {
    children?: any
}

export default function BlogCard(props: BlogProps) {
  
  console.log(props.body)
  //console.log(props.title)
  
  return (
    <>
    <div className="flex flex-col items-center mx-auto">
      <h1 style={{fontSize: '22px', fontStyle: 'bold'}}>{props.title}</h1>
      <h2>{props.description}</h2>
      <p>
        {props.publishedAt}
      </p>
      <div>
        {/* <img alt={props.title} src={props.image} width="100%" loading="lazy" /> */}
        <Image
          loader={ImageLoader}
          unoptimized
          src={props.image && props.image !== '' ? props.image : '../images/proj1.jpg'}
          alt={props.title}
          width="300px"
          height="300px"
        />
      </div>
      <br />
      <div>
        {props.children}
      </div>
      {/* <div>
        {props.body?.raw}
      </div> */}
      {/* <div className='post-body p-5 m-auto' dangerouslySetInnerHTML={{ __html: props?.body?.code }}></div>     */}
    </div>
    <br />
    <br />
    </>
  )
}