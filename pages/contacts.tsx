import { Container } from "../components/container";
import social from "../public/data/social";

export default function Contacts() {
  return (
    <Container>
      <h1 className="text-4xl font-black">Let's connect!</h1>
      <div className="mt-12">
        Here's a list of things that I like to talk about:
          <ul className="list-disc list-inside mt-6">
            <li>Programming languages, frameworks, and tech stacks</li>
            <li>Dancing salsa</li>
            <li>NFL, NBA, American sports</li>
          </ul>
      </div>
      <p className="mt-6">
        so feel free to reach out on any of the following channels!
      </p>
      <div className="mt-6">
        {social.map(({ name, url, Icon }) => (
          <a
            key={name}
            href={url}
            className="inline-block mr-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="h-6 w-6 hover:text-gray-400" />
          </a>
        ))}
      </div>
    </Container>
  );
}