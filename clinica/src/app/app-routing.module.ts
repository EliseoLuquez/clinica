import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { IngresoModule } from './modulos/ingreso/ingreso.module';

const routes: Routes = [
  {path: 'bienvenida', component: BienvenidaComponent},
  {path: 'seccionUsuarios', component: SeccionUsuariosComponent},
  {path: '', redirectTo:'bienvenida', pathMatch:'full'},
  // {path: 'busqueda', component: BusquedaComponent},
  {path: 'ingreso', loadChildren: () => import('./modulos/ingreso/ingreso.module').then(m => IngresoModule)},
  // {path: 'actor', loadChildren: () => import('./modulos/actor/actor.module').then(m => ActorModule)},
  // {path: 'pipes', component: PipesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
