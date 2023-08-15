import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../Interfaces/member';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

constructor(private http: HttpClient,
            private sharedService: SharedService) { }

url = this.sharedService.getUrl();
token = this.sharedService.getToken();

proveriUclanjenje(pripada: any): Observable<any> {
  const url = this.url + 'proveriUclanjenje';
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + this.token
  };

  return this.http.post<any>(url, pripada, { headers });
}



uclaniKorisnika(pripada: any): Observable<any> {
  const url =  this.url + 'uclaniKorisnika';
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + this.token
  };

  return this.http.post<any>(url, pripada, { headers });
}



//po id korisnika
proveriUclanjenjeKorisnika(id: number): Observable<any> {
  const url = this.url + `proveriUclanjenje/${id}`;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + this.token
  };

  return this.http.post<any>(url, { headers });
}




getClanoviStranke(idStranke: number): Observable<any> {
  const url = this.url + `clanovi-stranke/${idStranke}`;
  return this.http.get<any>(url,{
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'bearer ' + this.token,
    },
  });
}


getFilteredMembersClanoviStranke(idStranke: number, filterModel: any): Observable<Member[]> {
  let params = new HttpParams();

  if (filterModel.imePrezime) {
    params = params.set('ImePrezime', filterModel.imePrezime);
  }
  if (filterModel.datumRodjenja) {
    params = params.set('DatumRodjenja', filterModel.datumRodjenja);
  }
  if (filterModel.pol) {
    params = params.set('Pol', filterModel.pol);
  }

  const url =  this.url + `clanovi-stranke/${idStranke}/filtered`;

  return this.http.get<Member[]>(url, {
    params: params,
    headers: {
      Authorization: 'bearer ' + this.token,
    }
  });
}

}
