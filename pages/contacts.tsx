import Link from "next/link";
import { Container } from "../components/container";
import social from "../public/data/social";
import PageTransition from "@/components/pageTransition";
import { IndexPageRef } from "types/types";

interface ContactsProps {
  ref: IndexPageRef
}

export default function Contacts({ref}: ContactsProps) {
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
              <Icon className="h-6 w-6 hover:text-gray-400" />
            </Link>
          ))}
        </div>
      </Container>
    </PageTransition>
  );
}