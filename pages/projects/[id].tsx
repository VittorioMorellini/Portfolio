import { useRouter } from "next/router";
import React from "react";
import { Project } from "types/project";
import ImageLoader from "utils/function";
import { ProjectList } from "../../public/data/projects";
import Image from 'next/image';

interface ProjectItemProps {
    item: Project;
}

function ProjectItem({ item }: ProjectItemProps) {
  const router = useRouter();
  const {id, skills, image, name, description } = item

  return (
    <div
      className="text-center h-full w-full"
    >
      <h1>Personal project #{id} - <b>{name}</b></h1>
      <div className="bg-transparent w-full h-96 pt-4 mx-auto">
        <Image
          loader={ImageLoader}
          unoptimized
          src={image}
          alt={name}
          width={400}
          height={300}
        />
      </div>
      <div className="pt-4">
        <h1 className="text-2xl"> {name} </h1>
      </div>
      <div>
        {skills}
      </div>
      <div className="pt-4">
        {description}
      </div>
    </div>
  );
}

export default ProjectItem;

export async function getServerSideProps(context: any) {
  const id = context.params?.id as string;
  console.log('projects id', id)
  //const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  let item: Project | undefined = ProjectList.find(x => x.id.toString() === id)
  //const res = data.results;
  console.log('results data', item)
  return {
      props: {
        item
      }
  };
}