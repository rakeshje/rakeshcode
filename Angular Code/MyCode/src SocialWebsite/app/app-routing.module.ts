import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SelectLangComponent } from './components/select-lang/select-lang.component';
import { FriendlistComponent } from './components/friendlist/friendlist.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
// export class AuthguardGuard implements CanActivate {
import {AuthguardGuard } from './guards/authguard.guard'
import {Authguard2Guard } from './guards/authguard2.guard'
import { CreategroupComponent } from './creategroup/creategroup.component';
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
import { HelpComponent } from './components/help/help.component';
import { PostComponent } from 'src/app/components/post/post.component';
import { BiddingComponent } from './components/bidding/bidding.component';
import { BiddingCategoryComponent } from './components/bidding-category/bidding-category.component';
import { BiddingProductComponent } from './components/bidding-product/bidding-product.component';
import { CreateBiddingDetailsComponent } from './components/create-bidding-details/create-bidding-details.component';
import { ChatConversationComponent } from './components/chat-conversation/chat-conversation.component';
import { DashboardComponent } from './components/marketing/dashboard/dashboard.component';
import { MarketingDashboardComponent } from './components/marketing-dashboard/marketing-dashboard.component';
import { MarketShopByProductComponent } from './components/market-shop-by-product/market-shop-by-product.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { OrderReviewComponent } from './components/order-review/order-review.component';
import { ChangeAddressComponent } from './components/change-address/change-address.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { ChooseCardComponent } from './components/choose-card/choose-card.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { GroupDescriptionComponent } from './components/group-description/group-description.component';
import { ClassroomDescriptionComponent } from './components/classroom-description/classroom-description.component';
import { BiddingChatConversationComponent } from './components/bidding-chat-conversation/bidding-chat-conversation.component';
import { AddProductBiddingComponent } from './components/add-product-bidding/add-product-bidding.component';
import { ParticipantDetailsComponent } from './components/participant-details/participant-details.component';
import { ViewAdvertisementComponent } from './components/view-advertisement/view-advertisement.component';
import { DiscussionForumComponent } from './components/discussion-forum/discussion-forum.component';
import { ViewDiscussionForumComponent } from './components/view-discussion-forum/view-discussion-forum.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { FriendChatComponent } from './components/friend-chat/friend-chat.component';
import{ActivityProfileComponent} from './components/activity-profile/activity-profile.component'

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






const routes: Routes = [
    {
        path: '', component: HeaderComponent,
        children: [
            {path : '', redirectTo: 'dashboard', pathMatch:'full'},
            {path: 'dashboard', component: LoginComponent,canActivate: [Authguard2Guard]},
            {path: 'select-lang', component: SelectLangComponent,canActivate: [AuthguardGuard]},
            {path: 'friendlist/:id', component: FriendlistComponent ,canActivate: [AuthguardGuard]},
            {path: 'home', component: HomeComponent ,canActivate: [AuthguardGuard]},
            {path: 'settings', component: SettingsComponent ,canActivate: [AuthguardGuard]},
            {path: 'profile', component: ProfileComponent ,canActivate: [AuthguardGuard]},
            {path: 'creategroup',component:CreategroupComponent  ,canActivate: [AuthguardGuard]},
            {path: 'classroom/:id',component:ClassroomComponent,canActivate: [AuthguardGuard]},
            {path: 'jobs/:id',component:JobsComponent,canActivate: [AuthguardGuard]},
            {path: 'privacy-policy',component:PrivacyPolicyComponent,canActivate: [AuthguardGuard]},
            {path: 'terms-conditions',component:TermsConditionsComponent,canActivate: [AuthguardGuard]},
            {path: 'about-us',component:AboutUsComponent,canActivate: [AuthguardGuard]},
            {path: 'non-profit-group/:id',component:NonProfitGroupComponent,canActivate: [AuthguardGuard]},
            {path: 'bank/:id',component:BankComponent,canActivate: [AuthguardGuard]},
            {path: 'news',component:NewsComponent,canActivate: [AuthguardGuard]},
            {path: 'gaming-video/:id',component:GamingVideoComponent,canActivate: [AuthguardGuard]},
            {path: 'events/:id',component:EventsComponent,canActivate: [AuthguardGuard]},
            {path: 'help',component:HelpComponent,canActivate: [AuthguardGuard]},
            {path: 'post',component:PostComponent,canActivate: [AuthguardGuard]},
            {path: 'bidding',component:BiddingComponent,canActivate: [AuthguardGuard]},
            {path: 'bidding-category',component:BiddingCategoryComponent,canActivate: [AuthguardGuard]},
            {path: 'bidding-product',component:BiddingProductComponent,canActivate: [AuthguardGuard]},
            {path: 'create-bidding-details',component:CreateBiddingDetailsComponent,canActivate: [AuthguardGuard]},
            {path: 'chat-conversation', component:ChatConversationComponent,canActivate: [AuthguardGuard]},
            {path: 'product-description/:id', component:ProductDescriptionComponent,canActivate: [AuthguardGuard]},

            // marketing
            {path: 'marketing', component: DashboardComponent, canActivate: [AuthguardGuard]},
            {path: 'marketing-dashboard', component: MarketingDashboardComponent, canActivate: [AuthguardGuard]},
            {path: 'marketing-product', component: MarketShopByProductComponent, canActivate: [AuthguardGuard]},
            {path: 'product-information/:id', component: ProductInformationComponent, canActivate: [AuthguardGuard]},
            {path: 'add-product', component: AddProductComponent, canActivate: [AuthguardGuard]},
            {path: 'view-cart', component: ViewCartComponent, canActivate: [AuthguardGuard]},
            {path: 'order-review', component: OrderReviewComponent, canActivate: [AuthguardGuard]},
            {path: 'change-address', component: ChangeAddressComponent, canActivate: [AuthguardGuard]},
            {path: 'add-address', component: AddAddressComponent, canActivate: [AuthguardGuard]},
            {path: 'edit-address', component: EditAddressComponent, canActivate: [AuthguardGuard]},
            {path: 'choose-card', component: ChooseCardComponent, canActivate: [AuthguardGuard]},
            {path: 'group-description', component: GroupDescriptionComponent, canActivate: [AuthguardGuard]},
            {path: 'classroom-description', component: ClassroomDescriptionComponent, canActivate: [AuthguardGuard]},
            {path: 'bidding-chat-conversation', component: BiddingChatConversationComponent, canActivate: [AuthguardGuard]},
            {path: 'add-product-bidding' , component: AddProductBiddingComponent , canActivate: [AuthguardGuard]},
            {path: 'participant-details/:id', component: ParticipantDetailsComponent,canActivate:[AuthguardGuard]},
            {path: 'view-advertisement', component: ViewAdvertisementComponent,canActivate:[AuthguardGuard]},
            {path: 'discussion-forum', component:DiscussionForumComponent, canActivate:[AuthguardGuard]},
            {path: 'view-discussion-forum/:id', component: ViewDiscussionForumComponent, canActivate: [AuthguardGuard]},
            {path :'my-profile',component : MyProfileComponent, canActivate: [AuthguardGuard]},
            {path:'add-profile', component:AddProfileComponent, canActivate:[AuthguardGuard]},
            {path :'friend-chat',component : FriendChatComponent,canActivate : [AuthguardGuard]},
            {path:'activity-profile', component:ActivityProfileComponent,canActivate:[AuthguardGuard]},

            {path: 'createpage',component:CreatepageComponent  ,canActivate: [AuthguardGuard]},
            {path: 'page-descripton', component: PageDescriptonComponent, canActivate: [AuthguardGuard]},
            {path:'notification', component:NotificationComponent, canActivate:[AuthguardGuard]},
            {path:'contact', component:ContactUsComponent,canActivate:[AuthguardGuard]},
            {path:'change-password', component:ChangePasswordComponent, canActivate:[AuthguardGuard]},
            {path:'report-problem', component:ReportProblemComponent, canActivate:[AuthguardGuard]},
            {path:'reply-comment', component:ReplyCommentComponent, canActivate:[AuthguardGuard]},
            {path:'nonprofit-reply', component:NonprofitReplyComponent,canActivate:[AuthguardGuard]},
            {path:'event-reply', component:EventReplyComponent, canActivate:[AuthguardGuard]},
            {path:'game-reply', component:GameReplyComponent, canActivate:[AuthguardGuard]},
            {path:'adv-reply', component:AdvertisementReplyComponent, canActivate:[AuthguardGuard]},
            {path:'group-reply', component:GroupReplyComponent, canActivate:[AuthguardGuard]},
            {path:'class-reply', component:ClassReplyComponent, canActivate:[AuthguardGuard]},
            {path:'view-discussion-reply', component:ViewDiscussionReplyComponent, canActivate:[AuthguardGuard]}
            
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { 

}
