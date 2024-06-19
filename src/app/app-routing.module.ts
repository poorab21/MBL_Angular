import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AuthguardService } from '../assets/Services/authguard.service';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ContactComponent } from './contact/contact.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginGuard } from '../assets/Services/login.guard';
import { sessionGuard } from '../assets/Services/session.guard';

const routes: Routes = [
  { path : "" , component: LoginComponent , pathMatch: 'full' , canActivate: [LoginGuard] } ,
  { path : "register" , component: RegisterComponent , canActivate: [LoginGuard] },
  { path : "forgotPassword" , component: ForgotPasswordComponent , canActivate: [LoginGuard] },
  { path : "resetPassword" , component: NewPasswordComponent , canActivate: [LoginGuard] },
  { path : "onboarding" , component: OnboardingComponent , canActivate: [sessionGuard] , children: [
    { path: "" , pathMatch: 'full' , redirectTo: "dashboard" },
    { path: "dashboard" , component: DashboardComponent , canActivate: [AuthguardService] },
    { path: "contact" , component: ContactComponent , canActivate: [AuthguardService] },
    { path: "userDetails" , component: UserDetailsComponent , canActivate: [AuthguardService] },
    { path: "product" , loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) }
  ] },
  { path: "**" , component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
