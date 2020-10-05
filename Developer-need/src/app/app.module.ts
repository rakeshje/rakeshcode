import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    CustomerManagementComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    ViewCustomerComponent,
    CorporateManagementComponent,
    AddCorporateComponent,
    EditCorporateComponent,
    ViewCorporateComponent,
    CompanyManagementComponent,
    ViewCompanyComponent,
    EditCompanyComponent,
    PractionerManagementComponent,
    AddPractionerComponent,
    EditPractionerComponent,
    ViewPractionerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 2000
    }),
    NgxSpinnerModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
