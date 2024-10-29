import { Component, EventEmitter, OnInit} from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule], // Importamos el módulo RouterModule para poder utilizar el routerLink el template de html
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

 
  title: string = 'Listado de usuarios!';

  users: User[] = []; 

  constructor(
    private service: UserService, // Inyectamos el servicio UserService
    private sharingData: SharingDataService, // Inyectamos el servicio SharingDataService
    private router: Router) {  }
   /**
    * Cada vez que se inicia el componente ejecutamos el método findAll() del servicio UserService
    * para obtener todos los usuarios de la base de datos.
    */
  ngOnInit(): void {
    /**
     * users => this.users = users: Esta es la función de callback que se ejecuta cuando el Observable emite un valor. 
     * En este caso, el valor emitido es un array de objetos User.
     */
    
    this.service.findAll().subscribe(users => this.users = users);
  }


 /**
  * Función que se encarga de eliminar un usuario de la lista
  * para ello se emite el id del usuario a eliminar mediante el evento idUserEventEmitter 
  * que procede del servicio SharingDataService encargado de compartir datos entre componentes.
  * @param id 
  */
  onRemoveUser(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);   
  }

  onSelectedUser(user: User): void {
   // this.sharingData.selectdUserEventEmitter.emit(user);
   
    this.router.navigate(['/users/edit', user.id]);
  }
}
