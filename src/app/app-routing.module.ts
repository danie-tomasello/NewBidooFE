import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewbidooComponent } from './newbidoo/newbidoo.component';
import { RouteguardService } from './services/routeguard.service';

const routes: Routes = [
  {path:'login', component : LoginComponent},
  {path:'', component : NewbidooComponent},
  {path:'home', component : NewbidooComponent},
  {path:'admin',component : NewbidooComponent,canActivate:[RouteguardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
