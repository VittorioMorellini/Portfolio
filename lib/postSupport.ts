import Airtable from "airtable";
import { Post } from "types/post";

export async function getPosts() {
    // Open Airtable connection 
    // console.log(process.env.AIRTABLE_TOKEN)
    // console.log('open airtable')
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app5UjZ5ccq0THcIi')
    let results: Post[] = []
    let response = await base('Post').select().all()
    console.log('Total response:', response);
    response.forEach((result, index) => { 
        //results.push(record.fields as Post)));
        console.log('record fields', result.fields)
        console.log('record fields Id', result.fields.Id)
        let post = {Id: parseInt(result.fields.Id as string), ...result.fields}
        
        results.push(post as Post)
    })

    return results;
}

export async function getPost(id: number) {
    //const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base('app5UjZ5ccq0THcIi')
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app5UjZ5ccq0THcIi')
    let result = await base('Post').select({
        filterByFormula: '{Id} = ' + id
    }).all()
    console.log('Data fetched json() in server side props api id blog SSR', result)
    return {Id: parseInt(result[0].id), ...result[0].fields}
}

