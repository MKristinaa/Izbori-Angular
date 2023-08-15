import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { Party } from 'src/app/Interfaces/party';
import { ElectionService } from 'src/app/services/election.service';
import { MemberService } from 'src/app/services/member.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-election_details',
  templateUrl: './election_details.component.html',
  styleUrls: ['./election_details.component.css']
})
export class Election_detailsComponent implements OnInit {

  role = this.sharedServise.getRole();
  elections: any;
  parties:Party[]=[];


  constructor(private election: ElectionService,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private members: MemberService,
              private userService: UserService,
              private sharedServise: SharedService) { }


  async ngOnInit() {
    const electionId = this.route.snapshot.paramMap.get('id');
    try {
      this.elections = await this.election.getElectionById(+electionId!).toPromise();

    } catch (error) {
      console.error('Error fetching election details:', error);
      return;
    }

    this.osveziPrijavljeneStranke(+electionId!);
  }


  formatirajDatum(datum: string): string {
    return this.datePipe.transform(datum, 'dd/MM/yyyy') || '';
  }


  async PrijaviSe(elections: any) {
      const id = localStorage.getItem('userId');
      const pripada = {
        IdIzbora: elections.id,
        IdStranke: id
      };

      const clanoviStranke: any[] = await this.members.getClanoviStranke(+id!).toPromise();
      const gradIzbora = elections.grad;
      const membersFromCity = clanoviStranke.filter(member => member.grad == gradIzbora);


      if (elections.vrsta == 'Lokalni' && membersFromCity.length < 2 ) {
        alert('Nemate dovoljno članova stranke za prijavu na lokalne izbore.');
        return;
      } else if (elections.vrsta == 'Savezni' && clanoviStranke.length < 5) {
        alert('Nemate dovoljno članova stranke za prijavu na savezne izbore.');
        return;
      }

      try {
        const response: any = await this.election.prijavaStranke(pripada).toPromise();
        if (response.jesteClan) {
          alert('Već ste se prijavili na ovim izborima!');
        } else {
          const potvrda = confirm(`Da li ste sigurni da želite da se prijavite na ${elections.vrsta.toLowerCase()} izbore?`);
          if (potvrda) {
            await this.osveziPrijavljeneStranke(elections.id);
            alert(`Uspešno ste se prijavili na ${elections.vrsta.toLowerCase()} izbore!`);
          }
        }
      } catch (error) {
        alert('Došlo je do greške pri prijavi na izbore.');
      }
    }


  osveziPrijavljeneStranke(electionId: number) {
    this.election.getPrijavljeneStranke(electionId).subscribe(
      (member) => {
        this.parties = member;
      },
      (error) => {
        console.error('Greška pri dohvatanju prijavljenih stranaka:', error);
      }
    );
  }


  Glasaj(partie: any) {
    const electionId = this.route.snapshot.paramMap.get('id');
    const id = localStorage.getItem('userId');

    const trenutniDatum = new Date();
    const datumGlasanjaString = trenutniDatum.toISOString();
    this.userService.getUser(+id!).subscribe(
      (korisnik) => {
        if (korisnik) {
          const lokacijaGlasanja = korisnik.grad;

          const pripada = {
            IdKorisnika: id,
            IdStranke: partie.id,
            IdIzbora: electionId,
            DatumGlasanja: datumGlasanjaString,
            LokacijaGlasanja: lokacijaGlasanja
          };

          this.election.glasanje(pripada).subscribe(
            (response) => {
              if (response.glas) {
                alert('Već ste glasali!');
              } else {
                alert('Uspešno ste glasali!');
              }
            },
            (error) => {
              alert('Došlo je do greške pri glasanju.');
            }
          );
        } else {
          alert('Niste prijavljeni korisnik.');
        }
      },
      (error) => {
        alert('Došlo je do greške pri dohvatanju podataka o korisniku.');
      }
    );
  }


}


