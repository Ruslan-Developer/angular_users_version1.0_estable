import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule], // Importamoe el RouterModule: que es el módulo que nos permite trabajar con las rutas
  templateUrl: './navbar.component.html',
 
})
export class NavbarComponent {
  constructor(private authService: AuthService,
    private router: Router
  ) {}

  @Input() users: User[] = [];
  /**
   * Método que permite acceder a la info sobre el estado de autenticación del usuario, asi
   * podemos llamar al metodo isAuth() en el template del componente navbar.component.html
   * y saber si el usuario está autenticado o no en la aplicación web para mostrar u ocultar
   * los elementos del menú de navegación.
   * Este metodo devuelve un objeto con toda la información del usuario logueado: 
   * nombre de usuario, si está autenticado o no y si es administrador o no.
   */
  get login(){
   
    return this.authService.login; 
  }

  /**
   * 
   */

  get admin(){
    return this.authService.isAdmin();
  }

  handlerLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
