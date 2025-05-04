// import { NextApiRequest, NextApiResponse } from "next";
// import { MongoClient } from "mongodb";
// import { Article } from "../../../types/article";

// const newListing: any = {
//     "_id": "10057447",
//     "listing_url": "https://www.airbnb.com/rooms/10057447",
//     "name": "Modern Spacious 1 Bedroom Loft",
//     "summary": "Prime location, amazing lighting and no annoying neighbours.  Good place to rent if you want a relaxing time in Montreal.",
//     "property_type": "Apartment",
//     "bedrooms": {"$numberInt":"1"},
//     "bathrooms": {"$numberDecimal":"1.0"},
//     "amenities": ["Internet","Wifi","Kitchen","Heating","Family/kid friendly","Washer","Dryer","Smoke detector","First aid kit","Safety card","Fire extinguisher","Essentials","Shampoo","24-hour check-in","Hangers","Iron","Laptop friendly workspace"],
// };

// async function listDatabases(client: MongoClient){
//     const databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// }

// async function createListing(client: MongoClient, newArticle: any) {
    
//     const result = await client.db("portfolio").collection("articles").insertOne(newArticle);

//     console.log(`New listing created with the following id: ${result.insertedId}`);
// }

// async function findOneListingByName(client: MongoClient, nameOfListing: string) {
//     const result = await client.db("portfolio").collection("articles").findOne({ name: nameOfListing });

//     if (result) {
//         console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
//         console.log(result);
//     } else {
//         console.log(`No listings found with the name '${nameOfListing}'`);
//     }
// }

// async function ArticlesHandler(req: NextApiRequest, res: NextApiResponse) {
//     try {        
//         //Open connection to Mongodb
//         const client: MongoClient = new MongoClient(process.env.MONGODB_URL!);
//         try {
//             // console.log('I have created Mongo client DB!')
//             await client.connect();
        
//             let result: Article[] = []
//             let db = await client.db("Portfolio");
//             const collection = db.collection('Articles') 
//             //Get the array from the cursor
//             const findResult = await collection.find({}).toArray();
//             console.log('articles found from mongodb', findResult);
//             return res.status(200).json(findResult)
//         } catch (e) {
//             console.error(e);
//             throw e;
//         }        
//     } catch (e) {
//         console.log('post error', e);
//         res.status(400).json({ error: (e as Error).message });
//     }
// }
// export default ArticlesHandler;