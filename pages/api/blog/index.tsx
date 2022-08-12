import { NextApiRequest, NextApiResponse } from "next";
import sql, { ConnectionPool } from 'mssql';
import { configDB } from "../configDB";


async function PostsHandler(req: NextApiRequest, res: NextApiResponse) {
    //   await NextCors(req, res, {
    //     methods: ["GET", "POST"],
    //     origin: "*",
    //     optionsSuccessStatus: 200,
    //   });
    try {
        let pool = await new ConnectionPool(configDB).connect()
        let result = await pool.request().query("SELECT * FROM Post Order by Date")
        await pool.close();
        
        console.log('post found', result);
        return res.status(200).json(result.recordset);

    } catch (e) {
        res.status(400).json({ error: (e as Error).message });
    }
}

export default PostsHandler;