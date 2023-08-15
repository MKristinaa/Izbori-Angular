import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Member } from 'src/app/Interfaces/member';
import { MemberService } from 'src/app/services/member.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[] = [];
  filterForm: FormGroup;

  constructor(private pripadaService: MemberService,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private sharedService: SharedService) {

  this.filterForm = this.formBuilder.group({
    filterOption: [''],
    searchTerm: [''],
    datumRodjenja: [''],
    pol: ['']
  });
  }

  ngOnInit() {
    this.listOfMembers();
  }

listOfMembers(){
  const idStranke = this.sharedService.getUserId();
    this.pripadaService.getClanoviStranke(+idStranke!).subscribe(
      (member) => {
        this.members = member;
        this.members.forEach((member) => {
          member.datumRodjenja = this.formatirajDatum(member.datumRodjenja);
        });
      },
      (error) => {
        console.error('Greška pri dohvatanju članova stranke:', error);
      }
    );
}

formatirajDatum(datum: string): string {
  return this.datePipe.transform(datum, 'dd/MM/yyyy') || '';
}


applyFilter(): void {
  const idStranke = +(localStorage.getItem('userId')!);
  const filterModel = {
    imePrezime: this.filterForm.get('filterOption')?.value == 'ime' ? this.filterForm.get('searchTerm')?.value : null,
    datumRodjenja: this.filterForm.get('filterOption')?.value == 'datumRodjenja' ? this.filterForm.get('datumRodjenja')?.value : null,
    pol: this.filterForm.get('filterOption')?.value == 'pol' ? this.filterForm.get('pol')?.value : null
  };

  this.pripadaService
    .getFilteredMembersClanoviStranke(idStranke, filterModel)
    .subscribe(
      (clanovi: Member[]) => {
        this.members = clanovi.map((member) => ({
          ...member,
          datumRodjenja: this.formatirajDatum(member.datumRodjenja)
        }));
      },
      (error) => {
        console.error(error);
      }
    );
}

resetFilter(): void {
  this.filterForm.reset();
  this.listOfMembers();
}

}
