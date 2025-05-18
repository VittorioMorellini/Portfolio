import { NextApiRequest, NextApiResponse } from 'next'
import { Post } from '../../../types/post'
import format from 'date-fns/format';
import Airtable, { FieldSet } from 'airtable'
import { getPost, getPostRecordFields, getPosts } from 'lib/postSupport';

type ResponseError = {
    message: string
}

export default async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<Post | ResponseError>
) {
    //debugger;
    const date = new Date()
    const { query, method, body } = req
    const { id } = query
    require('dotenv').config()
    
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app5UjZ5ccq0THcIi')    
    if (method === 'GET') {
        console.log('sono in api requests GET')
        if (id !== '0') {            
            const post = await getPost(parseInt(id as string))
            console.log('result fetched airtable: ', post)
            
            return post 
            ? res.status(200).json(post as Post)
            : res.status(404).json({ message: `Post with id: ${id} not found.` })
        }
        else {
            let result: Post = {Content: '', Id: 0, Author: '', PostDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')}                    
            return res.status(200).json(result)
        }
    } else if (method === 'POST') {
        //debugger;
        //let result: Record<FieldSet> | undefined = undefined
        let result: boolean = false
        let post: Post = body as Post;
        console.log('query requests id', id)
        //console.log('query requests POST', query)
        //console.log('body in api requests POST', body)
        console.log('body converted in post in api requests POST', post)
        if (id !== undefined && id !== '0') {
            //to Update get vdata from airtable
            console.log('update post: ' + id)
            //let record = await getPost(parseInt(id as string))
            let resultAir = await getPostRecordFields(parseInt(id as string))
            //console.log('record found', record)
            console.log('resultAir found', resultAir)
            console.log('resultAir found id', resultAir._rawJson.id)
            //Update Airtable
            try {
                //let idRecord = record.Id.toString()
                console.log('idRecord', id)
                let result = await base.table('Post').update(
                resultAir._rawJson.id, 
                {
                    "Content": post.Content,
                    "Author": post.Author,
                    "PostDate": format(new Date(), 'yyyy-MM-dd HH:mm:ss')
                })
            } catch(err) {
                console.error('Error updating record:', err);
                throw err;
            };

            return result 
            ? res.status(200).json({Id: parseInt(id as string), PostDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'), Content: post.Content, Author: post.Author })
            : res.status(404).json({ message: `Post with id: ${id} not updated.` })
        }
        else {
            //Insert
            console.log('INSERT new post')            
            let result = await base.table('Post').create( 
                {
                    "Content": post.Content,
                    "Author": post.Author,
                    "PostDate": format(new Date(), 'yyyy-MM-dd HH:mm:ss')
                }
            )        
            return res.status(200).json({Id: parseInt(result.fields["Id"]?.toString()!), Content: result.fields["Content"]?.toString() ?? '', Author: result.fields["Author"]?.toString() ?? '', PostDate: result.fields["PostDate"]?.toString() ?? ''})
        }
            
    } else if (method === 'DELETE') {
        console.log('sono in Api Post DELETE with id: ', id)
        let recordAirtable = await getPostRecordFields(parseInt(id as string))        
        try {
            const idRecord = id as string
            console.log('idRecord', idRecord)
            let result = await base.table('Post').destroy(recordAirtable._rawJson.id)
            console.log('Deleted record id:', id);
        } catch(error) {
            console.error('Error deleting record:', error);
            throw error;
        };
        
        return res.status(200).json(recordAirtable.fields as Post)
    }
}