import dateFns, { format } from "date-fns"

export class Post {
    //UserId: number | null;
    Id: number;
    Content: string;
    PostDate: string;
    Author: string;

    constructor(id: number, text: string, date: string, author: string) {
        //this.UserId = userId;
        this.Id = id;
        this.Content = text;
        this.Author = author;
        this.PostDate = date;
    }    
}

