import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { UserManagementComponent } from './pages/dashboard/user-management/user-management.component';
import { AuthGuard } from './pages/guard/auth.guard';
import { ViewUserComponent } from './pages/dashboard/user-management/view-user/view-user.component';
import { ViewCompanyComponent } from './pages/dashboard/user-management/view-company/view-company.component';
import { SubAdminManagementComponent } from './pages/dashboard/sub-admin-management/sub-admin-management/sub-admin-management.component';
import { AddSubAdminComponent } from './pages/dashboard/sub-admin-management/add-sub-admin/add-sub-admin.component';
import { EditSubAdminComponent } from './pages/dashboard/sub-admin-management/edit-sub-admin/edit-sub-admin.component';
import { ViewSubAdminComponent } from './pages/dashboard/sub-admin-management/view-sub-admin/view-sub-admin.component';
import { ChangePasswordComponent } from './pages/dashboard/change-password/change-password.component';
import { StaticPageManagementComponent } from './pages/dashboard/static-page-management/static-page-management/static-page-management.component';
import { EditStaticPageComponent } from './pages/dashboard/static-page-management/edit-static-page/edit-static-page.component';
import { ViewStaticPageComponent } from './pages/dashboard/static-page-management/view-static-page/view-static-page.component';
import { ContactUsManagementComponent } from './pages/dashboard/contact-us-management/contact-us-management/contact-us-management.component';
import { ViewContactComponent } from './pages/dashboard/contact-us-management/view-contact/view-contact.component';
import { SubscriptionManagementComponent } from './pages/dashboard/subscription-management/subscription-management/subscription-management.component';
import { AddSubscriptionComponent } from './pages/dashboard/subscription-management/add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from './pages/dashboard/subscription-management/edit-subscription/edit-subscription.component';
import { ViewSubscriptionComponent } from './pages/dashboard/subscription-management/view-subscription/view-subscription.component';
import { TransactionManagementComponent } from './pages/dashboard/transaction-management/transaction-management/transaction-management.component';
import { ViewTransactionComponent } from './pages/dashboard/transaction-management/view-transaction/view-transaction.component';
import { ProfileScreenComponent } from './pages/dashboard/profile-screen/profile-screen.component';
import { SuccessComponent } from './pages/dashboard/success/success.component';
import { FailComponent } from './pages/dashboard/fail/fail.component';


const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component:LoginComponent},
  { path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  { path: 'reset-password', component:ResetPasswordComponent},
  { path: 'forget-password',component:ForgetPasswordComponent},
  { path: 'success', component:SuccessComponent},
  //user-management
  { path: 'user-management', component:UserManagementComponent , canActivate:[AuthGuard]},
  { path: 'view-user/:id', component:ViewUserComponent, canActivate:[AuthGuard]},
  { path: 'view-company', component:ViewCompanyComponent, canActivate:[AuthGuard]},
  //sub-admin
  { path: 'add-sub-admin', component:AddSubAdminComponent, canActivate:[AuthGuard]},
  { path: 'edit-sub-admin/:id', component:EditSubAdminComponent, canActivate:[AuthGuard]},
  { path: 'view-sub-admin/:id', component:ViewSubAdminComponent, canActivate:[AuthGuard]},
  {path : 'sub-admin-management', component : SubAdminManagementComponent, canActivate:[AuthGuard]},
  //change-password
  { path: 'change-password', component:ChangePasswordComponent},
  // static-page-management
  { path: 'static-page-management', component:StaticPageManagementComponent, canActivate:[AuthGuard]},
  { path: 'edit-static-page/:id/:type', component:EditStaticPageComponent, canActivate:[AuthGuard]},
  { path: 'view-static-page/:type', component:ViewStaticPageComponent, canActivate:[AuthGuard]},
  // contact-us-management
  { path: 'contact-us', component:ContactUsManagementComponent, canActivate:[AuthGuard]},
  { path: 'view-contact/:id', component:ViewContactComponent, canActivate:[AuthGuard]},
  {path : 'contact-us-management',component : ContactUsManagementComponent, canActivate:[AuthGuard]},
  // subscription-management
  { path: 'subscription-management', component:SubscriptionManagementComponent, canActivate:[AuthGuard]},
  { path: 'add-subscription', component:AddSubscriptionComponent, canActivate:[AuthGuard]},
  { path: 'edit-subscription/:id', component:EditSubscriptionComponent, canActivate:[AuthGuard]},
  { path: 'view-subscription/:id', component:ViewSubscriptionComponent, canActivate:[AuthGuard]},
  //transaction-management
  { path: 'transaction-management', component:TransactionManagementComponent, canActivate:[AuthGuard]},
  { path: 'view-transaction/:id', component:ViewTransactionComponent, canActivate:[AuthGuard]},
  // profile-screen
  { path: 'profile-screen', component:ProfileScreenComponent, canActivate:[AuthGuard]},
  
  { path: 'fail', component:FailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
