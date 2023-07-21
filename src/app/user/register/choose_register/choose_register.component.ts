import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose_register',
  templateUrl: './choose_register.component.html',
  styleUrls: ['./choose_register.component.css']
})
export class Choose_registerComponent implements OnInit {


  roleForm!: FormGroup;
  selectedRole: FormControl = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.roleForm = this.formBuilder.group({
      role: this.selectedRole
    });
  }

  submitRole() {
    if (this.selectedRole.valid) {
      const selectedRole = this.roleForm.get('role')?.value;

      switch (selectedRole) {
        case 'Korisnik':
          console.log('Selected Role:', selectedRole);
          this.router.navigate(['/user_register', selectedRole]);
          break;
        case 'Stranka':
          console.log('Selected Role:', selectedRole);
          this.router.navigate(['/party_register', selectedRole]);
          break;
        case 'Admin':
          console.log('Selected Role:', selectedRole);
          this.router.navigate(['/admin_register', selectedRole]);
          break;
        default:
          break;
      }
    }
  }


}
