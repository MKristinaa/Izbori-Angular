import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Party } from 'src/app/Interfaces/party';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-party_profile',
  templateUrl: './party_profile.component.html',
  styleUrls: ['./party_profile.component.css']
})
export class Party_profileComponent implements OnInit {

  party!:Party;


  constructor(private partyService: UserService,
              private sharedService: SharedService) {}


  ngOnInit() {
    const id = this.sharedService.getUserId();
    this.profil(+id!);
  }

  profil(electionId: number) {
    this.partyService.getParty(electionId).subscribe(
      (party) => {
        this.party = party;
      },
      (error) => {
        console.error('Greška pri dohvatanju podataka o stranci:', error);
      }
    );
  }
}
