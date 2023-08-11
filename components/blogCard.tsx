import { Blog } from '.contentlayer/generated'
import { Children } from 'react'
import ImageLoader from "../utils/function";
import Image from 'next/image';
import { motion } from 'framer-motion';

export type BlogProps = Blog & {
    children?: any
}

export default function BlogCard(props: BlogProps) {
    
  return (
    <>
      <div className="grid justify-center mx-auto gap-x-16 py-16 md:grid-cols-2">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Image
            loader={ImageLoader}
            unoptimized
            src={props.image && props.image !== '' ? props.image : '../images/proj1.jpg'}
            alt={props.title}
            width={450}
            height={350}
          />
        </motion.div>
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