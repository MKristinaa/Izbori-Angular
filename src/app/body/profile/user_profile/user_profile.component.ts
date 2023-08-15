import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/Interfaces/member';
import { ElectionService } from 'src/app/services/election.service';
import { MemberService } from 'src/app/services/member.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user_profile',
  templateUrl: './user_profile.component.html',
  styleUrls: ['./user_profile.component.css']
})
export class User_profileComponent implements OnInit {

  user!:Member;
  isClan: boolean = false;

  constructor(private userService: UserService,
              private datePipe: DatePipe,
              private memberService: MemberService,
              private electionService: ElectionService,
              private sharedService: SharedService) { }

  ngOnInit() {
    const id = this.sharedService.getUserId();
    this.profil(+id!);
  }

  profil(userId: number) {
    this.userService.getUser(userId).subscribe(
      (user) => {
        this.user = user;
        user.datumRodjenja = this.formatirajDatum(user.datumRodjenja);
        this.proveriUclanjenje(userId);
      },
      (error) => {
        console.error('Greška pri dohvatanju podataka o korisniku:', error);
      }
    );
  }

  formatirajDatum(datum: string): string {
    return this.datePipe.transform(datum, 'dd/MM/yyyy') || '';
  }

  proveriUclanjenje(userId: number) {
    this.memberService.proveriUclanjenjeKorisnika(userId).subscribe(
      (response) => {
        if (response.jesteClan) {
          this.isClan = true;
          this.user.nazivStranke = response.nazivStranke;
          console.log('Naziv stranke:', response.nazivStranke);
        } else {
          this.isClan = false;
          console.log('Korisnik nije član nijedne stranke.');
        }
      },
      (error) => {
        console.error('Greška pri proveri članstva:', error);
      }
    );
  }

  async onSubmit() {
    try {
      const potvrda = confirm('Da li ste sigurni da želite da izađete iz stranke?');

        if (potvrda) {
          await this.electionService.ukloniClanstvo().toPromise();
          alert('Uspešno ste izašli iz stranke.');
          this.isClan = false;
        }

    } catch (greska) {
      console.error('Greška pri uklanjanju članstva:', greska);
    }
  }
}




