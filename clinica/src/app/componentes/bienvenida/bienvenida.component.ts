import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FlowAssignment } from 'typescript';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  islogged = false;

  constructor(private router: Router, private authSv: AuthService) { }

  ngOnInit(): void {
    console.log(this.authSv.isLoggedIn);
    
    if(this.authSv.isLoggedIn){
      this.islogged = true;
    }
    else{
      this.islogged = false;
    }
    console.log(this.islogged);
    
  }

  goIngreso(){
    this.router.navigate(['ingreso/login']);
  }

  goRegistro(){
    this.router.navigate(['ingreso/registro']);
  }
}


