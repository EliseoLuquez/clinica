import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Imagen } from 'src/app/shared/imagen';
import { Usuario } from 'src/app/shared/usuario';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  @Output() usuario: Usuario;
  formulario!: FormGroup;
  img1Perfil: Imagen;
  selectedFiles: FileList;
  percentage: number;
  msjError: string;

  constructor(public fv: FormBuilder, private authSvc: AuthService, private firebaseSvc: FirebaseService, private router: Router) {
    this.formulario = fv.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      edad: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
      dni: ["", Validators.required],
      email: ["", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ["", Validators.required],
      img1Perfil: ["", Validators.required]
    });
  }
  
  ngOnInit(): void {
  }

  async registrar() {

    console.log(this.formulario);
    this.usuario = new Usuario();
    this.usuario.nombre = this.formulario.controls['nombre'].value;
    this.usuario.apellido = this.formulario.controls['apellido'].value;
    this.usuario.edad = this.formulario.controls['edad'].value;
    this.usuario.DNI = this.formulario.controls['dni'].value;
    this.usuario.email = this.formulario.controls['email'].value;
    this.usuario.password = this.formulario.controls['password'].value;
    this.usuario.tipoUsuario = "Administrador";
    this.usuario.obraSocial = "";
    this.usuario.especialidad = "";
    this.usuario.administrador = true;
    this.usuario.especialista = false;
    this.usuario.paciente = false;
    this.usuario.aprobado = true;
    
    this.usuario.emailVerificado = false;

    this.authSvc.onRegister(this.usuario).then(async (result) => {
      //this.usuario.logueado = true;
      //this.usuario.fecha = new Date().toLocaleString();
      //await this.authSvc.enviarVerficacionEmail();
      this.msjError = "";
    })
      .catch((res) => {
        if (res.message == "The email address is already in use by another account.") {
          this.msjError = "El email ingresado ya esta en uso."
        }
        if (res.message == "The email address is badly formatted.") {
          this.msjError = "El formato del email no es correcto."
        }
      });

    console.log(this.usuario);

    const file1 = this.selectedFiles.item(0);
    const file2 = this.selectedFiles.item(1);
    this.selectedFiles = undefined;
    this.img1Perfil = new Imagen(file1);
    console.log(this.usuario);

    //TODO: cambiar nombres de fotos porq no guarda la img si se llama igual
    this.firebaseSvc.uploadUsuarioImg(this.img1Perfil, this.usuario).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );

    this.router.navigate(['ingreso/envio-email']);
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);

  }
}
