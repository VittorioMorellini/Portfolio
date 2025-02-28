import { NextApiRequest, NextApiResponse } from 'next'
import { Post } from '../../../types/post'
import { configDB, connString } from '../configDB';
import format from 'date-fns/format';
import { VarChar } from 'mssql';
import { MongoClient, WithId } from 'mongodb';
import { Article } from '../../../types/article';

type ResponseError = {
    message: string
}

export default async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<WithId<Document> | ResponseError>
) {
    //debugger;
    const date = new Date()
    const { query, method, body } = req
    const { id } = query
    console.log('querystring ', query)
    //Open mysql connection
    require('dotenv').config()
    const client: MongoClient = new MongoClient(process.env.MONGODB_URL!);
    console.log('Connected to Mongo DB!')

    if (method === 'GET') {
        console.log('sono in api requests GET')
        if (id !== '0') {
            await client.connect();
            console.log('Connected to Mongo DB!')
            //console.log('Apro una connection verso access con id ', id)
            let db = await client.db("portfolio");
            const collection = db.collection('articles')
            const result = await collection.findOne({ _id: id });
            let article: WithId<Document> = result as WithId<Document>
            return article
            ? res.status(200).json(article)
            : res.status(404).json({ message: `Article with id: ${id} not found.` })
        }
    }
}