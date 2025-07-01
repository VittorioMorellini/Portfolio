import { NextApiRequest, NextApiResponse } from "next";
//import { configDB, connString } from "../configDB";
import { server } from "../../../config/config";
import { getPosts } from "lib/postSupport";
import { Post } from "types/post";

async function PostsHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log({server})                
        //require('dotenv').config()
        
        //const posts = await getPosts()
        const posts: Post[] = []
        return res.status(200).json(posts);
    } catch (e) {
        console.log('post error', e);
        res.status(400).json({ error: (e as Error).message });
    }
}
export default PostsHandler;