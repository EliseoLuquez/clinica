import { Injectable } from '@angular/core';
import { Usuario } from '../shared/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { first } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn = false;
  usuarios: Usuario[] = [];

  constructor(public afAuth: AngularFireAuth, private router: Router, private firebaseSvc: FirebaseService) {
    this.firebaseSvc.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  //login
  async singIn(usuario: Usuario) {
    console.log(usuario.email);
    try{
      return await this.afAuth.signInWithEmailAndPassword(usuario.email, usuario.password);
    }
    catch(error){
      console.log(error);
      
    }
  }

  //register
  async onRegister(usuario: Usuario) {
    try{
      var result = await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.password);
      this.enviarVerficacionEmail();
      return result;
    }
    catch(error)
    {
      console.log(error);
      
    }
  }

  public async signOut() {
    try{
      await this.afAuth.signOut();
      this.router.navigate(['/']);
    }
    catch(error)
    {
      console.log(error);
      
    }
  }

  async enviarVerficacionEmail() {
    console.log(this.afAuth.currentUser);

    (await this.afAuth.currentUser).sendEmailVerification();
    // (await this.afAuth.currentUser).sendEmailVerification().then( () => {
    //   console.log("Email de verificacion enviado");
    // });
    // this.router.navigate(['/']);
  }

  verificarAprobacionAdmin(usuario: Usuario) {
    this.usuarios.forEach(item => {
      if (item.email === usuario.email)
        if (item.aprobado) {
          return true;
        }
        else {
          return false;
        }

    });
  }

  obtenerUsuaurioActual(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}


