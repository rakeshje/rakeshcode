// module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { CKEditorModule } from 'ngx-ckeditor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';

// component
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserManagementComponent } from './pages/dashboard/user-management/user-management/user-management.component';
import { ViewUserComponent } from './pages/dashboard/user-management/view-user/view-user.component';
import { EditUserComponent } from './pages/dashboard/user-management/edit-user/edit-user.component';
import { HospitalManagementComponent } from './pages/dashboard/hospital-management/hospital-management/hospital-management.component';
import { AddHospitalComponent } from './pages/dashboard/hospital-management/add-hospital/add-hospital.component';
import { EditHospitalComponent } from './pages/dashboard/hospital-management/edit-hospital/edit-hospital.component';
import { TestCenterManagementComponent } from './pages/dashboard/test-center-management/test-center-management/test-center-management.component';
import { AddTestCenterComponent } from './pages/dashboard/test-center-management/add-test-center/add-test-center.component';
import { EditTestCenterComponent } from './pages/dashboard/test-center-management/edit-test-center/edit-test-center.component';
import { HelplineNumberComponent } from './pages/dashboard/helpline-number/helpline-number/helpline-number.component';
import { AddNumberComponent } from './pages/dashboard/helpline-number/add-number/add-number.component';
import { EditNumberComponent } from './pages/dashboard/helpline-number/edit-number/edit-number.component';
import { NotificationManagementComponent } from './pages/dashboard/notification-management/notification-management.component';
import { MyProfileComponent } from './pages/dashboard/my-profile/my-profile/my-profile.component';
import { EditMyProfileComponent } from './pages/dashboard/my-profile/edit-my-profile/edit-my-profile.component';
import { ChangePasswordComponent } from './pages/dashboard/change-password/change-password.component';
import { StaticContentManagementComponent } from './pages/dashboard/static-content-management/static-content-management/static-content-management.component';
import { EditStaticContentManagementComponent } from './pages/dashboard/static-content-management/edit-static-content-management/edit-static-content-management.component';
import { FaqComponent } from './pages/dashboard/faq/faq/faq.component';
import { AddFaqComponent } from './pages/dashboard/faq/add-faq/add-faq.component';
import { EditFaqComponent } from './pages/dashboard/faq/edit-faq/edit-faq.component';
import { ViewFaqComponent } from './pages/dashboard/faq/view-faq/view-faq.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { ViewHospitalComponent } from './pages/dashboard/hospital-management/view-hospital/view-hospital/view-hospital.component';
import { ErrorInterceptor } from './provider/interceptor/error-interceptor/error-interceptor';
import { AuthGuard } from './guard/auth.guard';
import { ViewTestCenterComponent } from './pages/dashboard/test-center-management/view-test-center/view-test-center/view-test-center.component';
import { ViewPatientManagementTestCenterComponent } from './pages/dashboard/test-center-management/view-test-center/view-patient-management-test-center/view-patient-management-test-center.component';
import { ViewPlasmaDonatedPatientManagementTestCenterComponent } from './pages/dashboard/test-center-management/view-test-center/view-plasma-donated-patient-management-test-center/view-plasma-donated-patient-management-test-center.component';
import { ViewPatientManagementHospitalComponent } from './pages/dashboard/hospital-management/view-hospital/view-patient-management-hospital/view-patient-management-hospital.component';
import { ViewPlasmaDonatedPatientManagementHospitalComponent } from './pages/dashboard/hospital-management/view-hospital/view-plasma-donated-patient-management-hospital/view-plasma-donated-patient-management-hospital.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddUserComponent } from './pages/dashboard/user-management/add-user/add-user.component';
import { CorporateCustomerManagementComponent } from './pages/corporate-customer-management/corporate-customer-management.component';
import { AddCorporateCustomerComponent } from './pages/corporate-customer-management/add-corporate-customer/add-corporate-customer.component';
import { EditCorporateCustomerComponent } from './pages/corporate-customer-management/edit-corporate-customer/edit-corporate-customer.component';
import { ViewCorporateCustomerComponent } from './pages/corporate-customer-management/view-corporate-customer/view-corporate-customer.component';
import { PractitionerManagementComponent } from './pages/practitioner-management/practitioner-management.component';
import { AddPractitionerComponent } from './pages/practitioner-management/add-practitioner/add-practitioner.component';
import { EditPractitionerComponent } from './pages/practitioner-management/edit-practitioner/edit-practitioner.component';
import { ViewPractitionerComponent } from './pages/practitioner-management/view-practitioner/view-practitioner.component';
import { ViewCompaniesComponent } from './pages/view-companies/view-companies.component';
import { ViewCompaniesEditComponent } from './pages/view-companies/view-companies-edit/view-companies-edit.component';
import { ViewCompaniesViewComponent } from './pages/view-companies/view-companies-view/view-companies-view.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { AddProductManagementComponent } from './pages/product-management/add-product-management/add-product-management.component';
import { EditProductManagementComponent } from './pages/product-management/edit-product-management/edit-product-management.component';
import { ViewProductManagementComponent } from './pages/product-management/view-product-management/view-product-management.component';
import { GiftCardManagementComponent } from './pages/gift-card-management/gift-card-management.component';
import { AddGiftComponent } from './pages/gift-card-management/add-gift/add-gift.component';
import { EditGiftComponent } from './pages/gift-card-management/edit-gift/edit-gift.component';
import { HomeVisitServiceComponent } from './pages/home-visit-service/home-visit-service.component';
import { AddHomeVisitComponent } from './pages/home-visit-service/add-home-visit/add-home-visit.component';
import { EditHomeVisitComponent } from './pages/home-visit-service/edit-home-visit/edit-home-visit.component';
import { ViewHomeVisitComponent } from './pages/home-visit-service/view-home-visit/view-home-visit.component';
import { AddNotificationComponent } from './pages/dashboard/notification-management/add-notification/add-notification.component';
import { ViewNotificationComponent } from './pages/dashboard/notification-management/view-notification/view-notification.component';
import { OtpComponent } from './pages/otp/otp.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { EditAboutUsComponent } from './pages/edit-about-us/edit-about-us.component';
import { ViewPrivacyPolicyComponent } from './pages/view-privacy-policy/view-privacy-policy.component';
import { EditPrivacyPolicyComponent } from './pages/edit-privacy-policy/edit-privacy-policy.component';
import { ViewTermsComponent } from './pages/view-terms/view-terms.component';
import { EditTermsComponent } from './pages/edit-terms/edit-terms.component';
// import { NgOtpInputModule } from 'ng-otp-input';
export const MyDefaultTooltipOptions: TooltipOptions = {
  'placement': 'top',
  'show-delay': 100,
  'theme': 'light',
  'animation-duration': 1000,
  'tooltip-class': 'tooltip-class-custom'
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    UserManagementComponent,
    ViewUserComponent,
    EditUserComponent,
    HospitalManagementComponent,
    AddHospitalComponent,
    EditHospitalComponent,
    TestCenterManagementComponent,
    AddTestCenterComponent,
    EditTestCenterComponent,
    HelplineNumberComponent,
    AddNumberComponent,
    EditNumberComponent,
    NotificationManagementComponent,
    MyProfileComponent,
    EditMyProfileComponent,
    ChangePasswordComponent,
    StaticContentManagementComponent,
    EditStaticContentManagementComponent,
    FaqComponent,
    AddFaqComponent,
    EditFaqComponent,
    ViewFaqComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ViewHospitalComponent,
    ViewTestCenterComponent,
    ViewPatientManagementTestCenterComponent,
    ViewPlasmaDonatedPatientManagementTestCenterComponent,
    ViewPatientManagementHospitalComponent,
    ViewPlasmaDonatedPatientManagementHospitalComponent,
    AddUserComponent,
    CorporateCustomerManagementComponent,
    AddCorporateCustomerComponent,
    EditCorporateCustomerComponent,
    ViewCorporateCustomerComponent,
    PractitionerManagementComponent,
    AddPractitionerComponent,
    EditPractitionerComponent,
    ViewPractitionerComponent,
    ViewCompaniesComponent,
    ViewCompaniesEditComponent,
    ViewCompaniesViewComponent,
    ProductManagementComponent,
    AddProductManagementComponent,
    EditProductManagementComponent,
    ViewProductManagementComponent,
    GiftCardManagementComponent,
    AddGiftComponent,
    EditGiftComponent,
    HomeVisitServiceComponent,
    AddHomeVisitComponent,
    EditHomeVisitComponent,
    ViewHomeVisitComponent,
    AddNotificationComponent,
    ViewNotificationComponent,
    OtpComponent,
    AboutUsComponent,
    EditAboutUsComponent,
    ViewPrivacyPolicyComponent,
    EditPrivacyPolicyComponent,
    ViewTermsComponent,
    EditTermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    AngularFontAwesomeModule,
    CKEditorModule,
    // NgOtpInputModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 2000
    }),
    NgxSpinnerModule,
    NgxPaginationModule,
    TooltipModule.forRoot(MyDefaultTooltipOptions as TooltipOptions),
    NgMultiSelectDropDownModule.forRoot()

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
