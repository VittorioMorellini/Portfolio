import React, { forwardRef, useMemo } from 'react'
import { motion, HTMLMotionProps, useScroll } from 'framer-motion'

type PageTransitionProps = HTMLMotionProps<'div'> & { allowScroll?: boolean}
//type PageTransitionRef = React.ForwardedRef<HTMLDivElement>

function PageTransition({ children, allowScroll, ...rest }: PageTransitionProps, ref: React.ForwardedRef<HTMLDivElement>) {
	const onTheRight = { x: '1920px' }
	const inTheCenter = { x: 0 }
	const onTheLeft = { x: '-1920px' }
	const transition = { duration: 0.6, ease: 'easeInOut' }
	const { scrollYProgress } = useScroll();
	
	return (
		<>
		{allowScroll && 
			<motion.div
				className='fixed top-0 left-0 right-0 h-2.5 bg-gradient-to-tr from-blue-200 to-blue-600 origin-[0%]'
				style={{ scaleX: scrollYProgress }} 
			/>
		}
		<motion.div
			ref={ref}
			initial={onTheRight}
			animate={inTheCenter}
			exit={onTheLeft}
			transition={transition}
			{...rest}
		>
			{children}
		</motion.div>
		</>
	)
}

export default forwardRef(PageTransition)