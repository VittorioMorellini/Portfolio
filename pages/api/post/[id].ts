import { NextApiRequest, NextApiResponse } from 'next'
import { Post } from '../../../types/post'
import format from 'date-fns/format';
import Airtable from 'airtable'
import { getPost, getPosts } from 'lib/postSupport';

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
        let post: Post = body as Post;
        console.log('query requests id', id)
        console.log('query requests POST', query)
        console.log('body in api requests POST', body)
        if (id !== undefined && id !== '0') {
            //to Update get vdata from airtable
            console.log('update post: ' + id)
            let record = await getPost(parseInt(id as string))
            console.log('record found', record)
            // await connection.close();
            
            let result = await base.table('Post').update( 
                record.Id.toString(), 
                {
                    "Content": post.Content,
                    "Author": post.Author,
                    "PostDate": format(new Date(), 'yyyy-MM-dd HH:mm:ss')
                }
            )
            return result 
            ? res.status(200).json({Id: parseInt(id as string), PostDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'), Content: post.Content, Author: post.Author })
            : res.status(404).json({ message: `Post with id: ${id} not updated.` })
        }
        else {
            //Insert
            console.log('INSERT post')
            
            let result = await base.table('Post').create( 
                {
                    "Content": post.Content,
                    "Author": post.Author,
                    "PostDate": format(new Date(), 'yyyy-MM-dd HH:mm:ss')
                }
            )        
            return res.status(200).json({Id: parseInt(result.fields["Id"]?.toString()!), Content: result.fields["Content"]?.toString() ?? '', Author: result.fields["Author"]?.toString() ?? '', PostDate: result.fields["Author"]?.toString() ?? ''})
        }
            
    } else if (method === 'DELETE') {
        console.log('sono in api Post DELETE')
        // let result = await connection.promise().execute("DELETE FROM Post where Id = " + id);
        // await connection.close();
        let rv: Post = {Content: '', Id: parseInt(id as string), Author: '', PostDate: format(new Date(new Date().valueOf() + date.getTimezoneOffset()), 'yyyy-MM-dd HH:mm:ss')}; 
        let result = await getPost(parseInt(id as string))
        
        base.table('Post')._destroyRecord(result.Id.toString(), () => {
            //TODO, what???
            console.log('Record deleted');
        })
        return res.status(200).json(rv)
    }
}