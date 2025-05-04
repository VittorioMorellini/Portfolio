import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, WithId } from 'mongodb';

type ResponseError = {
    message: string
}
export default async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<WithId<Document> | ResponseError>
) {
    const { query, method, body } = req
    const { id } = query
    const client: MongoClient = new MongoClient(process.env.MONGODB_URL!);

    if (method === 'GET') {
        console.log('Sono in api requests GET from MongoDB')
        if (id !== '0') {
            await client.connect();
            let db = await client.db("Portfolio");
            const collection = db.collection('Articles')
            // console.log('collection', collection)
            var mongo = require('mongodb');
            const nid = new mongo.ObjectId(id)
            const result = await collection.findOne({ _id: nid });
            // console.log('result mongoDB detail', result)
            let article: WithId<Document> = result as WithId<Document>
            return article
            ? res.status(200).json(article)
            : res.status(404).json({ message: `Article with id: ${id} not found.` })
        }
    }
}