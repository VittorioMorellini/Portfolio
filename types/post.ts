import dateFns, { format } from "date-fns"

export class Post {
    UserId: number | null;
    ID: number;
    Content: string;
    PostDate: string;
    Author: string;

    constructor(userId: number | null, id: number, text: string, date: string, author: string) {
        this.UserId = userId;
        this.ID = id;
        this.Content = text;
        this.Author = author;
        this.PostDate = date;
    }    
}

