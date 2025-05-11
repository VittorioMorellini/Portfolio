import { useRouter } from "next/navigation";
import React from "react";
import { Project } from "types/project";
import ImageLoader from "utils/function";
import { ProjectList } from "../../public/data/projects";
import Image from 'next/image';
import { IndexPageRef } from "types/types";
import PageTransition from "@/components/pageTransition";
import { GetStaticPaths } from "next";

interface ProjectItemProps {
    item: Project,
    ref: IndexPageRef
}

function ProjectItem({ item, ref }: ProjectItemProps) {
  const router = useRouter();
  const {id, skills, image, name, description } = item

  return (
    <PageTransition ref={ref}>
    <div className="text-center h-full w-full">
      <h1>Personal project #{id} - <b>{name}</b></h1>
      <div className="bg-transparent w-full h-96 pt-4 mx-auto md:flex md:justify-center">
        <Image
          loader={ImageLoader}
          unoptimized
          src={image}
          alt={name}          
          width={550}
          //height=""
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
    </PageTransition>  
  );
}
export default ProjectItem;

export async function getStaticPaths() {
    const paths: string[] = ProjectList.map((project: Project) => `/projects/${project.id}`)
    return {
        paths,
        fallback: "blocking",
    }
}
export async function getStaticProps({ params }: { params: { id: string } }) {
    //console.log('I am in static side generation')    
    const id = params.id;
    if (id !== '0') {
        const project = await ProjectList.find(x => x.id.toString() === id)
        return {
            props: {
                //post: JSON.parse(JSON.stringify(result))
                item: project
            },
            revalidate: 3600 // 1 hour,
        }
    } 
}

// export async function getServerSideProps(context: any) {
//   const id = context.params?.id as string;
//   console.log('projects id', id)
//   //const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
//   let item: Project | undefined = ProjectList.find(x => x.id.toString() === id)
//   //const res = data.results;
//   console.log('results data', item)
//   return {
//       props: {
//         item
//       }
//   };
// }