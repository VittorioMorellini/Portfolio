import { Container } from "../../components/container";
import React from "react";
import { ProjectList } from "../../public/data/projects";
import ImageLoader from "../../utils/imageLoader";
import Image from 'next/image';
import Link from "next/link";

function Projects() {
  return (
    //* className="w-full h-auto flex justify-center items-center flex-col"
    <div>
      <h1 className="text-3xl text-center font-bold">My Personal Projects</h1>
      <div className="grid md:grid-cols-2 place-items-center">
        {ProjectList.map((project, idx) => {
          return (
            <div key={idx}
              className="text-center shadow-lg m-10 h-60 w-60 rounded-2xl"
            >
              <div style={{/* backgroundImage: `url(${project.image})` */}} className="w-full h-52 bg-center bg-no-repeat bg-cover rounded-t-2xl">
                <Image
                  loader={ImageLoader}
                  unoptimized
                  src={project.image}
                  alt={project.name}
                  width={300}
                  height={200}
                />
              </div>  
              <div> 
                <Link href={`/projects/${project.id}`} className="hover:text-blue-400 block"><h2 className="text-2xl">{project.name}</h2>
                </Link>                
              </div>
              <h1>{project.skills}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;