import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-alta-especialidad',
  templateUrl: './alta-especialidad.component.html',
  styleUrls: ['./alta-especialidad.component.css']
})
export class AltaEspecialidadComponent implements OnInit {

  formulario!: FormGroup;
  especialidad: string;

  constructor(public fv: FormBuilder, private firebaseSvc: FirebaseService) { 
    this.formulario = fv.group({
      especialidad: ["", Validators.required]
    });
  }

  ngOnInit(): void {
  }

  guardar(){
    this.especialidad = this.formulario.controls['especialidad'].value;
    this.firebaseSvc.addEspecilidad(this.especialidad);
  }

  

}
