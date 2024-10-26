import { Component, EventEmitter} from '@angular/core';
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
export class UserComponent {

 
  title: string = 'Listado de usuarios!';

  users: User[] = []; 

  constructor(
    private service: UserService,
    private sharingData: SharingDataService,
    private router: Router) {
      if(this.router.getCurrentNavigation()?.extras.state){
         // Obtenemos los usuarios que se pasaron por el estado de la navegación
        this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      }else{
        //Despues se va emitir de la base de datos
        this.service.findAll().subscribe(users => this.users = users);
      }
      
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
   //Obtenemos el usuario seleccionado y lo pasamos por el estado de la navegación para poderlo recuperar en el componente UserFormComponent
    this.router.navigate(['/users/edit', user.id], {state: {user}});
  }
}
