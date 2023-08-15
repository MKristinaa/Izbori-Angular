import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Interfaces/user';
import { Observable } from 'rxjs';
import { Admin } from '../Interfaces/admin';
import { Party } from '../Interfaces/party';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient,
              private sharedService: SharedService) { }


  url = this.sharedService.getUrl();
  token = this.sharedService.getToken();

  //registracija
  public postUser(kori: User): Observable<any> {
    const url =  this.url + 'user_register';
    return this.http.post<User>(url,kori);
  }
  public postAdmin(kori: Admin): Observable<any> {
    const url = this.url + 'admin_register';
    return this.http.post<Admin>(url,kori);
  }
  public postParty(kori: Party): Observable<any> {
    const url = this.url + 'admin_register';
    return this.http.post<Party>(url,kori);
  }

  //logovanje
  public login(kor: any): Observable<any> {
    const url = this.url + 'login';
    return this.http.post<any>(url,kor);
  }



  //vracanje svih stranki
  public getStranke(): Observable<any> {

    const url = this.url + 'GetStranke';
    return this.http.get<any>(url,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'bearer ' + this.token,
      },
    });
  }

  //uzimanje korisnika po id
  public getUser(id: number): Observable<any> {

    const url = this.url + `dohvatiKorisnika/${id}`;
    return this.http.get<any>(url,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'bearer ' + this.token,
      },
    });
  }

  //uzimanje stranke po id
  public getParty(id: number): Observable<any> {

    const url = this.url + `dohvatiStranku/${id}`;
    return this.http.get<any>(url,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'bearer ' + this.token,
      },
    });
  }

}
