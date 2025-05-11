import { MongoClient, WithId } from "mongodb";
import { Article } from "types/article";

export async function getArticles() {
    // Open MongoDB connection 
    
    const client: MongoClient = new MongoClient(process.env.MONGODB_URL!);
    let results: Article[] = []
    await client.connect();
    
    let db = await client.db("Portfolio");
    const collection = db.collection('Articles') 
    const findResult = await collection.find({}).toArray();
    
    console.log('Total response:', findResult);
    findResult.forEach((result, index) => { 
        let article: Article = {_id: result["_id"].toString(), 
            name: result["name"].toString(), 
            description: result["description"].toString(),
            summary: '', //result["summary"]?.toString(), 
            listing_url: '', //result["listing_url"]?.toString(),
            property_type: '', //result["property_type"]?.toString(),
            bedrooms: {}, //result["bedrooms"],
            bathrooms: {}, //result["bathrooms"],
            amenities: [], //result["amenities"],
        };
        //cicle
        // await collection.find().forEach(art => {
        //     console.log('Article from Mongodb', art)
        //     let article: Article = {Id: '', Name: '', Summary: '', ListingUrl: ''};
        //     article.Id = art._id.toString();
        //     article.Name = art.name;
        //     article.Summary = art.summary;
        //     result.push(article)
        // });
        results.push(article)
    })
    return results;
}

export async function getArticle(id: string): Promise<Article> {
    // Open MongoDB connection     
    const client: MongoClient = new MongoClient(process.env.MONGODB_URL!);
    await client.connect();
    if (id !== '0') {
        console.log('I am in getArticle', id)
        var mongo = require('mongodb');
        let db = await client.db("Portfolio");
        const collection = db.collection('Articles') 
        const result = await collection.findOne({
            _id: new mongo.ObjectId(id)
        });        
        console.log('single article:', result);
        if (result) {
            let article: Article = {_id: result["_id"].toString(), 
                name: result["name"].toString(), 
                description: result["description"].toString(),
                summary: '', //result["summary"]?.toString(), 
                listing_url: '', //result["listing_url"]?.toString(),
                property_type: '', //result["property_type"]?.toString(),
                bedrooms: {}, //result["bedrooms"],
                bathrooms: {}, //result["bathrooms"],
                amenities: [], //result["amenities"],
            };
            return article;
        }
        let article: Article = {_id: '0', 
            name: '', 
            description: '',
            summary: '', //result["summary"]?.toString(), 
            listing_url: '', //result["listing_url"]?.toString(),
            property_type: '', //result["property_type"]?.toString(),
            bedrooms: {}, //result["bedrooms"],
            bathrooms: {}, //result["bathrooms"],
            amenities: [], //result["amenities"],
        };
        return article;
    } else {
        let article: Article = {_id: '0', 
            name: '', 
            description: '',
            summary: '', //result["summary"]?.toString(), 
            listing_url: '', //result["listing_url"]?.toString(),
            property_type: '', //result["property_type"]?.toString(),
            bedrooms: {}, //result["bedrooms"],
            bathrooms: {}, //result["bathrooms"],
            amenities: [], //result["amenities"],
        };
        return article;
    }
}
