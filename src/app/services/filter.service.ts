import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

constructor(private http: HttpClient,
            private sharedService: SharedService) { }

url = this.sharedService.getUrl();
token = this.sharedService.getToken();

filterResults(text: string): Observable<any> {

  const url = this.url + `rezultati/filtered?cityFilter=${text}`;

  return this.http.get<any>(url,{
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'bearer ' + this.token,
    },
  });
}


}
