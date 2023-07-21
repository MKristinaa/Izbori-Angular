import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { User_registerComponent } from './user/register/user_register/user_register.component';
import { Nav_barComponent } from './nav_bar/nav_bar.component';
import { Admin_registerComponent } from './user/register/admin_register/admin_register.component';
import { Party_registerComponent } from './user/register/party_register/party_register.component';
import { Choose_registerComponent } from './user/register/choose_register/choose_register.component';
import { LoginComponent } from './user/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [

  {path: '', component: Nav_barComponent},
  {path: 'choose_register', component: Choose_registerComponent},
  {path: 'user_register/:selectedRole', component: User_registerComponent},
  {path: 'admin_register/:selectedRole', component: Admin_registerComponent},
  {path: 'party_register/:selectedRole', component: Party_registerComponent},
  {path: 'login', component: LoginComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    Nav_barComponent,
    Choose_registerComponent,
    User_registerComponent,
    Admin_registerComponent,
    Party_registerComponent,
    LoginComponent,
    FooterComponent
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
