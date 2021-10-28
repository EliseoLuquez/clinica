import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goIngreso(){
    this.router.navigate(['ingreso/login']);
  }

  goRegistro(){
    this.router.navigate(['ingreso/registro']);
  }
}


