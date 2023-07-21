import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user_register',
  templateUrl: './user_register.component.html',
  styleUrls: ['./user_register.component.css']
})
export class User_registerComponent implements OnInit {

  passwordControl: FormControl = new FormControl();
  showPassword: boolean = false;

  selectedRoleValue!: string | null;

  registerForm!: FormGroup;
  userSubmitted?: boolean;

  user!: User;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userservice: UserService) { }

  ngOnInit() {
    // Uzimanje tipa
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
      ime: [null, Validators.required],
      prezime: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      datum: [null, Validators.required],
      grad: [null, Validators.required],
      telefon: [null, [Validators.required, Validators.maxLength(10)]],
      pol: [null, Validators.required],
      korisnickoIme: [null, Validators.required],
      lozinka: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  get ime(){
    return this.registerForm.get('ime') as FormControl;
  }

  get prezime(){
    return this.registerForm.get('prezime') as FormControl;
  }
  get email(){
    return this.registerForm.get('email') as FormControl;
  }

  get datum(){
    return this.registerForm.get('datum') as FormControl;
  }
  get grad(){
    return this.registerForm.get('grad') as FormControl;
  }

  get telefon(){
    return this.registerForm.get('telefon') as FormControl;
  }
  get pol(){
    return this.registerForm.get('pol') as FormControl;
  }
  get korisnickoIme(){
    return this.registerForm.get('korisnickoIme') as FormControl;
  }

  get lozinka(){
    return this.registerForm.get('lozinka') as FormControl;
  }

  korisnik:any;
  onSubmit(){

    this.userSubmitted = true;

    if(this.registerForm.valid){
      this.userservice.postUser(this.userData()).subscribe(x =>{this.korisnik=x});
      this.registerForm.reset();
      this.userSubmitted = false;

      this.router.navigate(['/login']);
      alert("Uspesno ste se registrovali kao korisnik!");
    }else{
      alert("Došlo je do grešle, niste se registrovali!");
    }
  }

  userData(): User{
    return this.user = {
      tip: this.selectedRoleValue,
      korisnickoIme: this.korisnickoIme.value,
      lozinka: this.lozinka.value,
      ime: this.ime.value,
      prezime: this.prezime.value,
      email:this.email.value,
      datumRodjenja: this.datum.value,
      grad: this.grad.value,
      brojTelefona: this.telefon.value,
      pol:this.pol.value
    }
  }
}
