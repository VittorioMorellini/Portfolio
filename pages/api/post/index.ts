import { NextApiRequest, NextApiResponse } from "next";
//import { configDB, connString } from "../configDB";
import { server } from "../../../config/config";
import Airtable from 'airtable'
import { getPosts } from "lib/postSupport";

async function PostsHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log({server})                
        require('dotenv').config()
        
        //Open in mySql
        // const mysql = require('mysql2')
        // const connection = mysql.createConnection(process.env.DATABASE_URL)
        // console.log('Connected to PlanetScale!')
        //Open the query
        //const result = await connection.promise().query('SELECT * FROM Post Order by PostDate');
            
        const posts = await getPosts()
        return res.status(200).json(posts);

    } catch (e) {
        console.log('post error', e);
        res.status(400).json({ error: (e as Error).message });
    }
}
export default PostsHandler;