import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { ElectionService } from 'src/app/services/election.service';

@Component({
  selector: 'app-new_election',
  templateUrl: './new_election.component.html',
  styleUrls: ['./new_election.component.css']
})
export class New_electionComponent implements OnInit {

  novaForma!: FormGroup;
  showGrad: boolean = false;


  constructor(private fb: FormBuilder,
              private electionService: ElectionService,
              private datePipe: DatePipe) { }



  ngOnInit(){
      this.novaForma = this.fb.group({
      vrsta: new FormControl(''),
      datumPocetka: new FormControl(''),
      datumZavrsetka: new FormControl({ value: '', disabled: true }),
      grad: new FormControl(''),
      otvoreni: new FormControl('Da'),
    });
  }

  
  onVrstaIzboraChange() {
    const vrstaIzboraControl = this.novaForma.get('vrsta');

    if (vrstaIzboraControl?.value == 'Lokalni') {
      this.novaForma.get('grad')?.enable();
    } else {
      this.novaForma.get('grad')?.disable();
      this.novaForma.get('grad')?.setValue(null);
    }
  }


  newElection() {
    if (this.novaForma.valid) {
      const izbor = this.novaForma.value;

      const datumPocetka = new Date(izbor.datumPocetka);
      const datumZavrsetka = new Date(datumPocetka.getTime() + (5 * 60 * 1000));

      //datumZavrsetka.setDate(datumZavrsetka.getDate() + 1);

      izbor.datumPocetka = this.datePipe.transform(izbor.datumPocetka, 'yyyy-MM-ddTHH:mm:ss');
      izbor.datumZavrsetka = this.datePipe.transform(datumZavrsetka, 'yyyy-MM-ddTHH:mm:ss');

      this.electionService.addElection(izbor).subscribe(
        (response) => {
          console.log('Dodat izbor:', response);
          alert('Dodali ste novi izbor!');
        },
        (error) => {
          console.error('Greška prilikom dodavanja izbora:', error);
          alert('Došlo je do greške!');
        }
      );
    }
  }
}
