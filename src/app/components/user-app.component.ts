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

  addUser() {
    /**
     * Nos suscribimos al evento newUserEventEmitter que emite un evento cada vez que se agrega un nuevo usuario
     * o se edita un usuario existente en la vista de usuarios
     */
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if(user.id > 0) {
        this.users = this.users.map(u => 
          {
           if(u.id == user.id) { // Si el id del usuario es igual al id del usuario a editar
            return {...user}; // Devolvemos el objeto User como clon editado
          }
          return u;
        })
        
      } else {
        this.users = [... this.users, { ...user, id: new Date().getTime() }];
      }
      // Le pasamos la lista de usuarios actualizada a la vista de usuarios
      this.router.navigate(["/users"], {state: {users: this.users}});
  
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
        this.router.navigate(["/users"], {state: {users: this.users}});
      })

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
