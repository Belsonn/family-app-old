import { AuthGuard } from './authentication/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { FamilyViewComponent } from './mainpage/familyView/familyView.component';
import { MainViewComponent } from './mainpage/main-view/main-view.component';
import { HomepageComponent } from './mainpage/homepage/homepage.component';
import { FamilyCreateComponent } from './mainpage/family-create/family-create.component';
import { CalendarComponent } from './mainpage/calendar/calendar.component';
import { ListsComponent } from './mainpage/lists/lists.component';
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'home',
    component: MainViewComponent,
    children: [
      {
        path: 'family',
        component: FamilyViewComponent,
        canActivate: [AuthGuard]
      },
      { path: 'create', component: FamilyCreateComponent },
      { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
      { path: 'lists', component: ListsComponent, canActivate: [AuthGuard]}
    ],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
