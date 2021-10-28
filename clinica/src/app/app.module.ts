import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { IngresoModule } from './modulos/ingreso/ingreso.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { HttpClientModule } from '@angular/common/http';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { SolicitarTurnoComponent } from './componentes/solicitar-turno/solicitar-turno.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { EnvioEmailComponent } from './componentes/envio-email/envio-email.component';
import { AltaEspecialidadComponent } from './componentes/alta-especialidad/alta-especialidad.component';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { ListadoEspecialidadComponent } from './componentes/listado-especialidad/listado-especialidad.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';
import { UsuarioDetalleComponent } from './componentes/usuario-detalle/usuario-detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    LoginComponent,
    RegisterComponent,
    SeccionUsuariosComponent,
    MisTurnosComponent,
    TurnosComponent,
    MiPerfilComponent,
    SolicitarTurnoComponent,
    NavbarComponent,
    EnvioEmailComponent,
    AltaEspecialidadComponent,
    AltaUsuarioComponent,
    ListadoEspecialidadComponent,
    ListadoUsuariosComponent,
    UsuarioDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IngresoModule,
    AngularFireAuthModule,
    FormsModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
