import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Winner } from 'src/app/Interfaces/winner';
import { ElectionService } from 'src/app/services/election.service';
import { FilterService } from 'src/app/services/filter.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {


  role = this.sharedService.getRole();
  elections:Winner[] = [];
  filterCity!: string;



  constructor(private electionService:ElectionService,
              private datePipe: DatePipe,
              private filterService: FilterService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.loadElections();
  }



  loadElections(){
     this.electionService.getElection().subscribe(
      (res: Winner[]) => {
        // Filtriraj izbore sa statusom 'Ne'
        this.elections = res.filter((election) => election.otvoreni == 'Ne');

        // Formatiraj datume za prikaz
        this.elections.forEach((election) => {
          election.datumPocetka = this.formatirajDatum(election.datumPocetka);
          election.datumZavrsetka = this.formatirajDatum(election.datumZavrsetka);


          // Pozovi metodu za dobijanje pobednika za svaki izbor
          this.electionService.getPobednik(election.id!).subscribe(
            (pobednik) => {
              if (pobednik) {
                // Dodaj podatke o pobedniku u izbornu listu
                election.nazivStranke = pobednik.stranka.naziv;
                election.brojGlasova = pobednik.brojGlasova;
              } else {
                // Ako nema pobednika, postavi default vrednosti
                election.nazivStranke = 'Nema pobednika';
                election.brojGlasova = 0;
              }
            },
            (error) => {
              console.error('Greška pri dohvatanju pobednika:', error);
            }
          );
        });
      },
      (error) => {
        console.error('Greška pri dohvatanju podataka:', error);
      }
    );
  }


  formatirajDatum(datum: string): string {
    return this.datePipe.transform(datum, 'dd/MM/yyyy hh:mm') || '';
  }

  onSubmit(){
    this.filterService.filterResults(this.filterCity).subscribe((res) => {
      this.elections = res;

      this.elections.forEach((election) => {
        election.datumPocetka = this.formatirajDatum(election.datumPocetka);
        election.datumZavrsetka = this.formatirajDatum(election.datumZavrsetka);


        // Pozovi metodu za dobijanje pobednika za svaki izbor
        this.electionService.getPobednik(election.id!).subscribe(
          (pobednik) => {
            if (pobednik) {
              // Dodaj podatke o pobedniku u izbornu listu
              election.nazivStranke = pobednik.stranka.naziv;
              election.brojGlasova = pobednik.brojGlasova;
            } else {
              // Ako nema pobednika, postavi default vrednosti
              election.nazivStranke = 'Nema pobednika';
              election.brojGlasova = 0;
            }
          },
          (error) => {
            console.error('Greška pri dohvatanju pobednika:', error);
          }
        );
      });
    },
    (error) => {
      console.error('Greška pri dohvatanju podataka:', error);

    });
  }

  resetFilter() {
    this.filterCity = '';
    this.loadElections();
  }

}
