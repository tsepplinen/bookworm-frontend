import { Injectable } from '@angular/core';
import {AuthHttp} from "angular2-jwt";
import {GLOBALS} from "../../globals";

@Injectable()
export class BookService {

  constructor(private authHttp: AuthHttp) {}

  getBooks() {
    return this.authHttp.get(GLOBALS.ROOT + "/books")
      .map(response => {
        return response.json();
      });
  }
}
