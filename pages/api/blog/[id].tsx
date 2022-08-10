import { NextApiRequest, NextApiResponse } from 'next'
import { Post } from '../../../types/post'
import sql, { ConnectionPool } from 'mssql';
import { configDB } from '../configDB';
import { PostAdd } from '@mui/icons-material';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

type ResponseError = {
    message: string
}

export default async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<Post | ResponseError>
) {
    debugger;
    const date = new Date()
    const { query, method, body } = req
    const { id } = query

    if (method === 'GET') {
        console.log('sono in api requests GET')
        if (id !== '0') {
            let pool = await new ConnectionPool(configDB).connect()
            let result = await pool.request().query("select * from Post where Id = " + id);
            await pool.close();
            console.log('result fetched ', result)
            console.log('result fetched [0]', result.recordset[0]);
            
            return result 
            ? res.status(200).json(result.recordset[0])
            : res.status(404).json({ message: `User with id: ${id} not found.` })
        }
        else {
            let result: Post = {UserId: null, Text: '', Id: 0, Author: '', Date: format(new Date(new Date().valueOf() + date.getTimezoneOffset()), 'yyyy-MM-dd HH:mm:ss')}
                    
            return res.status(200).json(result)
            //: res.status(404).json({ message: `User with id: ${id} not found.` })
        }
    } else if (method === 'POST') {
        //let post: Partial<{[key: string]: string | string[]}> = body;
        let post: Post = body as Post;
        console.log('query requests POST', query)
        console.log('body in api requests POST', body)
        if (id !== '0') {
            //Update
            console.log('update post')
            let pool = await new ConnectionPool(configDB).connect()
            let s: string = "Update Post set Text = '" + post.Text + "', Author = '" + post.Author + "', Date = '" + format(new Date(), 'yyyy-MM-dd HH:mm:ss') + "' where Id = " + post.Id;
            console.log('create the query update', s)
            let result = await pool.request().query(s);
            console.log('I have executed the update query', result)
            await pool.close();
            
            return result 
            ? res.status(200).json({Id: parseInt(id as string), Date: post.Date, Text: post.Text, Author: post.Author, UserId: null })
            : res.status(404).json({ message: `Post with id: ${id} not updated.` })
        }
        else {
            //Insert
            //let newPost: Post = {UserId: null, Text: post.Text, Id: 0, Author: post.Author, PostDate: new Date()}                    
            console.log('INSERT post')
            let pool = await new ConnectionPool(configDB).connect()
            let s: string = "INSERT INTO Post (Author, Text, Date, UserId)"
                s += " VALUES ('" + post.Author + "', '" + post.Text + "', '" + format(new Date(), 'yyyy-MM-dd HH:mm:ss') + "', NULL)";
            console.log('create the query insert', s)
            let result = await pool.request().query(s);
            console.log('I have executed the insert query', result)
            await pool.close();
            //console.log('result fetched ', result)
            //console.log('result fetched [0]', result.recordset[0]);
            
            return res.status(200).json(post);
            //: res.status(404).json({ message: `User with id: ${id} not found.` })
        }
    } else if (method === 'PUT') {
        console.log('sono in api requests PUT')
    } else if (method === 'DELETE') {
        console.log('sono in api requests DELETE')
    }
}