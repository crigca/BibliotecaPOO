
export class Book {
    private title:string;
    private author:string;
    private isbn: string;

    constructor(title:string, author:string, isbn:string){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }

    public getTitle(): string{
        return this.title;
    }
     public getAuthor(): string{
        return this.author;
     }
     public getIsbn(): string{
        return this.isbn;
     }



}