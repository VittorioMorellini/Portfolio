import { Container } from "../../components/container";
import React from "react";
import { ProjectList } from "../../public/data/projects";
import ImageLoader from "../../utils/imageLoader";
import Image from 'next/image';
import Link from "next/link";

function Projects() {
  return (
    <Container>
    <div className="w-full h-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center font-bold"> My Personal Projects</h1>
      <div className="h-auto grid md:grid-cols-2 place-items-center" style={{width: '70vw'}}>
        {ProjectList.map((project, idx) => {
          return (
            <div key={idx}
              className="text-center shadow-lg m-10 h-72 w-72 rounded-2xl"
            >
              <div style={{/* backgroundImage: `url(${project.image})` */}} className="w-full h-52 bg-center bg-no-repeat bg-cover rounded-t-2xl">
                <Image
                  loader={ImageLoader}
                  unoptimized
                  src={project.image}
                  alt={project.name}
                  width="300px"
                  height="200px"
                />
              </div>  
              <div> 
                <Link href={`/projects/${project.id}`}>
                  <a className="hover:text-blue-400"><h1 className="text-2xl">{project.name} </h1></a>
                </Link>                
              </div>
              <h1>{project.skills}</h1>
            </div>
          );
        })}
      </div>
    </div>
    </Container>
  );
}

export default Projects;