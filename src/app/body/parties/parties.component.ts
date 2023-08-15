import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Party } from 'src/app/Interfaces/party';
import { MemberService} from 'src/app/services/member.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {

  stranke: Party[] = [];
  role = this.sharedService.getRole();

  constructor(private userservice: UserService,
              private belongservice: MemberService,
              private sharedService: SharedService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.userservice.getStranke().subscribe(
    (res) => {
      this.stranke = res;
      this.changeDetectorRef.detectChanges();
    },
    (error) => {
      console.error('Greška pri dohvatanju podataka:', error);
    });
  }



  uclaniSe(stranka: any) {
    const id = this.sharedService.getUserId();
    const pripada = {
      IdKorisnika: id,
      IdStranke: stranka.id
    };

    this.belongservice.proveriUclanjenje(pripada).subscribe(
      (response) => {
        if (response.jesteClan) {
          alert('Već ste član neke stranke!');
        } else {
          const potvrda = confirm(`Da li ste sigurni da želite da postanete član stranke "${stranka.naziv}"?`);

          if (potvrda) {
            this.belongservice.uclaniKorisnika(pripada).subscribe(
              (responseUclani) => {

                alert('Uspešno ste se učlanili!');
              },
              (error) => {
                alert('Došlo je do greške pri učlanjenju.');
              }
            );
          } else {
            alert('Odustali ste od učlanjenja u stranku.');
          }
        }
      },
      (error) => {
        alert('Došlo je do greške pri proveri učlanjenja.');
      }
    );
  }

}
