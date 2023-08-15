import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Election } from '../Interfaces/election';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

constructor(private http: HttpClient,
            private sharedService: SharedService) { }


url = this.sharedService.getUrl();
token = this.sharedService.getToken();

//dodavanje novog izbora
addElection(election: Election): Observable<any> {

  const url = this.url + 'noviIzbor';
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + this.token,
  };

  return this.http.post<any>(url,election,{ headers });
}


//uzimanje svih izbora
getElection(): Observable<any> {

  const url = this.url + 'GetIzbore';
  return this.http.get<any>(url,{
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'bearer ' + this.token,
    },
  });
}


getElectionById(id: number): Observable<any> {
  const url = this.url + `GetIzborById/${id}`;
  return this.http.get<any>(url,{
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'bearer ' + this.token,
    },
  });
}

//prijavljene stranke na izborima
getPrijavljeneStranke(idIzbora: number): Observable<any> {
  const url =  this.url + `prijavljivanjeStrankeByIdIzbora/${idIzbora}`;
  return this.http.get<any>(url,{
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'bearer ' + this.token,
    },
  });
}

//prijavljivanje stranke na izborima
prijavaStranke(pripada: any): Observable<any> {
  const url = this.url + 'prijavljivanjeStranke';
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + this.token
  };

  return this.http.post<any>(url, pripada, { headers });
}

//glasanje
glasanje(pripada: any): Observable<any> {
  const url =  this.url + 'glasanje';
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + this.token
  };

  return this.http.post<any>(url, pripada, { headers });
}


//rezultati glasanja
getPobednik(id: number): Observable<any> {
  const url = this.url + `pobednikIzbora/${id}`;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + this.token
  };

  return this.http.get<any>(url,{ headers });
}


updateElectionStatus(electionId: number, status: string): Observable<any> {
  const url = this.url + `updateElectionStatus/${electionId}`;

  // Pripremite objekat sa novim statusom izbora koji želite da ažurirate
  const updatedElection = { otvoreni: status };

  // Pošaljite HTTP zahtev za ažuriranje statusa izbora
  return this.http.put<any>(url, updatedElection);
}



ukloniClanstvo(): Observable<any> {
  const idKorisnika = this.sharedService.getUserId();

  const url = this.url + `ukloniClanstvo/${idKorisnika}`;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + this.token
  };

  return this.http.delete<any>(url,{ headers });
}

}
