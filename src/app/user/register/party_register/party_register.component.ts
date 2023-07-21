import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Party } from 'src/app/Interfaces/party';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-party_register',
  templateUrl: './party_register.component.html',
  styleUrls: ['./party_register.component.css']
})
export class Party_registerComponent implements OnInit {

  passwordControl: FormControl = new FormControl();
  showPassword: boolean = false;

  selectedRoleValue!: string | null;

  registerForm!: FormGroup;
  userSubmitted?: boolean;

  party!: Party;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private userservice: UserService,
              private router: Router) { }

  ngOnInit() {
    this.createRegistrationForm();
    this.route.paramMap.subscribe(params => {
      this.selectedRoleValue = params.get('selectedRole'); // Pristup prenetoj vrednosti parametra
    });

    // Lozinka
    this.passwordControl.valueChanges.subscribe((value) => {
    });
  }

  // Lozinka
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  createRegistrationForm(){
    this.registerForm = this.fb.group({
      naziv: [null, Validators.required],
      slogan: [null, Validators.required],
      nosilacListe: [null, Validators.required],
      godinaOsnivanja: [null, Validators.required],
      korisnickoIme: [null, Validators.required],
      lozinka: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  get naziv(){
    return this.registerForm.get('naziv') as FormControl;
  }

  get slogan(){
    return this.registerForm.get('slogan') as FormControl;
  }
  get nosilacListe(){
    return this.registerForm.get('nosilacListe') as FormControl;
  }

  get godinaOsnivanja(){
    return this.registerForm.get('godinaOsnivanja') as FormControl;
  }
  get korisnickoIme(){
    return this.registerForm.get('korisnickoIme') as FormControl;
  }

  get lozinka(){
    return this.registerForm.get('lozinka') as FormControl;
  }

  x:any;
  onSubmit(){

    this.userSubmitted = true;

    if(this.registerForm.valid){
      this.userservice.postParty(this.userData()).subscribe(res =>{this.x = res});
      this.registerForm.reset();
      this.userSubmitted = false;

      this.router.navigate(['/login']);
      alert("Uspesno ste se registrovali kao stranka!");
    }else{
      alert("Došlo je do grešle, niste se registrovali!");
    }
  }

  userData(): Party{
    return this.party = {
      tip: this.selectedRoleValue,
      korisnickoIme: this.korisnickoIme.value,
      lozinka: this.lozinka.value,
      naziv: this.naziv.value,
      slogan: this.naziv.value,
      nosilacListe: this.nosilacListe.value
    }
  }
}
