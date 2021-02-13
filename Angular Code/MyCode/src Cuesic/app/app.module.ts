import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { UserManagementComponent } from './pages/dashboard/user-management/user-management.component';
import { ViewUserComponent } from './pages/dashboard/user-management/view-user/view-user.component';
import { ViewCompanyComponent } from './pages/dashboard/user-management/view-company/view-company.component';
import { SubAdminManagementComponent } from './pages/dashboard/sub-admin-management/sub-admin-management/sub-admin-management.component';
import { AddSubAdminComponent } from './pages/dashboard/sub-admin-management/add-sub-admin/add-sub-admin.component';
import { EditSubAdminComponent } from './pages/dashboard/sub-admin-management/edit-sub-admin/edit-sub-admin.component';
import { ViewSubAdminComponent } from './pages/dashboard/sub-admin-management/view-sub-admin/view-sub-admin.component';
import { ChangePasswordComponent } from './pages/dashboard/change-password/change-password.component';
import { StaticPageManagementComponent } from './pages/dashboard/static-page-management/static-page-management/static-page-management.component';
import { ViewStaticPageComponent } from './pages/dashboard/static-page-management/view-static-page/view-static-page.component';
import { EditStaticPageComponent } from './pages/dashboard/static-page-management/edit-static-page/edit-static-page.component';
import { ContactUsManagementComponent } from './pages/dashboard/contact-us-management/contact-us-management/contact-us-management.component';
import { ViewContactComponent } from './pages/dashboard/contact-us-management/view-contact/view-contact.component';
import { SubscriptionManagementComponent } from './pages/dashboard/subscription-management/subscription-management/subscription-management.component';
import { AddSubscriptionComponent } from './pages/dashboard/subscription-management/add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from './pages/dashboard/subscription-management/edit-subscription/edit-subscription.component';
import { ViewSubscriptionComponent } from './pages/dashboard/subscription-management/view-subscription/view-subscription.component';
import { TransactionManagementComponent } from './pages/dashboard/transaction-management/transaction-management/transaction-management.component';
import { ViewTransactionComponent } from './pages/dashboard/transaction-management/view-transaction/view-transaction.component';
import { ProfileScreenComponent } from './pages/dashboard/profile-screen/profile-screen.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainserviceService } from './pages/provider/mainservice.service';
import { CKEditorModule } from 'ngx-ckeditor';
import { SidebarMenuComponent } from './pages/sidebar-menu/sidebar-menu.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import { ErrorInterceptor } from './pages/provider/interceptor/error-interceptor';
import { LogoutComponent } from './pages/logout/logout.component';
import { SuccessComponent } from './pages/dashboard/success/success.component';
import { FailComponent } from './pages/dashboard/fail/fail.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    UserManagementComponent,
    ViewUserComponent,
    ViewCompanyComponent,
    SubAdminManagementComponent,
    AddSubAdminComponent,
    EditSubAdminComponent,
    ViewSubAdminComponent,
    ChangePasswordComponent,
    StaticPageManagementComponent,
    ViewStaticPageComponent,
    EditStaticPageComponent,
    ContactUsManagementComponent,
    ViewContactComponent,
    SubscriptionManagementComponent,
    AddSubscriptionComponent,
    EditSubscriptionComponent,
    ViewSubscriptionComponent,
    TransactionManagementComponent,
    ViewTransactionComponent,
    ProfileScreenComponent,
    SidebarMenuComponent,
    HeaderComponent,
    FooterComponent,
    LogoutComponent,
    SuccessComponent,
    FailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    CKEditorModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 2000
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },MainserviceService,NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
