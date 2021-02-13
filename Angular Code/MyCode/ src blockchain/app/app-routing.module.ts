import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { UserManagementComponent } from './pages/dashboard/user-management/user-management.component';
import { KycManagementComponent } from './pages/dashboard/kyc-management/kyc-management.component';
import { WalletManagementComponent } from './pages/dashboard/wallet-management/wallet-management.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MyProfileComponent } from './pages/dashboard/my-profile/my-profile.component';
import { EditProfileComponent } from './pages/dashboard/edit-profile/edit-profile.component';
import { TransactionManagementComponent } from './pages/dashboard/transaction-management/transaction-management.component';
import { ViewTransactionComponent } from './pages/dashboard/view-transaction/view-transaction.component';
import { HotColdWalletManagementComponent } from './pages/dashboard/hot-cold-wallet-management/hot-cold-wallet-management.component';
import { StaticContentManagementComponent } from './pages/dashboard/static-content-management/static-content-management.component';
import { TermsAndConditionsComponent } from './pages/dashboard/static-content-management/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/dashboard/static-content-management/privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './pages/dashboard/static-content-management/about-us/about-us.component';
import { FeeManagementComponent } from './pages/dashboard/fee-management/fee-management.component';
import { WithdrawalLimitComponent } from './pages/dashboard/withdrawal-limit/withdrawal-limit.component';
import { UserDetailsComponent } from './pages/dashboard/user-details/user-details.component';
import { WalletDetailsComponent } from './pages/dashboard/wallet-details/wallet-details.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ProfitLossManagementComponent } from './pages/dashboard/profit-loss-management/profit-loss-management.component';
import { UserDetailTradingComponent } from './pages/dashboard/user-detail-trading/user-detail-trading.component';
import { LoginSessionActivityComponent } from './pages/dashboard/login-session-activity/login-session-activity.component';
import { ViewUserTradingDetailComponent } from './pages/dashboard/view-user-trading-detail/view-user-trading-detail.component';
import { HotWalletManagementComponent } from './pages/dashboard/hot-wallet-management/hot-wallet-management.component';
import { ViewHotColdWalletManagementComponent } from './pages/dashboard/view-hot-cold-wallet-management/view-hot-cold-wallet-management.component';
import { TokenManagementComponent } from './pages/dashboard/token-management/token-management.component';
import { AddTokenComponent } from './pages/dashboard/add-token/add-token.component';
import { EditTokenComponent } from './pages/dashboard/edit-token/edit-token.component';
import { ViewTokenComponent } from './pages/dashboard/view-token/view-token.component';
import { TicketManagementComponent } from './pages/dashboard/ticket-management/ticket-management.component';
import { ViewTicketComponent } from './pages/dashboard/view-ticket/view-ticket.component';
import { ReplyTicketComponent } from './pages/dashboard/reply-ticket/reply-ticket.component';
import { SettingsComponent } from './pages/setting/settings/settings.component';
import { TakerMakeFeeComponent } from './pages/setting/taker-make-fee/taker-make-fee.component';
import { ViewLimitComponent } from './pages/setting/view-limit/view-limit.component';
import { WithdrawlFeeComponent } from './pages/setting/withdrawl-fee/withdrawl-fee.component';
import { WithdrawlLimitComponent } from './pages/setting/withdrawl-limit/withdrawl-limit.component';
import { KycDetailComponent } from './pages/kyc-management/kyc-detail/kyc-detail.component';
import { KycUpdateComponent } from './pages/kyc-management/kyc-update/kyc-update.component';
import { ManageFeeComponent } from './pages/fee-management/manage-fee/manage-fee.component';
import { StandardTradingFeeComponent } from './pages/fee-management/standard-trading-fee/standard-trading-fee.component';
import { MinTradingFeeComponent } from './pages/fee-management/min-trading-fee/min-trading-fee.component';
import { ChangePasswordComponent } from './pages/dashboard/change-password/change-password.component';
import { ContentManagementComponent } from './pages/dashboard/content-management/content-management.component';
import { UserManagementAdminComponent } from './pages/admin-management/user-management-admin/user-management-admin.component';
import { AdminDetailComponent } from './pages/admin-management/admin-detail/admin-detail.component';
import { AddAdministerComponent } from './pages/admin-management/add-administer/add-administer.component';
import { DepositeWalletComponent } from './pages/dashboard/deposite-wallet/deposite-wallet.component';
import { ViewFeeComponent } from './pages/dashboard/view-fee/view-fee.component';
import { UpdateWithdrawlAmountComponent } from './pages/fee-management/update-withdrawl-amount/update-withdrawl-amount.component';
import { MinWithdrawlAmountComponent } from './pages/fee-management/min-withdrawl-amount/min-withdrawl-amount.component';
import { FaqComponent } from './pages/faq-management/faq/faq.component';
import { AddFaqComponent } from './pages/faq-management/add-faq/add-faq.component';
import { EditFaqComponent } from './pages/faq-management/edit-faq/edit-faq.component';
import { AnnouncementComponent } from './pages/announcement-management/announcement/announcement.component';
import { AddAnnouncementComponent } from './pages/announcement-management/add-announcement/add-announcement.component';
import { EditAnnouncementComponent } from './pages/announcement-management/edit-announcement/edit-announcement.component';
import { ViewAnnouncementComponent } from './pages/announcement-management/view-announcement/view-announcement.component';
import { AllUserTraderComponent } from './pages/dashboard/all-user-trader/all-user-trader.component';
import { FiatComponent } from './pages/fiat-management/fiat/fiat.component';
import { SendMoneyComponent } from './pages/fiat-management/send-money/send-money.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: 'wallet-details/:id', component: WalletDetailsComponent },
  { path: 'kyc-management', component: KycManagementComponent },
  { path: 'wallet-management', component: WalletManagementComponent },
  { path: 'deposite-wallet', component:DepositeWalletComponent},
  { path: 'transaction-management', component: TransactionManagementComponent },
  { path: 'view-transaction/:id', component: ViewTransactionComponent },
  { path: 'withdrawal-limit', component: WithdrawalLimitComponent },
  { path: 'fee-management', component: FeeManagementComponent },
  { path: 'manage-fee', component: ManageFeeComponent},
  { path: 'standard-trading-fee', component: StandardTradingFeeComponent},
  { path: 'min-withdrawl-amount', component: MinWithdrawlAmountComponent},
  { path: 'update-withdrawl-amount/:data', component: UpdateWithdrawlAmountComponent},
  { path: 'min-trading-fee/:data', component: MinTradingFeeComponent},
  { path: 'profit-loss-management', component: ProfitLossManagementComponent },
  { path: 'user-detail-trading',component : UserDetailTradingComponent},
  { path: 'hot-cold-wallet-management/:data', component: HotColdWalletManagementComponent },
  { path: 'view-hot-cold-wallet-management/:data',component:ViewHotColdWalletManagementComponent },
  { path: 'hot-wallet-management', component:HotWalletManagementComponent},
  { path: 'static-content-management', component: StaticContentManagementComponent },
  { path: 'Terms And Condition', component: TermsAndConditionsComponent },
  { path: 'Privacy Policy', component: PrivacyPolicyComponent },
  { path: 'About Us', component: AboutUsComponent },
  { path: 'faq-management',component:FaqComponent},
  { path: 'add-faq', component:AddFaqComponent},
  { path: 'edit-faq', component:EditFaqComponent},
  { path: 'announcement-management', component:AnnouncementComponent},
  { path: 'add-announcement', component:AddAnnouncementComponent},
  { path: 'edit-announcement/:id', component:EditAnnouncementComponent},
  { path: 'view-announcement/:id', component:ViewAnnouncementComponent},
  { path: 'content-management', component:ContentManagementComponent},
  
  { path:'login-session-activity' ,component : LoginSessionActivityComponent},
  { path:'view-user-trading-detail' ,component : ViewUserTradingDetailComponent},
  { path: 'setting', component: SettingsComponent },
  { path: 'taker-maker-fee', component: TakerMakeFeeComponent},
  { path: 'view-limit', component: ViewLimitComponent },
  { path: 'view-fee', component:ViewFeeComponent},
  { path: 'withdrawl-fee', component: WithdrawlFeeComponent },
  { path: 'withdrawl-limit', component: WithdrawlLimitComponent },

  { path: 'user-management-admin', component: UserManagementAdminComponent },
  { path: 'admin-detail/:id', component: AdminDetailComponent },
  { path: 'add-administator', component: AddAdministerComponent },
  { path: 'kyc-detail/:id', component: KycDetailComponent},
  { path: 'kyc-update', component: KycUpdateComponent},

  { path: 'manage-fee', component: ManageFeeComponent},
  { path: 'standard-trading-fee', component: StandardTradingFeeComponent},
  { path: 'min-trading-fee', component: MinTradingFeeComponent},

  { path: 'my-profile', component: MyProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'change-password', component:ChangePasswordComponent},
  { path: 'token-management', component:TokenManagementComponent},
  { path: 'add-token', component:AddTokenComponent},
  { path: 'edit-token', component:EditTokenComponent},
  { path: 'view-token', component:ViewTokenComponent},
  { path: 'ticket-management', component:TicketManagementComponent},
  { path: 'view-ticket/:id', component:ViewTicketComponent},
  { path: 'reply-ticket/:id', component:ReplyTicketComponent},
  { path: 'limit', component:WithdrawalLimitComponent},
  { path: 'all-user-trader', component:AllUserTraderComponent},
  { path: 'fiat', component:FiatComponent},
  { path: 'send-money/:id', component:SendMoneyComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
