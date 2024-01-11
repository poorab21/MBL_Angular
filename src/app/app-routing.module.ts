import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AuthguardService } from './Services/authguard.service';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ContactComponent } from './contact/contact.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  { path : "" , component: LoginComponent } ,
  { path : "register" , component: RegisterComponent },
  { path : "forgotPassword" , component: ForgotPasswordComponent },
  { path : "resetPassword" , component: NewPasswordComponent },
  { path : "onboarding" , component: OnboardingComponent , children: [
    { path: "" , redirectTo: "dashboard" , pathMatch: "full" },
    { path: "dashboard" , component: DashboardComponent , canActivate: [AuthguardService] },
    { path: "contact" , component: ContactComponent , canActivate: [AuthguardService] },
    { path: "userDetails" , component: UserDetailsComponent , canActivate: [AuthguardService] },
    { path: "product" , component: ProductComponent , children: [
      { path: "" , redirectTo: "list" , pathMatch: "full" }, 
      { path: "list" , component: ProductListComponent , canActivate: [AuthguardService] },
      { path: "create" , component: AddProductComponent , canActivate: [AuthguardService] }
    ]}
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
