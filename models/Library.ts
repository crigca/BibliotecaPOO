
import { Book} from "./Book";


export class Library {
    private library:string;
    private direction:string;
    private phone:string;
    private books:Book[];

    constructor(library:string, direction:string, phone:string){
        this.library=library;
        this.direction=direction;
        this.phone=phone;
        this.books=[];
    }

    //Metodo que devuelve todos los libros
    public getBooks(): Book[]{
        return this.books;
    }
    
    //Metodo que agrega un libro a la lista
    public addBook(book:Book): void{
        this.books.push(book);
    }

    //metodo que devuelve la lista de libros
    public showBooks(): string[]{
        return this.books.map((book, index) =>
            `${index + 1}. Titulo: ${book.getTitle()}, Autor: ${book.getAuthor()}, ISBN: ${book.getIsbn()}`
        );
    }
    
    //Metodo que busca libros por autor
    public searchBookByAuthor(author:string):Book[]{
        return this.books.filter(book => book.getAuthor().toLowerCase().includes(author.toLowerCase()));
    }

    //Metodo que busca libros por titulo
     public searchBookByTitle(title:string):Book[]{
        return this.books.filter(book => book.getTitle().toLowerCase().includes(title.toLowerCase()));
     }

     //Metodo que elimina un libro de la lista
     public removeBook(bookToRemove:Book):void{
        this.books=this.books.filter(book => book !== bookToRemove)
     }

}