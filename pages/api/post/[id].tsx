import { NextApiRequest, NextApiResponse } from 'next'
import { Post } from '../../../types/post'
//import { configDB, connString } from '../configDB';
import format from 'date-fns/format';

import Airtable from 'airtable'

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
    console.log('querystring ', query)
    require('dotenv').config()
    // Open mysql connection for planetscale
    // const mysql = require('mysql2')
    // const connection = mysql.createConnection(process.env.DATABASE_URL)
    // console.log('Connected to PlanetScale!')

    // Open Airtable connection 
    console.log(process.env.AIRTABLE_API_KEY)
    console.log('open airtable')
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app5UjZ5ccq0THcIi')
    //var table = base.table('Post')
    
    if (method === 'GET') {
        console.log('sono in api requests GET')
        if (id !== '0') {
            //let result = await connection.promise().query("select * from Post where Id = " + id);
            // return result && result[0]
            // ? res.status(200).json(result[0][0])
            // : res.status(404).json({ message: `Post with id: ${id} not found.` })
            
            let result = await base('Post').select({
                filterByFormula: '{Id} = ' + id
            }).all();
            const post = {Id: parseInt(result[0].id), ...result[0].fields}
            console.log('result fetched airtable: ', post)
            
            return result 
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
            let record = await base('Post').select({
                filterByFormula: '{Id} = ' + id
            }).all();
            console.log('record found', record[0])
            // let s: string = "Update Post SET Content = ?, Author = ?, PostDate = '" + format(new Date(), 'yyyy-MM-dd HH:mm:ss') + "' where Id = " + id;
            // //console.log('create the query update', s)            
            // let result = await connection.promise()
            // .execute(s, [post.Content, post.Author]);
            // console.log('I have executed the update query', result)
            // await connection.close();
            
            // return result 
            // ? res.status(200).json({Id: parseInt(id as string), PostDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'), Content: post.Content, Author: post.Author })
            // : res.status(404).json({ message: `Post with id: ${id} not updated.` })
            let result = await base.table('Post').update( 
                record[0].id, 
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
            // let s: string = "INSERT INTO Post (Author, Content, PostDate)"
            //     s += " VALUES (?, ?, '" + format(new Date(), 'yyyy-MM-dd HH:mm:ss') + "')";
            // console.log('create the query insert', s)
            // let result = await connection
            // .promise().execute(s, [post.Author, post.Content]);
            // console.log('I have executed the insert query', result)
            // await connection.close();
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
        //console.log('sono in api requests DELETE')
        let rv: Post = {Content: '', Id: parseInt(id as string), Author: '', PostDate: format(new Date(new Date().valueOf() + date.getTimezoneOffset()), 'yyyy-MM-dd HH:mm:ss')}; 
        // let result = await connection.promise().execute("DELETE FROM Post where Id = " + id);
        // await connection.close();
        let result = await base('Post').select({
            filterByFormula: '{Id} = ' + id
        }).all();
        
        await base.table('Post')._destroyRecord(result[0].id, () => {
            //TODO, waht???
        });
        return res.status(200).json(rv)
    }
}