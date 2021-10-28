import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-listado-especialidad',
  templateUrl: './listado-especialidad.component.html',
  styleUrls: ['./listado-especialidad.component.css']
})
export class ListadoEspecialidadComponent implements OnInit {

  @Output() especiliadadSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  @Input() especialidades: any[] = [];
  especialidad: any;

  constructor(public firebaseSvc: FirebaseService) { }

  ngOnInit(): void {
    //this.cargarEspecialidades()
  }


  asignarEspecialidad(especialidad: any){
    this.especiliadadSeleccionado.emit(especialidad);
  }
}
