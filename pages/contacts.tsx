import Link from "next/link";
import { Container } from "../components/container";
import social from "../public/data/social";
import PageTransition from "@/components/pageTransition";
import { motion } from "framer-motion";
import { forwardRef, useRef } from "react";

// interface ContactsProps {
//   ref: IndexPageRef
// }
function Contacts(/*, ref: IndexPageRef*/) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <PageTransition ref={ref}>
      <Container>
        <h1 className="text-4xl font-black">Let&apos;s connect!</h1>
        <div className="mt-12">
          Here&apos;s a list of things that I like to talk about:
            <ul className="list-disc list-inside mt-6">
              <li>Programming languages, frameworks, and tech stacks</li>
              <li>NFL, NBA, American sports</li>
            </ul>
        </div>
        <p className="mt-6">
          so feel free to reach out on any of the following channels!
        </p>
        <div className="mt-6">
          {social.map(({ name, url, Icon }) => (
            <Link
              key={name}
              href={url}
              className="inline-block mr-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}              
              > 
                <Icon className="h-6 w-6 hover:text-gray-400" />
              </motion.div>
            </Link>
          ))}
        </div>
      </Container>
    </PageTransition>
  );
}

export default Contacts