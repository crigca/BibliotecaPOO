
import { Library } from "../models/Library";
import { Book } from "../models/Book";
import * as rls from "readline-sync";
import * as fs from "fs";

//Funcion para guardar los libros
function saveBooks(library:Library):void{
    const books=library.getBooks();
    const data=JSON.stringify(books, null, 2);
    fs.writeFileSync(`./data/books.json`, data);
}

//Funcion para cargar los libros
function loadBooks(library:Library):void{
    if(fs.existsSync("./data/books.json")){
        const data=fs.readFileSync("./data/books.json", "utf-8");
        const books=JSON.parse(data);
        books.forEach((bookData: {title:string; author:string; isbn:string}) =>{
            const book=new Book(bookData.title, bookData.author, bookData.isbn);
            library.addBook(book);
        });
    }else{
        console.log("No se encontro el archivo de libros");
    }
}

//Crear instancia Biblioteca
const library=new Library("Biblioteca Manuel Villardaga", "25 de Mayo 1200", "+54-2296-454198");

//Cargar los libros
loadBooks(library);

//Funcion para agregar libros
function addBook():void{
let title=rls.question("Ingrese el titulo del libro: ");
let author=rls.question("Ingrse el autor del libro: ");
let isbn=rls.question("Ingrese el ISBN del libro: ");

const newBook=new Book(title, author, isbn);
library.addBook(newBook);
saveBooks(library);

console.log(`El libro ${title} ha sido agregado a la biblioteca.`);
}

//Funcion para mostrar todos los libros
function showBooks():void {
console.log("------ LISTADO DE LIBROS-------");
library.showBooks().forEach(description => console.log(description));
}

//Funcion para buscar libro por autor
function searchBookByAuthor():void{
const authorSearch=rls.question("Ingrese el autor a buscar:").trim().toLowerCase();
const bookByAuthor=library.searchBookByAuthor(authorSearch);

if(bookByAuthor.length > 0){
bookByAuthor.forEach(book => console.log(`${book.getTitle()} de ${book.getAuthor()} (ISBN: ${book.getIsbn})`));
}else{
    console.log("No se encontraron libros del autor.")
    }
}

//Funcion para buscar libro por titulo
function searchBookByTitle():void{
const titleSearch = rls.question("Ingrese el título a buscar: ").trim().toLowerCase();
const booksByTitle = library.searchBookByTitle(titleSearch);

if(booksByTitle.length > 0){
booksByTitle.forEach(book => console.log(`${book.getTitle()} de ${book.getAuthor()} (ISBN: ${book.getIsbn()})`));
}else{
    console.log("No se encontraron libros con el titulo especificado.")
    }
}

//Funcion para eliminar un libro por titulo
function deleteBookByTitle():void{
    const titleToDelete=rls.question("Ingrese el titulo del libro a eliminar: ");
    const booksToDelete=library.searchBookByTitle(titleToDelete);

    if(booksToDelete.length > 0){
        booksToDelete.forEach(book => {
            library.removeBook(book);
            console.log(`El libro ${book.getTitle()} ha sido eliminado.`);
        });
        saveBooks(library);
    }else{
        console.log("No se encontro el libro que desea eliminar....");
    }
}

//Menu selector
let exit=false;
while(!exit){
    console.log("\n--- Menu de la biblioteca financiera---");
    console.log("1- Agregar libro");
    console.log("2- Mostrar todos los libros");
    console.log("3- Buscar libro por autor");
    console.log("4- Buscar libro por titulo");
    console.log("5- Eliminar libro por titulo");
    console.log("6- Salir");

    const option=rls.questionInt("Seleccione una opcion: ");

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
            console.log("Saliendo de programa.....");
            break;
        default:
            console.log("Opcion no valida, por favor seleccione una opcion del 1 al 6:");
    }

}