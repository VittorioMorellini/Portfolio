import { Category } from "../../types/category";

export const categories: Category[] = [
    {
      id: 1,
      name: 'Home',
      url: '/',
      description: 'Home',
      title: 'Home',
      external: false
    },
    {
      id: 2,
      name: 'Personal',
      url: '/projects',
      description: 'Personal',
      title: 'Personal projects',
      external: false
    },
    {
      id: 3,
      name: 'Experience',
      url: '/experience',
      description: 'Experience',
      title: 'Experience',
      external: false
    },
    {
      id: 4,
      name: 'Blog',
      url: '/blog',
      description: 'Blog',
      title: 'Blog',
      external: false
    },
    {
      id: 5,
      name: 'Articles',
      url: '/article',
      description: 'Articles',
      title: 'Articles',
      external: false
    },
    {
      id: 6,
      name: 'Pokemon',
      url: '/pokemons',
      description: 'Pokemon',
      title: 'Pokemon',
      external: false
    },
    {
      id: 7,
      name: 'Resume',
      url: '/static/Resume.pdf',
      description: 'Resume',
      title: 'Resume',
      external: true
    },
    {
      id: 8,
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