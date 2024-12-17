import { Component, EventEmitter, OnInit} from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService, // Inyectamos el servicio AuthService
    private router: Router) { 

      /**
       * Permite que el componente reciba y utilice datos pasados a través de la navegación desde otro componente como UserAppComponent.
       * En este caso, el componente UserAppComponent pasa un array de objetos User a través de la navegación.
       * Para acceder a estos datos, se utiliza el método getCurrentNavigation() del router.
       * Si el array de objetos User existe, se asigna a la variable users del componente UserComponent.
       * De lo contrario, si el es null o undefined, se ejecuta la consulta findAll() del servicio UserService,
       * es decir se obtienen todos los usuarios de la base de datos.
       *! Esto nos ayuda a evitar hacer consultas innecesarias a la base de datos y optimizar el rendimiento de la aplicación.
       */
      if(this.router.getCurrentNavigation()?.extras.state){
        this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      }
     }
   /**
    * Cada vez que se inicia el componente ejecutamos el método findAll() del servicio UserService
    * para obtener todos los usuarios de la base de datos.
    */
  ngOnInit(): void {
    /**
     * users => this.users = users: Esta es la función de callback que se ejecuta cuando el Observable emite un valor. 
     * En este caso, el valor emitido es un array de objetos User.
     */
    if(this.users == undefined || this.users == null || this.users.length == 0){
      console.log('consulta findAll()');
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
   
    this.router.navigate(['/users/edit', user.id]);
  }

  /**
   * Método que nos va permitir ocultar o mostrar botones o elementos de la vista de usuarios UserComponent.html
   * dependiendo de si el usuario es administrador o no. 
   */
  get admin() {
    return this.authService.isAdmin();
  }
}
