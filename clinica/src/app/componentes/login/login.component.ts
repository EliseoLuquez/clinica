import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Usuario } from 'src/app/shared/usuario';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Imagen } from 'src/app/shared/imagen';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public mostrarError = false;
  dbPath = "usuariosClinica";
  msjError: string;
  usuariosRef!: AngularFirestoreCollection<any>;
  img1Url: Imagen;
  img1Nombre: string;
  img2Url: Imagen;
  img2Nombre: string;
  email: string;
  password: string;

  constructor(private authSvc: AuthService, private router: Router, private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  ingresar(){
    this.usuario.email = this.email;
    this.usuario.password = this.password;

    this.authSvc.singIn(this.usuario).then((result) =>{
        this.authSvc.isLoggedIn = true;
        console.log('Login exitoso', result);
        this.usuario.id = result.user.uid;;
        if(!result.user.emailVerified){
          this.router.navigate(['ingreso/envio-email']);
        }
        else{
          this.msjError = "";
          let usuarioRef = this.db.collection(this.dbPath, ref => ref.where(this.usuario.id, '==', 'id'));
          this.router.navigate(['bienvenida']);
        }
    })
    .catch((res)=>{
      if(res.message == "The password is invalid or the user does not have a password."){
        this.msjError = "La contraseña ingresada es invalida."
      }
    });
  }

  
  async logEliseo() {
    //console.log(this.usuario);
    this.email = 'leliseo89@hotmail.com';
    this.password = '123456';
    //console.log(this.authSvc.msjError);
  }


  
}
