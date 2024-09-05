
import { Library } from "../models/Library";
import { Book } from "../models/Book";
import * as rls from "readline-sync";
import * as fs from "fs";

//Function to save the books
function saveBooks(library:Library):void{
    const books=library.getBooks();
    const data=JSON.stringify(books, null, 2);
    fs.writeFileSync(`./data/books.json`, data);
}

//Function to load the books
function loadBooks(library:Library):void{
    if(fs.existsSync("./data/books.json")){
        const data=fs.readFileSync("./data/books.json", "utf-8");
        const books=JSON.parse(data);
        books.forEach((bookData: {title:string; author:string; isbn:string}) =>{
            const book=new Book(bookData.title, bookData.author, bookData.isbn);
            library.addBook(book);
        });
    }else{
        console.log("Book file not found");
    }
}

//Create Library instance
const library=new Library("Biblioteca Manuel Villardaga", "25 de Mayo 1200", "+54-2296-454198");

//Load the books
loadBooks(library);

//Function to add books
function addBook():void{
let title=rls.question("Enter the book title: ");
let author=rls.question("Enter the book author: ");
let isbn=rls.question("Enter the book ISBN: ");

const newBook=new Book(title, author, isbn);
library.addBook(newBook);
saveBooks(library);

console.log(`The book ${title} has been added to the library.`);
}

//Function to show all books
function showBooks():void {
console.log("-------BOOK LIST-------");
library.showBooks().forEach(description => console.log(description));
}

//Function to search book by author
function searchBookByAuthor():void{
const authorSearch=rls.question("Enter the author to search for:").trim().toLowerCase();
const bookByAuthor=library.searchBookByAuthor(authorSearch);

if(bookByAuthor.length > 0){
bookByAuthor.forEach(book => console.log(`${book.getTitle()} by ${book.getAuthor()} (ISBN: ${book.getIsbn})`));
}else{
    console.log("No books found by this author.")
    }
}

//Function to search book by title
function searchBookByTitle():void{
const titleSearch = rls.question("Enter the title to search for: ").trim().toLowerCase();
const booksByTitle = library.searchBookByTitle(titleSearch);

if(booksByTitle.length > 0){
booksByTitle.forEach(book => console.log(`${book.getTitle()} by ${book.getAuthor()} (ISBN: ${book.getIsbn()})`));
}else{
    console.log("no book found with this title.")
    }
}

//Function to delete a book by title
function deleteBookByTitle():void{
    const titleToDelete=rls.question("Enter the title of the book to delete: ");
    const booksToDelete=library.searchBookByTitle(titleToDelete);

    if(booksToDelete.length > 0){
        booksToDelete.forEach(book => {
            library.removeBook(book);
            console.log(`The book ${book.getTitle()} has been deleted.`);
        });
        saveBooks(library);
    }else{
        console.log("The book you want to delete was not found....");
    }
}

//Menu selector
let exit=false;
while(!exit){
    console.log("\n--- Library Menu---");
    console.log("1- Add book");
    console.log("2- Show all books");
    console.log("3- Search book by author");
    console.log("4- Search book by title");
    console.log("5- Delete book by title");
    console.log("6- Exit");

    const option=rls.questionInt("Select an option: ");

    switch(option){
        case 1:
            addBook();
            break;
        case 2:
            showBooks();
            break;
        case 3:
            searchBookByAuthor();
            break;
        case 4:
            searchBookByTitle();
            break;
        case 5:
            deleteBookByTitle();
            break;
       case 6:
            exit=true;
            console.log("Exiting the program.....");
            break;
        default:
            console.log("Invalid option, please select an option between 1 and 6:");
    }

}