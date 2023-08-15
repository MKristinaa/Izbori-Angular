import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home_page',
  templateUrl: './home_page.component.html',
  styleUrls: ['./home_page.component.css']
})
export class Home_pageComponent implements OnInit {

  role = this.sharedService.getRole();


  constructor(private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
  }

  Glasaj(){
    var user = this.sharedService.getUsername();
    if (user && this.role == 'Korisnik') {
      this.router.navigate(['/elections']);
    } else {
      alert('Morate se ulogovati kao korisnik da biste glasali!');
    }
  }
}
