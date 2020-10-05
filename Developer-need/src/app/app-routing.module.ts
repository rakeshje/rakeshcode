import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  { path:'', redirectTo:'login' , pathMatch:'full'},
  { path:'login', component:LoginComponent},
  { path:'reset-password', component:ResetPasswordComponent},
  { path:'forget-password', component:ForgetPasswordComponent},
  { path:'change-password', component:ChangePasswordComponent},
  // dashboard
  { path:'dashboard', component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
