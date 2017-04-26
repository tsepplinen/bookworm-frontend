import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseBooksPageComponent } from './browse-books-page/browse-books-page.component';
import {BrowseBooksRoutingModule} from "./browse-books-routing.module";
import { BookListComponent } from './book-list/book-list.component';

@NgModule({
  imports: [
    CommonModule,
    BrowseBooksRoutingModule
  ],
  declarations: [BrowseBooksPageComponent, BookListComponent]
})
export class BrowseBooksModule { }
