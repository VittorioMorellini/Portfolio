import { NextApiRequest, NextApiResponse } from "next";
import { configDB, connString } from "../configDB";
import { server } from "../../../config/config";

async function PostsHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log({server})
        //let filename =  server + '/data/Portfolio.mdb';
        //console.log(filename)
        //const ADODB = require('node-adodb');
        //const connection = ADODB.open(connString);
        //Open in Sql server
        //let pool = await new ConnectionPool(configDB).connect()
        //let result = await pool.request().query("SELECT * FROM Post Order by PostDate")
        //await pool.close();
        require('dotenv').config()
        const mysql = require('mysql2')
        const connection = mysql.createConnection(process.env.DATABASE_URL)
        console.log('Connected to PlanetScale!')
        // open the query
        const result = await connection.promise().query('SELECT * FROM Post Order by PostDate');

        console.log('post found', result);
        //let data = res.status(200).json(result[0]);
        //console.log('data found', data);

        //return res.status(200).json(result);
        return res.status(200).json(result[0]);

    } catch (e) {
        console.log('post error', e);
        res.status(400).json({ error: (e as Error).message });
    }
}

export default PostsHandler;