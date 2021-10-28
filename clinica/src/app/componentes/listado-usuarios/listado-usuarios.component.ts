import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Usuario } from 'src/app/shared/usuario';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {


  @Output() usuarioSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  @Input() usuarios: Usuario[] = [];
  usuario: Usuario;

 
  constructor(public firebaseSvc: FirebaseService) { }

  ngOnInit(): void {
    this.cargarUsuarios()
  }


  cargarUsuarios(){
    this.firebaseSvc.getUsuarios().subscribe((usuarios:any) => {
      this.usuarios = usuarios;
      //console.log(usuarios);
    });
  }

  mostrarUsuario(usuario: any){
    this.usuarioSeleccionado.emit(usuario);
  }

}
