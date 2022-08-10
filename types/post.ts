import dateFns, { format } from "date-fns"

export class Post {
    UserId: number | null;
    Id: number;
    Text: string;
    Date: string;
    Author: string;

    constructor(userId: number | null, id: number, text: string, date: string, author: string) {
        this.UserId = userId;
        this.Id = id;
        this.Text = text;
        this.Author = author;
        this.Date = date;
    }    

    // public getPostDate(): string | undefined {
    //     try
    //     {
    //         console.log('try to getting data from sql', this.Date)
    //         //return format(this.Date, 'yyyy-MM-ddTHH:mm:ss.zzz');
    //         //return format(dateFns.parseISO(this.Date), "yyyy-mm-dd hh:mm:ss.ms");
    //         return this.Date.toString();
    //         //return 'yyyy-MM-dd HH:mm:ss'
    //     }
    //     catch(err: any) {
    //         return 'error format date'
    //     }
    // }
}

