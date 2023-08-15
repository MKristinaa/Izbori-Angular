import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor() { }

getRole() {
  return localStorage.getItem('UserRole');
}

getUsername() {
  return localStorage.getItem('Username');
}

getUserId(){
  return localStorage.getItem('userId');
}

getUrl()
{
  return "http://tina999-001-site1.ctempurl.com/";
}

getToken(){
  return localStorage.getItem('token');
}

}
