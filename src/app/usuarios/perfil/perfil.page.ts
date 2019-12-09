import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../shared/usuarios-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
user: any = {};

  constructor(private usuariosService: UsuariosService,
              private router: Router,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
    this.user = this.usuariosService.getDadosUsuario();
    }
  });
}


  sair(){
    this.usuariosService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
  }

}
