import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Admin } from 'src/app/Interfaces/admin';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin_register',
  templateUrl: './admin_register.component.html',
  styleUrls: ['./admin_register.component.css']
})
export class Admin_registerComponent implements OnInit {

  passwordControl: FormControl = new FormControl();
  showPassword: boolean = false;
  selectedRoleValue!: string | null;
  registerForm!: FormGroup;
  userSubmitted?: boolean;
  x!:Admin;
  admin!: Admin;


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private userservice: UserService,
              private router: Router) { }

  ngOnInit() {
    this.createRegistrationForm();
    this.route.paramMap.subscribe(params => {
      this.selectedRoleValue = params.get('selectedRole');
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
  get korisnickoIme(){
    return this.registerForm.get('korisnickoIme') as FormControl;
  }

  get lozinka(){
    return this.registerForm.get('lozinka') as FormControl;
  }



  onSubmit(){

    this.userSubmitted = true;

    if(this.registerForm.valid){
      this.userservice.postAdmin(this.userData()).subscribe(res =>{this.x = res});
      this.registerForm.reset();
      this.userSubmitted = false;
      this.router.navigate(['/login']);
      alert("Uspesno ste se registrovali kao admin!");
    }else{
      alert("Došlo je do grešle, niste se registrovali!");
    }
  }

  userData(): Admin{
    return this.admin = {
      tip: this.selectedRoleValue,
      korisnickoIme: this.korisnickoIme.value,
      lozinka: this.lozinka.value,
      ime: this.ime.value,
      prezime: this.prezime.value
    }
  }
}
