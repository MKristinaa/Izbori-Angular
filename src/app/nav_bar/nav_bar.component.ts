import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-nav_bar',
  templateUrl: './nav_bar.component.html',
  styleUrls: ['./nav_bar.component.css']
})
export class Nav_barComponent implements OnInit {

  loggedinUser?: string;
  Role = this.sharedService.getRole();

  constructor(private router: Router,
              private sharedService: SharedService) { }



  ngOnInit() {
  }


  loggedin(){
    const item = this.sharedService.getUsername();
    const role = this.sharedService.getRole();
    if(item){
      this.loggedinUser = item;
    }
    if (role) {
      this.Role = role;
    }
    return this.loggedinUser;
  }

  onLogout(){
    const isConfirmed = confirm("Da li ste sigurni da želite da se izlogujete?");

    if (isConfirmed) {
      localStorage.removeItem('token');
      localStorage.removeItem('Username');
      localStorage.removeItem('UserRole');
      localStorage.removeItem('userId');
      this.loggedinUser = '';
      this.Role = '';
      alert("Izlogovani ste!");
      this.router.navigate(['/']);
    }
  }
}
