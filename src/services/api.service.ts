import { Injectable, ElementRef } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class ApiService {
    latlng: any;
    map: any;
    mapElement: ElementRef;
    // private baseURL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCIDlI2Rr6L5NyU8dtmf9CThNRVFLgPvow&address=";


    constructor(private http: Http) {
    }

    getPlaces(place: string): Observable<any> {
        return this.http
            .get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCIDlI2Rr6L5NyU8dtmf9CThNRVFLgPvow&address=' + place)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

  

    getPlacess(type: string): Observable<any> {
        
        return this.http
            .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCIDlI2Rr6L5NyU8dtmf9CThNRVFLgPvow&radius=5000&type=${type}&location=` + this.latlng)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    
      



}