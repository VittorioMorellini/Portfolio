const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://portfolio-vittoriomorellini.vercel.app/';
export const serverDB = dev ? 'S-2020-000002\\SQLEXPRESS' : 'https://portfolio-vittoriomorellini.vercel.app/';