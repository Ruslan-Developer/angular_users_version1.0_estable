import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const service = inject(AuthService);
  const router = inject(Router);

  if(inject(AuthService).isAuthenticated()){

    if(isTokenExpired()) {
      service.logout();
      router.navigate(['/login']);
      return false;

    }
    if(!service.isAdmin()){
      router.navigate(['/forbidden']);
      return false;
    }
    return true;
  }

  inject(Router).navigate(['/login']);
  return false;
};

const isTokenExpired = () => {
  const token = inject(AuthService).token;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const exp = payload.exp;
  const now = new Date().getTime() / 1000; //Convertimos a segundos
  if(now > exp){
    return true;
  }else{
    return false;
  }
}
