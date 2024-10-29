import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], // Importamos el RouterOutlet: que es la directiva que se encarga de cargar los componentes de las rutas
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {
  

  users: User[] = [];



  constructor(private service: UserService,
    private router: Router,
    private sharingData: SharingDataService) {
   
  }

  ngOnInit(): void {
    
    
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.findUserById();

  }

  findUserById(){
    //Recibimos el id del usuario a editar
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      //Aqui buscamos el usuario por el id recibido
      const user = this.users.find(user => user.id == id);
      //Emitimos el usuario encontrado
      this.sharingData.selectedUserEventEmitter.emit(user);
    })  
  }

  /**
   * Método que permite agregar un nuevo usuario o editar un usuario existente en la vista de usuarios.
   * Todo esto se hace a través de un formulario que se encuentra en la vista de usuarios.
   * Dependiendo de si el usuario tiene un id mayor a 0, se edita el usuario, de lo contrario se agrega un nuevo usuario.
   * Todo esto se comprueba con el servidor de backend mediante una suscripción a la respuesta del servidor, peticiones asincronas.
   */

  addUser() {
    /**
     * Nos suscribimos al evento newUserEventEmitter que emite un evento cada vez que se agrega un nuevo usuario
     * o se edita un usuario existente en la vista de usuarios
     */
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if(user.id > 0) {
    
        //1º Actualizamos el usuario en la base de datos, nos suscribimos a la respuesta del servidor y
        //esperamos que el servidor haya actualizado el usuario en la base de datos
        this.service.update(user).subscribe(userUpdate => {
          this.users = this.users.map(u => 
            {
              //2º Actualizamos el usuario en la lista de usuarios de Angular.
             if(u.id == userUpdate.id) {
              return {...userUpdate}; 
            }
            return u;
          })

        })
     
        
      } else {
        // Se crea un nuevo usuario en la base de datos, nos suscribimos a la respuesta del servidor y esperamos que el servidor haya creado el usuario en la base de datos
        // y nos devuelva el usuario creado que se almacena en la variable userNew y se agrega a la lista de usuarios de Angular.
        this.service.create(user).subscribe(userNew => {
          this.users = [... this.users, { ...userNew }];
        })
        
      }
      // Le pasamos la lista de usuarios actualizada a la vista de usuarios
      this.router.navigate(['/users']);
  
      Swal.fire({
        title: "Agregado!",
        text: "Usuario guardado con éxito!",
        icon: "success"
      });

     
    
    })
    
  }
  // Funcion a la que se le pasa el id del usuario a eliminar
  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Desea eliminar realmente?",
        text: "Cuidado el usuario será eliminado del sistema",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
        customClass: {
          confirmButton: "btn btn-success", //Agregar margen a la derecha
          cancelButton: "btn btn-danger me-3" //Agregar margen arriba y abajo
        }
      }).then((result) => {
        if (result.isConfirmed) {
          /**
           * Eliminamos el usuario de la base de datos, nos suscribimos a la respuesta del servidor y
           * esperamos que el servidor haya eliminado el usuario de la base de datos para después 
           * eliminarlo de la lista de usuarios de Angular.
           */
          this.service.remove(id).subscribe(() => {
            /**
             * Filtramos el usuario que se va a eliminar, para que no se muestre en la tabla de usuarios
             * que se muestra en la vista de usuarios 
             */
            this.users = this.users.filter(user => user.id !== id);
            /**
             * Para que se actualice la tabla de usuarios dentro de la vista de usuarios,
             * tenemps que navegar a la misma ruta, pero con un objeto que contenga la lista de usuarios
             * actual para que se muestre la tabla de usuarios actualizada en la vista de usuarios
             * Es decir navegamos a la misma ruta, pero con un objeto que contenga la lista de usuarios actual.
             */
            this.router.navigate(["/users/create"], {skipLocationChange: true}).then(() => {
              this.router.navigate(["/users"]);
              })

          });
      

          swalWithBootstrapButtons.fire({
            title: "Borrado!",
            text: "Su usuario ha sido eliminado.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Su usuario está seguro :)",
            icon: "error"
          });
        }
      });
      }
    );
      
  }


}
