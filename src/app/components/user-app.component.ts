import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { state } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { CartItem } from '../models/cartitem';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], // Importamos el RouterOutlet: que es la directiva que se encarga de cargar los componentes de las rutas
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {
  

  users: User[] = [];

  items: CartItem[] = [];

  total: number = 0;

  constructor(private service: UserService,
    private router: Router,
    private sharingData: SharingDataService,
    private authService: AuthService) {
   
  }

  ngOnInit(): void {
    
    
    this.service.findAll().subscribe(users => this.users = users);
    
    this.sharingData.productEventEmitter.subscribe(product => {
      const hasItem = this.items.find(item => item.product.id === product.id);
      if (hasItem) {
        this.items = this.items.map(item => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item;
        })
      } else {
        this.items = [... this.items, { product: { ...product }, quantity: 1 }];
      }
      this.calculateTotal();
    })
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.handlerLogin();

  }

  calculateTotal(): void {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price, 0);
  }

  handlerLogin(){
    //Recibimos los datos que se pasan por el formulario de login
    this.sharingData.handlerLoginEventEmitter.subscribe(({username, password}) => {
      console.log(username + " " + password);

      this.authService.loginUser({username, password}).subscribe({
        next: response => {
          const token = response.token;
          console.log(token);
          //Descodificamos el token con atob y lo parseamos a JSON
          const payload = JSON.parse(atob(token.split(".")[1]));

          const user = { username: payload.sub};
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          }

          this.authService.token = token;
          this.authService.login = login;
                    
          this.router.navigate(['/users']);
          console.log(payload);

        },
        error: error => {
          if(error.status == 401){
            console.log(error.error);
            Swal.fire('Error en el login, ', error.error.message, 'error');
          }else{
            throw error;
          }
        }
      })
    })

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
        this.service.update(user).subscribe(
          {
            //Next envuelve un objeto con la respuesta del servidor que contiene el usuario actualizado
            next: (userUpdate) => {
          this.users = this.users.map(u => 
            {
              //2º Actualizamos el usuario en la lista de usuarios de Angular.
             if(u.id == userUpdate.id) {
              return {...userUpdate}; 
            

            }
            return u;
            
          })
          //Actualiza la vista de usuarios en Angular despues de actualizar el usuario en la base de datos
          this.router.navigate(['/users'], {state: {users: this.users}});

          Swal.fire({
            title: "Actualizado!",
            text: "Usuario editado con éxito!",
            icon: "success"
          });

          }, error: (err) => {
              //console.log(err.error);
              //Emitimos el error al formulario de usuario gracias al service SharingDataService y lo recibimos en el componente UserFormComponent en el ngOnInit
              if(err.status === 400) {
              this.sharingData.errosUserFormEventEmitter.emit(err.error);
              }
          }
        })

     
        
      } else {
        // Se crea un nuevo usuario en la base de datos, nos suscribimos a la respuesta del servidor y esperamos que el servidor haya creado el usuario en la base de datos
        // y nos devuelva el usuario creado que se almacena en la variable userNew y se agrega a la lista de usuarios de Angular.
        this.service.create(user).subscribe( {
          // Next envuelve un objeto con la respuesta del servidor que contiene el usuario creado para validar si se ha creado correctamente
          next: userNew => {
          console.log(user);
          // Actualiza el estado de la lista de usuarios de Angular
          this.users = [... this.users, { ...userNew }];

           // Después le pasamos la lista de usuarios actualizada a la vista de Angular y para ello lo redirigimos a UserComponent
          this.router.navigate(['/users'], {state: {users: this.users}});

          Swal.fire({
            title: "Agregado nuevo usuario!",
            text: "Usuario guardado con éxito!",
            icon: "success"
          });
        },
        error: (err) => {
          //console.log(err.error);
          if(err.status === 400) {
            this.sharingData.errosUserFormEventEmitter.emit(err.error);
          }
          

        }})
        
      }
     
  
      

     
    
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
             * tenemos que navegar a la misma ruta, pero con un objeto que contenga la lista de usuarios
             * actual para que se muestre la tabla de usuarios actualizada en la vista de usuarios
             * Es decir navegamos a la misma ruta, pero con un objeto que contenga la lista de usuarios actual.
             */
            this.router.navigate(["/users/create"], {skipLocationChange: true}).then(() => {
              
              this.router.navigate(['/users'], {state: {users: this.users}});
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
