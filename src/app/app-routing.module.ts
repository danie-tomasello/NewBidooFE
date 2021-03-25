import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AsteComponent } from './aste/aste.component';
import { RouteguardService } from './services/routeguard.service';
import { VerifyComponent } from './registration/verify/verify.component';
import { Ruoli } from 'src/models/Ruoli';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'login', component : LoginComponent},
  {path:'', component : AsteComponent},
  {path:'home', component : AsteComponent},
  {path:'admin',component : AdminComponent,canActivate:[RouteguardService], data:{role: Ruoli.admin}},
  {path:'verify',component : VerifyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
