import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule], // Importamoe el RouterModule: que es el módulo que nos permite trabajar con las rutas
  templateUrl: './navbar.component.html',
 
})
export class NavbarComponent {

  @Input() users: User[] = [];

}
