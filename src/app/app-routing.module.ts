import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpComponent } from './emp/emp.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'dashboard', canActivate:[AuthGuard], component: DashboardComponent },
  { path: 'employee/:id', canActivate: [AuthGuard], component: EmpComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'change-password', canActivate: [AuthGuard], component: ChangePasswordComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
