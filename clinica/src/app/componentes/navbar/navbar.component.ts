import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logueado = false;
  adminLogueado = false;
  usuario: any;
  email: string;

  constructor(private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
    // this.usuario = this.authSvc.obtenerUsuaurioActual();
    // if(this.usuario){
    //   console.log(this.usuario.email);
    //   console.log(this.logueado);
    //   this.logueado = true;
    // }
    this.usuario = this.authSvc.obtenerUsuaurioActual();
    console.log(this.usuario);
    
    this.authSvc.afAuth.authState.subscribe(res=>{
      if(res && res.uid){
        this.logueado = true;
        if(this.authSvc.isLoggedInAdmin)
        {
          this.adminLogueado = true;
        }
        else{
          this.adminLogueado = false;
        }
        //this.usuario.email = res.email || "";
        //this.ls.set("usuarioLs", JSON.stringify(this.usuario));
        this.email = res.email || "";
      }
      else{
        this.logueado = false;
      }

    });
    
  }

  goRegistro(){
    this.router.navigate(['ingreso/registro']);
  }

  goIngreso(){
    this.router.navigate(['ingreso/login']);
  }

  goBienvenida(){
    this.router.navigate(['bienvenida']);
  }

  goSeccionUsuarios(){
    this.router.navigate(['seccionUsuarios']);
  }

  salir(){
    this.logueado = false;
    this.adminLogueado = false;
    this.authSvc.signOut();
    this.router.navigate(['bienvenida']);
  }

}

