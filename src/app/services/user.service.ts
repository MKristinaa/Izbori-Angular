import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Interfaces/user';
import { Observable } from 'rxjs';
import { Admin } from '../Interfaces/admin';
import { Party } from '../Interfaces/party';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  //registracija
  public postUser(kori: User): Observable<any> {
    const url = 'http://localhost:5227/user_register'
    return this.http.post<User>(url,kori);
  }
  public postAdmin(kori: Admin): Observable<any> {
    const url = 'http://localhost:5227/admin_register'
    return this.http.post<Admin>(url,kori);
  }
  public postParty(kori: Party): Observable<any> {
    const url = 'http://localhost:5227/admin_register'
    return this.http.post<Party>(url,kori);
  }

  //logovanje
  public login(kor: any): Observable<any> {
    const url = 'http://localhost:5227/login';
    return this.http.post<any>(url,kor);
  }

}
