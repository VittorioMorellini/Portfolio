import { NextApiRequest, NextApiResponse } from "next";
//import { configDB, connString } from "../configDB";
import { server } from "../../../config/config";
import Airtable from 'airtable'

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
        
        //Open in Airtable
        //console.log(process.env.AIRTABLE_API_KEY)
        //console.log('open airtable')
        const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app5UjZ5ccq0THcIi')
        const result = await base('Post').select({
    
        }).all()
    
        //console.log('post found', result);
        //return res.status(200).json(result);
        const posts = result.map(record => {
            return {Id: record.id, ...record.fields }
        })
        return res.status(200).json(posts);

    } catch (e) {
        console.log('post error', e);
        res.status(400).json({ error: (e as Error).message });
    }
}

export default PostsHandler;