import { Blog } from '.contentlayer/generated'
import { Children } from 'react'
import ImageLoader from "../utils/imageLoader";
import Image from 'next/image';
import Proj4 from "../public/images/proj3.jpg";

export type BlogProps = Blog & {
    children?: any
}

export default function BlogCard(props: BlogProps) {
    
  return (
    <>
      <div className="flex flex-row justify-center mx-auto gap-x-16 py-16">
        <div>
          <Image
            loader={ImageLoader}
            unoptimized
            src={props.image && props.image !== '' ? props.image : '../images/proj1.jpg'}
            alt={props.title}
            width="450px"
            height="350px"
          />
        </div>
        <div className="flex flex-col place-content-center">
          <div>
            <h1 style={{fontSize: '22px', fontStyle: 'bold'}}>{props.title}</h1>
          </div>
          <div>
            <p>
              Published at: {props.publishedAt}
            </p>
            <h4>{props.description}</h4>
          </div>
        </div>
      </div>
    </>
  )
}