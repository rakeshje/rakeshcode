import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ServerService } from './services/server.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SelectLangComponent } from './components/select-lang/select-lang.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FriendlistComponent } from './components/friendlist/friendlist.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { RightsidemenuComponent } from './components/rightsidemenu/rightsidemenu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { CreategroupComponent } from './creategroup/creategroup.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { NonProfitGroupComponent } from './components/non-profit-group/non-profit-group.component';
import { BankComponent } from './components/bank/bank.component';
import { NewsComponent } from './components/news/news.component';
import { GamingVideoComponent } from './components/gaming-video/gaming-video.component';
import { EventsComponent } from './components/events/events.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { HelpComponent } from './components/help/help.component';
import { PostComponent } from 'src/app/components/post/post.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxGoogleMapModule } from 'ngx-google-map';
import { SelectDropDownModule } from 'ngx-select-dropdown';
 
import { FriendsuggestionComponent } from './friendsuggestion/friendsuggestion.component';
import { BiddingComponent } from './components/bidding/bidding.component';
import { BiddingCategoryComponent } from './components/bidding-category/bidding-category.component';
import { BiddingProductComponent } from './components/bidding-product/bidding-product.component';
import { CreateBiddingDetailsComponent } from './components/create-bidding-details/create-bidding-details.component';
import { ChatConversationComponent } from './components/chat-conversation/chat-conversation.component';
import { DashboardComponent } from './components/marketing/dashboard/dashboard.component';
import { MarketingDashboardComponent } from './components/marketing-dashboard/marketing-dashboard.component';
import { MarketShopByProductComponent } from './components/market-shop-by-product/market-shop-by-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { ChangeAddressComponent } from './components/change-address/change-address.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { ChooseCardComponent } from './components/choose-card/choose-card.component'
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { GroupDescriptionComponent } from './components/group-description/group-description.component';
import { ClassroomDescriptionComponent } from './components/classroom-description/classroom-description.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { BiddingChatConversationComponent } from './components/bidding-chat-conversation/bidding-chat-conversation.component';
import { CountdownModule } from "ng2-date-countdown";
import { AddProductBiddingComponent } from './components/add-product-bidding/add-product-bidding.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ParticipantDetailsComponent } from './components/participant-details/participant-details.component';
import { ViewAdvertisementComponent } from './components/view-advertisement/view-advertisement.component';
import { DiscussionForumComponent } from './components/discussion-forum/discussion-forum.component';
import { ViewDiscussionForumComponent } from './components/view-discussion-forum/view-discussion-forum.component';
import { SharedModule } from './components/shared/shared.module';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { FriendChatComponent } from './components/friend-chat/friend-chat.component';
import { ActivityProfileComponent } from './components/activity-profile/activity-profile.component';
import { CreatepageComponent } from './components/createpage/createpage.component';
import { PageDescriptonComponent } from './components/page-descripton/page-descripton.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ReportProblemComponent } from './components/report-problem/report-problem.component';
import { ReplyCommentComponent } from './components/reply-comment/reply-comment.component';

import { NonprofitReplyComponent } from './components/nonprofit-reply/nonprofit-reply.component';
import { EventReplyComponent } from './components/event-reply/event-reply.component';
import { GameReplyComponent } from './components/game-reply/game-reply.component';
import { AdvertisementReplyComponent } from './components/advertisement-reply/advertisement-reply.component';
import { GroupReplyComponent } from './components/group-reply/group-reply.component';
import { ClassReplyComponent } from './components/class-reply/class-reply.component';
import { ViewDiscussionReplyComponent } from './components/view-discussion-reply/view-discussion-reply.component';

// const config1: SocketIoConfig = { url: 'http://172.16.1.89:2020', options: {} };
 const config1: SocketIoConfig = { url: 'http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1501', options: {} };

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("41710897701-0q4lkts38cp78o3nt2vs6a9k82nce1ga.apps.googleusercontent.com")
    // provider: new GoogleLoginProvider("995466877233-pvtu8q8fe3vg73op7ntuc57gtsgekn7p.apps.googleusercontent.com")261714322245-70uv6jb5em6of5u0mup3t5ilg7173d2u.apps.googleusercontent.com
    //  provider: new GoogleLoginProvider("261714322245-70uv6jb5em6of5u0mup3t5ilg7173d2u.apps.googleusercontent.com")
    //  provider: new GoogleLoginProvider("com.googleusercontent.apps.261714322245-70uv6jb5em6of5u0mup3t5ilg7173d2u")
     
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("438458310050745")
  }
]);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SelectLangComponent,
    FriendlistComponent,
    SidemenuComponent,
    RightsidemenuComponent,
    ProfileComponent,
    HomeComponent,
    SettingsComponent,
    CreategroupComponent,
    ClassroomComponent,
    JobsComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    AboutUsComponent,
    NonProfitGroupComponent,
    BankComponent,
    NewsComponent,
    GamingVideoComponent,
    EventsComponent,
    HelpComponent,
    PostComponent,
   
    FriendsuggestionComponent,
    BiddingComponent,
    BiddingCategoryComponent,
    BiddingProductComponent,
    CreateBiddingDetailsComponent,
    ChatConversationComponent,
    DashboardComponent,
    MarketingDashboardComponent,
    MarketShopByProductComponent,
    AddProductComponent,
    ProductInformationComponent,
    ViewCartComponent,
    OrderReviewComponent,
    ChangeAddressComponent,
    AddAddressComponent,
    EditAddressComponent,
    ChooseCardComponent,
    ProductDescriptionComponent,
    GroupDescriptionComponent,
    ClassroomDescriptionComponent,
    BiddingChatConversationComponent,
    AddProductBiddingComponent,
    ParticipantDetailsComponent,
    ViewAdvertisementComponent,
    DiscussionForumComponent,
    ViewDiscussionForumComponent,
    MyProfileComponent,
    AddProfileComponent,
    FriendChatComponent,
    ActivityProfileComponent,
    CreatepageComponent,
    PageDescriptonComponent,
    NotificationComponent,
    ContactUsComponent,
    ChangePasswordComponent,
    ReportProblemComponent,
    ReplyCommentComponent,
    NonprofitReplyComponent,
    EventReplyComponent,
    GameReplyComponent,
    AdvertisementReplyComponent,
    GroupReplyComponent,
    ClassReplyComponent,
    ViewDiscussionReplyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AmazingTimePickerModule,
    ToastrModule.forRoot({
      maxOpened :1,
      preventDuplicates: true,
    }),
    NgxPaginationModule,
    NgxMyDatePickerModule.forRoot(),
   
    SocialLoginModule,
    NgMultiSelectDropDownModule.forRoot(),
    GooglePlaceModule,
    NgxGoogleMapModule,
    SelectDropDownModule,
    SocketIoModule.forRoot(config1),
    SlideshowModule,
    PickerModule,
    CountdownModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ServerService, multi: true },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }