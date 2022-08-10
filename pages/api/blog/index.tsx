import { NextApiRequest, NextApiResponse } from "next";
//import NextCors from "nextjs-cors";
import sql, { ConnectionPool } from 'mssql';
import { configDB } from "../configDB";


async function PostsHandler(req: NextApiRequest, res: NextApiResponse) {
    //   await NextCors(req, res, {
    //     methods: ["GET", "POST"],
    //     origin: "*",
    //     optionsSuccessStatus: 200,
    //   });
    console.log('sono in api blog Next requests')
    //const { query } = req.body as { query: string };
    try {
        let pool = await new ConnectionPool(configDB).connect()
        let result = await pool.request().query("select * from Post")
        await pool.close();
        
        console.log('post found', result);
        return res.status(200).json(result.recordset);

    } catch (e) {
        res.status(400).json({ error: (e as Error).message });
    }
}

export default PostsHandler;