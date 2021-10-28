import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Imagen } from 'src/app/shared/imagen';
import { Usuario } from 'src/app/shared/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario!: FormGroup;
  usuario: Usuario;
  img1Perfil: Imagen;
  img2Perfil: Imagen;
  selectedFiles: FileList;
  percentage: number;
  especialista = false;
  paciente = false;
  administrador = false;
  msjError: string;
  especialidades = [];
  especialidadSeleccionada: string;

  constructor(public fv: FormBuilder, private authSvc: AuthService, private firebaseSvc: FirebaseService, private router: Router) {
    this.formulario = fv.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      edad: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
      dni: ["", Validators.required],
      email: ["", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ["", Validators.required],
      tipoUsuario: ["", Validators.required],
      obraSocial: ["",],
      especialidad: ["",],
      img1Perfil: ["", Validators.required],
      img2Perfil: ["",]
    });

    //this.firebaseSvc.cargarEspecialidades();
  }

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  getTipoUsuario(value: any) {
    console.log(value);
    switch (value) {
      case "Administrador":
        this.administrador = true;
        this.especialista = false;
        this.paciente = false;
        break;
      case "Especialista":
        this.administrador = false;
        this.especialista = true;
        this.paciente = false;
        break;
      case "Paciente":
        this.administrador = false;
        this.especialista = false;
        this.paciente = true;
        break;
    }
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);

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
    this.usuario.tipoUsuario = this.formulario.controls['tipoUsuario'].value;
    this.usuario.obraSocial = this.formulario.controls['obraSocial'].value;
    this.usuario.especialidad = this.formulario.controls['especialidad'].value;
    this.usuario.administrador = this.administrador;
    this.usuario.especialista = this.especialista;
    if(this.usuario.especialista){
      this.usuario.aprobado = false;
    }
    else{
      this.usuario.aprobado = true;
    }
    this.usuario.paciente = this.paciente;
    
    
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
    this.img2Perfil = new Imagen(file2);
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

  
  cargarEspecialidades() {
    this.firebaseSvc.getEspecialidades().subscribe((especialidades: any) => {
      this.especialidades = especialidades;
      console.log(especialidades);
    });
  }

  asignarEspecialidadSeleccionada(especialidad: string){
    console.log(especialidad);
  
    this.especialidadSeleccionada = especialidad;
    //this.especialidades.push(this.actorSeleccionado);
    //let apellidoYNombre = actor.nombre + " " + actor.apellido;
    //this.formulario.controls['actor'].setValue(apellidoYNombre);
    //this.formulario.controls['actores'].setValue(this.actores);
  }

  //   validarEspecialista(control: AbstractControl){
  //     const especialista = control.value;
  //     const 
  //   } 
  //   validarNombre(control: AbstractControl){
  //     const nombre = control.value;
  //     const tieneEspacio = nombre.includes(' ');
  //     if(tieneEspacio){
  //       return { tieneEspacio: true };
  //     }
  //     return null;
  //   }

  
}
