import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Usuario } from 'src/app/shared/usuario';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  @Input() usuarioDetalle: Usuario = new Usuario();

  constructor(private fireabseSvc: FirebaseService) { }

  ngOnInit(): void {
    
  }

  habilitarEspecialista(){
    console.log(this.usuarioDetalle);
    
    this.usuarioDetalle.habilitado = true;
    this.fireabseSvc.updateUsuarioEspecialista(this.usuarioDetalle);

  }

}
