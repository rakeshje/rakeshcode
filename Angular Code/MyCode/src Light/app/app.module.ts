import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { OtpComponent } from './pages/otp/otp.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HeaderComponent } from './pages/header/header.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { UserManagementComponent } from './pages/dashboard/user-management/user-management/user-management.component';
import { ViewUserComponent } from './pages/dashboard/user-management/view-user/view-user.component';
import { RetailerManagementComponent } from './pages/dashboard/retailer-management/retailer-management/retailer-management.component';
import { ViewRetailerComponent } from './pages/dashboard/retailer-management/view-retailer/view-retailer.component';
import { CouponManagementComponent } from './pages/dashboard/coupon-management/coupon-management/coupon-management.component';
import { RoleManagementComponent } from './pages/dashboard/role-management/role-management/role-management.component';
import { AddRoleComponent } from './pages/dashboard/role-management/add-role/add-role.component';
import { EditRoleComponent } from './pages/dashboard/role-management/edit-role/edit-role.component';
import { ViewRoleComponent } from './pages/dashboard/role-management/view-role/view-role.component';
import { RoleAssignmentManagementComponent } from './pages/dashboard/role-assignment-management/role-assignment-management/role-assignment-management.component';
import { ViewSubUserComponent } from './pages/dashboard/role-assignment-management/view-sub-user/view-sub-user.component';
import { EditSubUserComponent } from './pages/dashboard/role-assignment-management/edit-sub-user/edit-sub-user.component';
import { AddSubUserComponent } from './pages/dashboard/role-assignment-management/add-sub-user/add-sub-user.component';
import { CategoryManagementComponent } from './pages/dashboard/category-management/category-management/category-management.component';
import { AddCategoryComponent } from './pages/dashboard/category-management/add-category/add-category.component';
import { EditCategoryComponent } from './pages/dashboard/category-management/edit-category/edit-category.component';
import { ViewCategoryComponent } from './pages/dashboard/category-management/view-category/view-category.component';
import { SubCategoryManagementComponent } from './pages/dashboard/sub-category-management/sub-category-management/sub-category-management.component';
import { AddSubCategoryComponent } from './pages/dashboard/sub-category-management/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './pages/dashboard/sub-category-management/edit-sub-category/edit-sub-category.component';
import { ViewSubCategoryComponent } from './pages/dashboard/sub-category-management/view-sub-category/view-sub-category.component';
import { MartManagementComponent } from './pages/dashboard/mart-management/mart-management/mart-management.component';
import { AddMartComponent } from './pages/dashboard/mart-management/add-mart/add-mart.component';
import { EditMartComponent } from './pages/dashboard/mart-management/edit-mart/edit-mart.component';
import { ViewMartComponent } from './pages/dashboard/mart-management/view-mart/view-mart.component';
import { ConfigurationManagementComponent } from './pages/dashboard/configuration-management/configuration-management/configuration-management.component';
import { ActiveInactiveManagementComponent } from './pages/dashboard/active-inactive-management/active-inactive-management.component';
import { TransactionManagementComponent } from './pages/dashboard/transaction-management/transaction-management/transaction-management.component';
import { ViewTransactionComponent } from './pages/dashboard/transaction-management/view-transaction/view-transaction.component';
import { HelpCenterManagementComponent } from './pages/dashboard/help-center-management/help-center-management/help-center-management.component';
import { ViewHelpCenterComponent } from './pages/dashboard/help-center-management/view-help-center/view-help-center.component';
import { StaticPageManagementComponent } from './pages/dashboard/static-page-management/static-page-management/static-page-management.component';
import { ViewStaticPageComponent } from './pages/dashboard/static-page-management/view-static-page/view-static-page.component';
import { EditStaticPageComponent } from './pages/dashboard/static-page-management/edit-static-page/edit-static-page.component';
import { FaqManagementComponent } from './pages/dashboard/faq-management/faq-management/faq-management.component';
import { ViewFaqComponent } from './pages/dashboard/faq-management/view-faq/view-faq.component';
import { EditFaqComponent } from './pages/dashboard/faq-management/edit-faq/edit-faq.component';
import { AddFaqComponent } from './pages/dashboard/faq-management/add-faq/add-faq.component';
import { MyProfileComponent } from './pages/dashboard/my-profile/my-profile.component';
import { ChangePasswordComponent } from './pages/dashboard/change-password/change-password.component';
import { WeeklyEmailTemplateComponent } from './pages/dashboard/weekly-email-template/weekly-email-template/weekly-email-template.component';
import { ViewEmailTemplateComponent } from './pages/dashboard/weekly-email-template/view-email-template/view-email-template.component';
import { AddEmailTemplateComponent } from './pages/dashboard/weekly-email-template/add-email-template/add-email-template.component';
import { EditEmailTemplateComponent } from './pages/dashboard/weekly-email-template/edit-email-template/edit-email-template.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './pages/footer/footer.component'
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NgOtpInputModule } from 'ng-otp-input';
import { ViewUserWishlistComponent } from './pages/dashboard/user-management/view-user-wishlist/view-user-wishlist.component';
import { ViewLogComponent } from './pages/dashboard/user-management/view-log/view-log.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { AuthGuard } from './guard/auth.guard';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { OtpProfileComponent } from './pages/dashboard/otp-profile/otp-profile.component'
import { ViewCouponComponent } from './pages/dashboard/coupon-management/view-coupon/view-coupon.component';
import { ReportManagementComponent } from './pages/dashboard/report-management/report-management/report-management.component';
import { ViewRetailerCouponComponent } from './pages/dashboard/retailer-management/view-retailer-coupon/view-retailer-coupon.component';
import { ViewEnduserComponent } from './pages/dashboard/report-management/view-enduser/view-enduser.component';
import { ViewCouponreportComponent } from './pages/dashboard/report-management/view-couponreport/view-couponreport.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OtpComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    SidebarComponent,
    NotificationComponent,
    UserManagementComponent,
    ViewUserComponent,
    RetailerManagementComponent,
    ViewRetailerComponent,
    CouponManagementComponent,
    RoleManagementComponent,
    AddRoleComponent,
    EditRoleComponent,
    ViewRoleComponent,
    RoleAssignmentManagementComponent,
    ViewSubUserComponent,
    EditSubUserComponent,
    AddSubUserComponent,
    CategoryManagementComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ViewCategoryComponent,
    SubCategoryManagementComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent,
    ViewSubCategoryComponent,
    MartManagementComponent,
    AddMartComponent,
    EditMartComponent,
    ViewMartComponent,
    ConfigurationManagementComponent,
    ActiveInactiveManagementComponent,
    TransactionManagementComponent,
    ViewTransactionComponent,
    HelpCenterManagementComponent,
    ViewHelpCenterComponent,
    StaticPageManagementComponent,
    ViewStaticPageComponent,
    EditStaticPageComponent,
    FaqManagementComponent,
    ViewFaqComponent,
    EditFaqComponent,
    AddFaqComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    WeeklyEmailTemplateComponent,
    ViewEmailTemplateComponent,
    AddEmailTemplateComponent,
    EditEmailTemplateComponent,
    PageNotFoundComponent,
    ResetPasswordComponent,
    FooterComponent,
    ViewUserWishlistComponent,
    ViewLogComponent,
    OtpProfileComponent,
    ViewCouponComponent,
    ReportManagementComponent,
    ViewRetailerCouponComponent,
    ViewEnduserComponent,
    ViewCouponreportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      maxOpened: 1,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 2000
    }), // ToastrModule added
    NgOtpInputModule,
    NgxPaginationModule,
    SelectDropDownModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
