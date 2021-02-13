import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OtpComponent } from './pages/otp/otp.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HeaderComponent } from './pages/header/header.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// import { ActiveInactiveManagementComponent } from './pages/dashboard/active-inactive-management/';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

import { CategoryManagementComponent } from './pages/dashboard/category-management/category-management/category-management.component';
import { AddCategoryComponent } from './pages/dashboard/category-management/add-category/add-category.component';
import { EditCategoryComponent } from './pages/dashboard/category-management/edit-category/edit-category.component';
import { ViewCategoryComponent } from './pages/dashboard/category-management/view-category/view-category.component';
import { ChangePasswordComponent } from './pages/dashboard/change-password/change-password.component';
import { ConfigurationManagementComponent } from './pages/dashboard/configuration-management/configuration-management/configuration-management.component';
import { CouponManagementComponent } from './pages/dashboard/coupon-management/coupon-management/coupon-management.component';
import { FaqManagementComponent } from './pages/dashboard/faq-management/faq-management/faq-management.component';
import { AddFaqComponent } from './pages/dashboard/faq-management/add-faq/add-faq.component';
import { EditFaqComponent } from './pages/dashboard/faq-management/edit-faq/edit-faq.component';
import { ViewFaqComponent } from './pages/dashboard/faq-management/view-faq/view-faq.component';
import { TransactionManagementComponent } from './pages/dashboard/transaction-management/transaction-management/transaction-management.component';
import { HelpCenterManagementComponent } from './pages/dashboard/help-center-management/help-center-management/help-center-management.component';
import { ViewHelpCenterComponent } from './pages/dashboard/help-center-management/view-help-center/view-help-center.component';
import { UserManagementComponent } from './pages/dashboard/user-management/user-management/user-management.component'
import { MartManagementComponent } from './pages/dashboard/mart-management/mart-management/mart-management.component';
import { AddMartComponent } from './pages/dashboard/mart-management/add-mart/add-mart.component';
import { EditMartComponent } from './pages/dashboard/mart-management/edit-mart/edit-mart.component';
import { ViewMartComponent } from './pages/dashboard/mart-management/view-mart/view-mart.component';
import { MyProfileComponent } from './pages/dashboard/my-profile/my-profile.component';
import { RetailerManagementComponent } from './pages/dashboard/retailer-management/retailer-management/retailer-management.component';
import { ViewRetailerComponent } from './pages/dashboard/retailer-management/view-retailer/view-retailer.component';
import { RoleAssignmentManagementComponent } from './pages/dashboard/role-assignment-management/role-assignment-management/role-assignment-management.component';
import { AddSubUserComponent } from './pages/dashboard/role-assignment-management/add-sub-user/add-sub-user.component';
import { EditSubUserComponent } from './pages/dashboard/role-assignment-management/edit-sub-user/edit-sub-user.component';
import { ViewSubUserComponent } from './pages/dashboard/role-assignment-management/view-sub-user/view-sub-user.component';
import { RoleManagementComponent } from './pages/dashboard/role-management/role-management/role-management.component';
import { AddRoleComponent } from './pages/dashboard/role-management/add-role/add-role.component';
import { EditRoleComponent } from './pages/dashboard/role-management/edit-role/edit-role.component';
import { ViewRoleComponent } from './pages/dashboard/role-management/view-role/view-role.component';
import { StaticPageManagementComponent } from './pages/dashboard/static-page-management/static-page-management/static-page-management.component';
import { EditStaticPageComponent } from './pages/dashboard/static-page-management/edit-static-page/edit-static-page.component';
import { ViewStaticPageComponent } from './pages/dashboard/static-page-management/view-static-page/view-static-page.component';
import { SubCategoryManagementComponent } from './pages/dashboard/sub-category-management/sub-category-management/sub-category-management.component';
import { AddSubCategoryComponent } from './pages/dashboard/sub-category-management/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './pages/dashboard/sub-category-management/edit-sub-category/edit-sub-category.component';
import { ViewSubCategoryComponent } from './pages/dashboard/sub-category-management/view-sub-category/view-sub-category.component';
import { ViewTransactionComponent } from './pages/dashboard/transaction-management/view-transaction/view-transaction.component';
import { ViewUserComponent } from './pages/dashboard/user-management/view-user/view-user.component';
import { WeeklyEmailTemplateComponent } from './pages/dashboard/weekly-email-template/weekly-email-template/weekly-email-template.component';
import { AddEmailTemplateComponent } from './pages/dashboard/weekly-email-template/add-email-template/add-email-template.component';
import { EditEmailTemplateComponent } from './pages/dashboard/weekly-email-template/edit-email-template/edit-email-template.component';
import { ViewEmailTemplateComponent } from './pages/dashboard/weekly-email-template/view-email-template/view-email-template.component';
import { ViewLogComponent } from './pages/dashboard/user-management/view-log/view-log.component';
import { ViewUserWishlistComponent } from './pages/dashboard/user-management/view-user-wishlist/view-user-wishlist.component';
import { AuthGuard } from './guard/auth.guard';
import { OtpProfileComponent } from './pages/dashboard/otp-profile/otp-profile.component';
import { ViewCouponComponent } from './pages/dashboard/coupon-management/view-coupon/view-coupon.component';
import { ActiveInactiveManagementComponent } from './pages/dashboard/active-inactive-management/active-inactive-management.component';
import { ReportManagementComponent } from './pages/dashboard/report-management/report-management/report-management.component';
import { ViewRetailerCouponComponent } from './pages/dashboard/retailer-management/view-retailer-coupon/view-retailer-coupon.component';
import { ViewEnduserComponent } from './pages/dashboard/report-management/view-enduser/view-enduser.component';
import { ViewCouponreportComponent } from './pages/dashboard/report-management/view-couponreport/view-couponreport.component';


const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'notification', component: NotificationComponent },
  // active/inactive management
  { path: 'active-inactive-management', component: ActiveInactiveManagementComponent, canActivate: [AuthGuard] },
  // category management
  { path: 'category-management', component: CategoryManagementComponent ,canActivate: [AuthGuard] },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'edit-category', component: EditCategoryComponent },
  { path: 'view-category', component: ViewCategoryComponent },
  // change password
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  // configuration
  { path: 'configuration-management', component: ConfigurationManagementComponent , canActivate: [AuthGuard]},
  // coupon management
  { path: 'coupon-management', component: CouponManagementComponent , canActivate: [AuthGuard]},
  // faq management
  { path: 'faq-management', component: FaqManagementComponent , canActivate: [AuthGuard]},
  { path: 'add-faq', component: AddFaqComponent },
  { path: 'edit-faq/:id', component: EditFaqComponent },
  { path: 'view-faq', component: ViewFaqComponent },
  // help management
  { path: 'help-center-management', component: HelpCenterManagementComponent , canActivate: [AuthGuard]},
  { path: 'view-help-center', component: ViewHelpCenterComponent },
  // mart management
  { path: 'mart-management', component: MartManagementComponent , canActivate: [AuthGuard]},
  { path: 'add-mart', component: AddMartComponent },
  { path: 'edit-mart', component: EditMartComponent },
  { path: 'view-mart', component: ViewMartComponent },
  // my profile
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'otp-profile', component:OtpProfileComponent},
  // retailer management
  { path: 'retailer-management', component: RetailerManagementComponent, canActivate: [AuthGuard] },
  { path: 'view-retailer', component: ViewRetailerComponent },
  // { path: 'view-retailer/:id', component: ViewRetailerComponent },
  // role assignment management (sub-admin management)
  { path: 'role-assignment-management', component: RoleAssignmentManagementComponent, canActivate: [AuthGuard] },
  { path: 'add-sub-user', component: AddSubUserComponent },
  { path: 'edit-sub-user/:id', component: EditSubUserComponent },
  { path: 'view-sub-user/:id', component: ViewSubUserComponent },
  // role management
  { path: 'role-management', component: RoleManagementComponent, canActivate:[AuthGuard] },
  { path: 'add-role', component: AddRoleComponent },
  { path: 'edit-role', component: EditRoleComponent },
  { path: 'view-role', component: ViewRoleComponent },
  // static page management
  { path: 'static-page-management', component: StaticPageManagementComponent, canActivate: [AuthGuard] },
  { path: 'edit-static-page', component: EditStaticPageComponent },
  { path: 'view-static-page/:title/:id', component: ViewStaticPageComponent },
  // sub-category management
  { path: 'sub-category-management', component: SubCategoryManagementComponent,canActivate: [AuthGuard] },
  { path: 'add-sub-category', component: AddSubCategoryComponent },
  { path: 'edit-sub-category', component: EditSubCategoryComponent },
  { path: 'view-sub-category', component: ViewSubCategoryComponent },
  // transection-management
  { path: 'transaction-management', component: TransactionManagementComponent, canActivate: [AuthGuard] },
  { path: 'view-transaction', component: ViewTransactionComponent },
  // user management
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'view-user', component: ViewUserComponent },
  { path: 'view-user-wishlist', component: ViewUserWishlistComponent },
  { path: 'view-log', component: ViewLogComponent },
  // weekly email template
  { path: 'weekly-email-template', component: WeeklyEmailTemplateComponent, canActivate: [AuthGuard] },
  { path: 'add-email-template', component: AddEmailTemplateComponent },
  { path: 'edit-email-template', component: EditEmailTemplateComponent },
  { path: 'view-email-template', component: ViewEmailTemplateComponent },
  { path: 'view-coupon/:id', component: ViewCouponComponent},
  { path: 'report-management', component:ReportManagementComponent},
  { path: 'view-retailerCoupon', component:ViewRetailerCouponComponent},
  { path: 'view-enduser', component:ViewEnduserComponent},
  { path: 'view-couponreport', component:ViewCouponreportComponent},
  // page not found
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
