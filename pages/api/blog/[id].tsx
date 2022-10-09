import { NextApiRequest, NextApiResponse } from 'next'
import { Post } from '../../../types/post'
import sql from 'mssql';
import { configDB, connString } from '../configDB';
import format from 'date-fns/format';
import { VarChar } from 'mssql';

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
    console.log('querystring ', query)
    require('dotenv').config()
    const mysql = require('mysql2')
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    console.log('Connected to PlanetScale!')

    if (method === 'GET') {
        console.log('sono in api requests GET')
        if (id !== '0') {
            //let pool = await new ConnectionPool(configDB).connect()
            console.log('Apro una connection verso access con id ', id)
            let result = await connection.promise().query("select * from Post where Id = " + id);
            console.log('result fetched ', result[0])
            console.log('result fetched [0]', result[0]);
            
            return result && result[0]
            ? res.status(200).json(result[0][0])
            : res.status(404).json({ message: `Post with id: ${id} not found.` })
        }
        else {
            let result: Post = {Content: '', Id: 0, Author: '', PostDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')}                    
            return res.status(200).json(result)
        }
    } else if (method === 'POST') {
        //let post: Partial<{[key: string]: string | string[]}> = body;
        debugger;
        let post: Post = body as Post;
        console.log('query requests id', id)
        console.log('query requests POST', query)
        console.log('body in api requests POST', body)
        if (id !== undefined && id !== '0') {
            //Update
            console.log('update post')
            
            let s: string = "Update Post SET Content = '" + post.Content + "', Author = '" + post.Author + "', PostDate = '" + format(new Date(), 'yyyy-MM-dd HH:mm:ss') + "' where Id = " + id;
            //let s: string = "Update Post SET Content = @content, Author = @author, PostDate = '" + format(new Date(), 'yyyy-MM-dd HH:mm:ss') + "' where Id = " + id;
            //let s: string = "UPDATE Post SET ? WHERE ?"; 
            console.log('create the query update', s)
            
            let result = await connection.promise()
            //.input("content", sql.VarChar(8000), post.Content)   // Parameter for input in Sql they works, not in Access
            //.input("author", sql.VarChar(100), post.Author)
            .execute(s);
            console.log('I have executed the update query', result)
            //await connection.close();
            
            return result 
            ? res.status(200).json({Id: parseInt(id as string), PostDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'), Content: post.Content, Author: post.Author })
            : res.status(404).json({ message: `Post with id: ${id} not updated.` })
        }
        else {
            //Insert
            console.log('INSERT post')
            let s: string = "INSERT INTO Post (Author, Content, PostDate)"
                s += " VALUES ('" + post.Author + "','" + post.Content + "', '" + format(new Date(), 'yyyy-MM-dd HH:mm:ss') + "')";
            console.log('create the query insert', s)
            let result = await connection
            //.input("content", sql.NVarChar(8000), post.Content)
            //.input("author", sql.VarChar(100), post.Author)
            .promise().execute(s);
            console.log('I have executed the insert query', result)
            await connection.close();
            
            return res.status(200).json(post);
            //: res.status(404).json({ message: `User with id: ${id} not found.` })
        }
    } else if (method === 'PUT') {
        console.log('sono in api requests PUT')
        //TODO
        
    } else if (method === 'DELETE') {
        console.log('sono in api requests DELETE')
        
        let result = await connection.execute(
            "DELETE FROM Post where Id = " + id
        );
        await connection.close();
        let item: Post = {Content: '', Id: parseInt(id as string), Author: '', PostDate: format(new Date(new Date().valueOf() + date.getTimezoneOffset()), 'yyyy-MM-dd HH:mm:ss')}
                    
        return res.status(200).json(item)
    }
}