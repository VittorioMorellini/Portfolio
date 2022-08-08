import { Category } from "../../types/category";

export const categories: Category[] = [
    {
      id: 1,
      name: 'Career',
      url: '/',
      description: 'Home',
      title: 'Career',
      external: false
    },
    // {
    //   id: 2,
    //   name: 'Characters',
    //   url: '/characters',
    //   description: 'Characters',
    //   title: 'Characters',
    //   external: false
    // },
    {
      id: 2,
      name: 'Blog',
      url: '/blog',
      description: 'Blog',
      title: 'Blog',
      external: false
    },
    {
      id: 4,
      name: 'Pokemon',
      url: '/pokemons',
      description: 'Pokemon',
      title: 'Pokemon',
      external: false
    },
    {
      id: 5,
      name: 'Resume',
      url: '/static/resume.pdf',
      description: 'Resume',
      title: 'Resume',
      external: true
    },
    {
      id: 6,
      name: 'Contacts',
      url: '/contacts',
      description: 'Contacts',
      title: 'Contacts',
      external: false
    },
    // {
    //   id: 6,
    //   name: 'Todo',
    //   url: '/todos',
    //   description: 'Todo',
    //   title: 'Todo'
    // },
    // {
    //   id: 7,
    //   name: 'Meme',
    //   url: '/memes',
    //   description: 'Meme',
    //   title: 'Meme'
    // }
]