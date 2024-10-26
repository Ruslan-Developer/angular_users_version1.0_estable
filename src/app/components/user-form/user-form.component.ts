import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  user: User;


  // Inyectamos al constructor el servicio SharingDataService para poder emitir eventos de usuario nuevo 
  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private service: UserService, ) {
    
    this.user = new User(); 
     
  }

  ngOnInit(): void {
    /**
     * Forma de trabajar con eventos personalizados en Angular sin  hacer solicitudes HTTP a un servidor remoto.
     * Recepción del evento al estar suscrito a EventEmitters de SharingDataService.
     * 1º Suscribirse al evento selectedUserEventEmitter que emite un evento cada vez que se selecciona un usuario.
     */
        
    //this.sharingData.selectedUserEventEmitter.subscribe(user => this.user = user);

   
    this.route.paramMap.subscribe(params => {
  
      const id: number = +(params.get('id') || '0');

      if(id > 0) {
        /**
         * API de Angular para hacer solicitudes HTTP a un servidor remoto.
         * Cuando llamamos al metodo findById(id) del servicio UserService,
         * hace la solicitud a la base de datos cuando esta se completa emite el usuario encontrado.
         * La función callback de subscribe recibe el usuario encontrado y lo asigna a la propiedad user.
        */
        this.service.findById(id).subscribe(user => this.user = user);
        /* 2º Emisión del evento: findUserByIdEventEmitter que emite el id del usuario a editar.
         lo emitimos de vuelta al servicio SharingDataService para que lo reciba el componente UserAppComponent. */
     
       // this.sharingData.findUserByIdEventEmitter.emit(id); 
      }
    })
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }


}
