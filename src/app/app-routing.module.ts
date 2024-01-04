import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AuthguardService } from './Services/authguard.service';

const routes: Routes = [
  { path : "" , component: LoginComponent } ,
  { path : "register" , component: RegisterComponent },
  { path : "dashboard" , component: DashboardComponent , canActivate: [AuthguardService] },
  { path : "forgotPassword" , component: ForgotPasswordComponent },
  { path : "resetPassword" , component: NewPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
