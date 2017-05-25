import {Component, OnInit} from "@angular/core";
import {BookService} from "../services/book.service";
import {Book} from "../../models/Book";
import {Publisher} from "../../models/Publisher";
import {Author} from "../../models/Author";
import {ActivatedRoute} from "@angular/router";
import {FormGroup, FormBuilder} from "@angular/forms";
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";

@Component({
    selector: 'app-browse-books-page',
    templateUrl: './browse-books-page.component.html',
    styleUrls: ['./browse-books-page.component.css']
})
export class BrowseBooksPageComponent implements OnInit {

    public books: Array<Book>;
    searchForm: FormGroup;

    constructor(private fb: FormBuilder, private cartService: ShoppingCartService, private bookService: BookService, private route: ActivatedRoute) {
        this.books = [];

        this.searchForm = this.fb.group({
            searchWord: ['']
        });
    }

    addToCart(book: Book) {
        this.cartService.addToCart(book);
    }

    onSubmit(values) {
        if (values.searchWord && values.searchWord != "") {
            this.bookService.searchBooks(values.searchWord).subscribe(response => {
                    this.books = response;
                },
                error => {
                    console.error("Getting books failed:", error);
                });
        } else {
            this.bookService.getBooks().subscribe(response => {
                    this.books = response;
                },
                error => {
                    console.error("Getting books failed:", error);
                });
        }
    }

    ngOnInit() {
        this.bookService.getBooks().subscribe(response => {
                this.books = response;
            },
            error => {
                console.error("Getting books failed:", error);
            });

        /*this.bookService.getBook(1).subscribe(response => {
                console.debug("Got Book 1:", response);
            },
            error => {
                console.error("Getting book 1 failed:", error);
            });

        let book: Book = new Book();
        book.authors = [new Author()];
        book.description = "Description of test book";
        book.format = "Format of text book";
        book.genre = "JS";
        book.isbn = "1234567TEST";
        book.pages = 500;
        book.price = 19.95;
        book.publisher = new Publisher();
        book.reviews = [];
        book.stock = 10;
        book.title = "This is a test book title";

        this.bookService.saveBook(book).subscribe(result => {
                console.debug("Saved test book:", result);
            },
            error => {
                console.error("Saving book failed", error);
            });*/

        this.route.params.subscribe(params => {
                if (params.genre == 'all') {
                    this.bookService.getBooks().subscribe(response => {
                            this.books = response;
                        },
                        error => {
                            console.error("Getting books failed:", error);
                        });
                } else {
                    this.bookService.getBooksByGenre(params.genre).subscribe(response => {
                            this.books = response;
                        },
                        error => {
                            console.error("Getting books failed:", error);
                        });

                }
            }, error => {
                console.error("Route param error", error);
            }
        )
    }

    /*handleDeleteBook() {
        // console.debug("Button clicked");
        this.bookService.deleteBook(1).subscribe(response => {
                console.debug(response);
            },
            error => {
                console.error("deleting book failed", error)
            });
    }
    */
}
