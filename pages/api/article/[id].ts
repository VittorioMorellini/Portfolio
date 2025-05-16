import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, WithId } from 'mongodb';
import { Article } from 'types/article';

type ResponseError = {
    message: string
}
export default async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<WithId<Document> | Article | ResponseError>
) {
    const { query, method, body } = req
    const { id } = query
    const client: MongoClient = new MongoClient(process.env.MONGODB_URL!);
    const mongo = require('mongodb');

    if (method === 'GET') {
        console.log('Sono in api requests GET from MongoDB')
        if (id !== '0') {
            await client.connect();
            let db = await client.db("Portfolio");
            const collection = db.collection('Articles')
            // console.log('collection', collection)
            const nid = new mongo.ObjectId(id)
            const result = await collection.findOne({ _id: nid });
            // console.log('result mongoDB detail', result)
            let article: WithId<Document> = result as WithId<Document>

            await client.close();
            return article
            ? res.status(200).json(article)
            : res.status(404).json({ message: `Article with id: ${id} not found.` })
        }
    } else if (method === 'POST') {
        //debugger;
        let article: Article = body as Article;
        console.log('query requests id', id)
        console.log('body in api requests article', body)
        if (id !== undefined && id !== '0') {
            //Update MongoDB
            console.log('update article: ' + id)
            //let record = await getArticle(id as string)
            await client.connect();
            let db = await client.db("Portfolio");
            const collection = db.collection('Articles')
            // console.log('collection', collection)
            //var mongo = require('mongodb');
            const nid = new mongo.ObjectId(id)
            const filter = { _id: nid };
            // update the value of the 'quantity' field to 5
            const updateDocument = {
                $set: {
                    description: article.description,
                    name: article.name,
                },
            };
            const result = await collection.updateOne(filter, updateDocument);
            await client.close();

            return result 
            ? res.status(200).json({_id: new mongo.ObjectId(id), name: '', description: article.description, summary: '', listing_url: '', property_type: '', bedrooms: {}, bathrooms: {}, amenities: []})
            : res.status(404).json({ message: `Post with id: ${id} not updated.` })
        }
        else {
            //Insert
            console.log('INSERT article')
            
            await client.connect();
            let db = await client.db("Portfolio");
            const collection = db.collection('Articles')
            // update the value of the 'quantity' field to 5
            let articleNew = {
                _id: new mongo.ObjectId(null), 
                name: article.name, description: article.description, summary: '', listing_url: '', property_type: '', bedrooms: {}, bathrooms: {}, amenities: []
            };
            const result = await collection.insertOne(articleNew);
            await client.close();
            
            return res.status(200).json(articleNew)
        }
            
    } else if (method === 'DELETE') {
        console.log('Delete Article with Id ' + id)
        try {
            const database = client.db("Portfolio");
            const movies = database.collection("Articles");
            /* Delete the first document in the "movies" collection that matches
            the specified query document */
            const query = { _id: new mongo.ObjectId(id) };
            const result = await movies.deleteOne(query);
            
            /* Print a message that indicates whether the operation deleted a document */
            if (result.deletedCount === 1) {
                console.log("Successfully deleted one document.");
            } else {
                console.log("No documents matched the query. Deleted 0 documents.");
            }
        } finally {
            // Close the connection after the operation completes
            await client.close();
        }        
    }
}