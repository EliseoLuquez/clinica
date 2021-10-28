import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvioEmailComponent } from 'src/app/componentes/envio-email/envio-email.component';
import { LoginComponent } from 'src/app/componentes/login/login.component';
import { RegisterComponent } from 'src/app/componentes/register/register.component';

const routes: Routes = [
  {path: 'registro', component: RegisterComponent},
  {path: '', redirectTo:'bienvenido', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'envio-email', component: EnvioEmailComponent},
  
  // {path: 'peliculas', loadChildren: () => import('./modulos/peliculas/peliculas.module').then(m => PeliculasModule)},
  // {path: 'actor', loadChildren: () => import('./modulos/actor/actor.module').then(m => ActorModule)},
  // {path: 'pipes', component: PipesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule { }
