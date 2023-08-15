import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { Login } from 'src/app/Interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordControl: FormControl = new FormControl();
  showPassword: boolean = false;
  loginForm!: FormGroup;
  userSubmitted!: boolean;
  error: string | null = null;
  user!: Login;
  token:any ;

  constructor(private fb: FormBuilder,
              private userservice: UserService,
              private router: Router) { }

  ngOnInit() {
    this.createLoginForm();
    // Lozinka
    this.passwordControl.valueChanges.subscribe((value) => {
    });
  }

  // Lozinka
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      korisnickoIme: [null, Validators.required],
      lozinka: [null, [Validators.required, Validators.minLength(8)]]
    })
  }



  get korisnickoIme(){
    return this.loginForm.get('korisnickoIme') as FormControl;
  }

  get lozinka(){
    return this.loginForm.get('lozinka') as FormControl;
  }


  onSubmit() {
    this.userSubmitted = true;

    this.userservice.login(this.userData()).subscribe(
      (response) => {
        this.token = response;

        if (this.token.token) {
          localStorage.setItem('token', this.token.token);
          const token = this.token.token;
          const decodedToken: any = jwt_decode(token);
          const userId = decodedToken.nameid;
          console.log(decodedToken);

          console.log('User ID:', userId);
          localStorage.setItem('userId', userId);

          const ime = decodedToken.name;
          localStorage.setItem('Username', ime);

          const userRole = decodedToken.role;
          localStorage.setItem('UserRole', userRole);

          alert('Uspešno ste se ulogovali kao ' + userRole.toLowerCase() + '!');
          this.router.navigate(['/']);
        } else {
          this.error = 'Korisničko ime ili lozinka nisu tačni';
        }
      },
      (error) => {
        this.error = 'Korisničko ime ili lozinka nisu tačni';
      }
    );
  }

  clearError() {
    this.error = null;
  }


  userData(): Login{
    return this.user = {
      korisnickoIme: this.korisnickoIme.value,
      lozinka: this.lozinka.value
    }
  }
}
