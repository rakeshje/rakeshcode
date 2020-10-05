import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { CustomerManagementComponent } from './pages/dashboard/user-management/customers/customer-management/customer-management.component';
import { AddCustomerComponent } from './pages/dashboard/user-management/customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './pages/dashboard/user-management/customers/edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './pages/dashboard/user-management/customers/view-customer/view-customer.component';
import { CorporateManagementComponent } from './pages/dashboard/user-management/corporates/corporate-management/corporate-management.component';
import { AddCorporateComponent } from './pages/dashboard/user-management/corporates/add-corporate/add-corporate.component';
import { EditCorporateComponent } from './pages/dashboard/user-management/corporates/edit-corporate/edit-corporate.component';
import { ViewCorporateComponent } from './pages/dashboard/user-management/corporates/view-corporate/view-corporate.component';
import { CompanyManagementComponent } from './pages/dashboard/user-management/company/company-management/company-management.component';
import { ViewCompanyComponent } from './pages/dashboard/user-management/company/view-company/view-company.component';
import { EditCompanyComponent } from './pages/dashboard/user-management/company/edit-company/edit-company.component';
import { PractionerManagementComponent } from './pages/dashboard/user-management/practioners/practioner-management/practioner-management.component';
import { AddPractionerComponent } from './pages/dashboard/user-management/practioners/add-practioner/add-practioner.component';
import { EditPractionerComponent } from './pages/dashboard/user-management/practioners/edit-practioner/edit-practioner.component';
import { ViewPractionerComponent } from './pages/dashboard/user-management/practioners/view-practioner/view-practioner.component';


const routes: Routes = [
  { path:'', redirectTo:'login' , pathMatch:'full'},
  { path:'login', component:LoginComponent},
  { path:'reset-password', component:ResetPasswordComponent},
  { path:'forget-password', component:ForgetPasswordComponent},
  { path:'change-password', component:ChangePasswordComponent},
  // dashboard
  { path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  // user-management
  // customers
  { path:'customer-management', component:CustomerManagementComponent},
  { path:'add-customer', component:AddCustomerComponent},
  { path:'edit-customer', component:EditCustomerComponent},
  { path:'view-customer', component:ViewCustomerComponent},
  // corporate
  { path:'corporate-management', component:CorporateManagementComponent},
  { path:'add-corporate', component:AddCorporateComponent},
  { path:'edit-corporate' , component:EditCorporateComponent},
  { path:'view-corporate', component:ViewCorporateComponent},
  // companies
  { path:'add-company', component:CompanyManagementComponent},
  { path:'view-company', component:ViewCompanyComponent},
  { path:'edit-company', component:EditCompanyComponent},
  // practioner
  { path:'practioner-management', component:PractionerManagementComponent},
  { path:'add-practioner', component:AddPractionerComponent},
  { path:'edit-practioner', component:EditPractionerComponent},
  { path:'view-practioner', component:ViewPractionerComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
