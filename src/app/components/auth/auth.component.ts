import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  
})
export class AuthComponent {

  user: User;

  constructor(private sharingData: SharingDataService) {
    this.user = new User();
  }

  onSubmit(){
    if(!this.user.username || !this.user.password){
      Swal.fire(
        'Error',
        'Usuario y contraseña requeridos',
        'error'
      );
      
    }else{
      /**
       * Transmitimos los datos del login al componente padre o principal
       */
      this.sharingData.handlerLoginEventEmitter.emit({username: this.user.username, password: this.user.password});
    }

  }

  resetForm() {
    this.user = new User();
  }

}
