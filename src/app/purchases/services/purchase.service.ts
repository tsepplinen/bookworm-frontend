import {Injectable} from "@angular/core";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class PurchaseService {

    constructor(private http: AuthHttp) {}
}
