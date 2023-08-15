import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Election } from 'src/app/Interfaces/election';
import { ElectionService } from 'src/app/services/election.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.css']
})
export class ElectionsComponent implements OnInit {

  role = this.sharedService.getRole();
  elections:Election[] = [];

  constructor(private electionService:ElectionService,
              private datePipe: DatePipe,
              private router: Router,
              private sharedService: SharedService) { }


  ngOnInit() {
    this.electionService.getElection().subscribe(
      (res: Election[]) => {
        this.elections = res.filter((election) => election.otvoreni == 'Da');

        this.elections.forEach((election) => {

        const noviDatum = election.datumZavrsetka;
        election.datumPocetka = this.formatirajDatum(election.datumPocetka);
        election.datumZavrsetka = this.formatirajDatum(election.datumZavrsetka);

        const trenutniDatum = new Date();
        const datumStarII = new Date(noviDatum);
        console.log("NOVO", datumStarII, "STARII ", trenutniDatum)


        if (!isNaN(trenutniDatum.getTime()) && !isNaN(datumStarII.getTime())) {
          if (trenutniDatum.getTime() > datumStarII.getTime()) {
            election.otvoreni = 'Ne';

            this.electionService.updateElectionStatus(+election.id!, 'Ne').subscribe(
              (response) => {
                console.log('Status izbora ažuriran na "Ne".', response);
              },
              (error) => {
                console.error('Greška pri ažuriranju statusa izbora:', error);
              }
            );
          }
        }

        });
      },
      (error) => {
        console.error('Greška pri dohvatanju podataka:', error);
      }
    );
  }



  formatirajDatum(datum: Date): any {
    const datumObj = new Date(datum);
    if (!isNaN(datumObj.getTime())) {
      return this.datePipe.transform(datumObj, 'dd/MM/yyyy hh:mm') || '';
    } else {
      return '';
    }
  }

  getElectionDetails(electionId: number) {
    this.router.navigate(['/election_details', electionId]);
  }
}
