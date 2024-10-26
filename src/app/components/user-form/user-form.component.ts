import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private sharingData: SharingDataService) {
    this.user = new User(); 
     
  }

  ngOnInit(): void {
    // 1º Suscribirse 
    //Primero nos suscribimos al evento selectedUserEventEmitter que emite un evento cada vez que se selecciona un usuario 
    this.sharingData.selectedUserEventEmitter.subscribe(user => this.user = user);

    // Esto recibe los parametros de la ruta
    this.route.paramMap.subscribe(params => {
      // Cuanse se recibe el id 
      const id: number = +(params.get('id') || '0');

      if(id > 0) {
        //Por ultimo emitimos el id del usuario a editar 
        this.sharingData.findUserByIdEventEmitter.emit(id); // Lo emitimos de vuelta al servicio SharingDataService para que lo reciba el componente UserAppComponent
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
