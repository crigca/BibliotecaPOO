
import { Book} from "./Book";


export class Library {
    private library:string;
    private address:string;
    private phone:string;
    private books:Book[];

    constructor(library:string, address:string, phone:string){
        this.library=library;
        this.address=address;
        this.phone=phone;
        this.books=[];
    }

    //Method that returns all the books
    public getBooks(): Book[]{
        return this.books;
    }
    
    //Method that adds a book to the list
    public addBook(book:Book): void{
        this.books.push(book);
    }

    //method that returns the list of books
    public showBooks(): string[]{
        return this.books.map((book, index) =>
            `${index + 1}. Title: ${book.getTitle()}, Author: ${book.getAuthor()}, ISBN: ${book.getIsbn()}`
        );
    }
    
    //Method that searches for books by author
    public searchBookByAuthor(author:string):Book[]{
        return this.books.filter(book => book.getAuthor().toLowerCase().includes(author.toLowerCase()));
    }

    //Method that searches for books by title
     public searchBookByTitle(title:string):Book[]{
        return this.books.filter(book => book.getTitle().toLowerCase().includes(title.toLowerCase()));
     }

     //Method that removes a book from the list
     public removeBook(bookToRemove:Book):void{
        this.books=this.books.filter(book => book !== bookToRemove)
     }

}