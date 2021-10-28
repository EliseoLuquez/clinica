import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-listado-especilidad',
  templateUrl: './listado-especilidad.component.html',
  styleUrls: ['./listado-especilidad.component.css']
})
export class ListadoEspecilidadComponent implements OnInit {

  @Output() especialidadSeleccionada: EventEmitter<any> = new EventEmitter<any>();
  @Input() especialidades: any[] = [];
  especialidad: any;

  constructor(private firebaseSvc: FirebaseService) { }

  ngOnInit(): void {
    //this.cargarEspecialidades();
  }

  // cargarEspecialidades() {
  //   this.firebaseSvc.getEspecialidades().subscribe((especialidades: any) => {
  //     this.especialidades = especialidades;
  //     console.log(especialidades);
  //   });
  // }

  enviarEspecialidad() {
    this.especialidadSeleccionada.emit(this.especialidad);
  }

}
