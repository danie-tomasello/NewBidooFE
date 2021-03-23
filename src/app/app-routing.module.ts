import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AsteComponent } from './aste/aste.component';
import { RouteguardService } from './services/routeguard.service';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {path:'login', component : LoginComponent},
  {path:'', component : AsteComponent},
  {path:'home', component : AsteComponent},
  {path:'admin',component : AsteComponent,canActivate:[RouteguardService]},
  {path:'verify',component : VerifyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
