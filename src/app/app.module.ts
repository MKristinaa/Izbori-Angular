import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DatePipe } from '@angular/common';

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
import { Home_pageComponent } from './body/home_page/home_page.component';
import { PartiesComponent } from './body/parties/parties.component';
import { ElectionsComponent } from './body/electionss/elections/elections.component';
import { MembersComponent } from './body/members/members.component';
import { MemberService } from './services/member.service';
import { Election_detailsComponent } from './body/electionss/election_details/election_details.component';
import { ResultsComponent } from './body/electionss/results/results.component';
import { New_electionComponent } from './body/electionss/new_election/new_election.component';
import { ElectionService } from './services/election.service';
import { User_profileComponent } from './body/profile/user_profile/user_profile.component';
import { Party_profileComponent } from './body/profile/party_profile/party_profile.component';
import { FilterService } from './services/filter.service';
import { SharedService } from './services/shared.service';


const appRoutes: Routes = [

  {path: '', component: Home_pageComponent},
  {path: 'parties', component: PartiesComponent},
  {path: 'elections', component: ElectionsComponent},
  {path: 'members', component: MembersComponent},
  {path: 'user_profile', component: User_profileComponent},
  {path: 'party_profile', component: Party_profileComponent},
  {path: 'election_details/:id', component:Election_detailsComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'new_election', component: New_electionComponent},
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
    FooterComponent,
    Home_pageComponent,
    PartiesComponent,
    ElectionsComponent,
    MembersComponent,
    User_profileComponent,
    Party_profileComponent,
    Election_detailsComponent,
    ResultsComponent,
    New_electionComponent,
    ResultsComponent
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService,
    MemberService,
    DatePipe,
    ElectionService,
    FilterService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
