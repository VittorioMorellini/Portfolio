import { StaticImageData } from "next/image";

export interface Project {
    id: number,
    name: string,
    skills: string,
    image: StaticImageData,
    description: string
}