import { useRouter } from "next/router";
import React from "react";
//import { useNavigate } from "react-router-dom";

interface ProjectItemProps {
    name: string;
    id: number;
    image: any;
}

function ProjectItem({ image, name, id }: ProjectItemProps) {
  const router = useRouter();

  return (
    <div
      className="projectItem"
      onClick={() => {
        router.push("/projects/" + id);
      }}
    >
      <div style={{ backgroundImage: `url(${image})` }} className="bgImage" />
      <h1> {name} </h1>
    </div>
  );
}

export default ProjectItem;