import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * verifica si el usuario está autenticado, si el token ha expirado
 *  y si el usuario tiene permisos de administrador antes de permitir 
 * el acceso a una ruta protegida. Si alguna de estas condiciones no se cumple,
 *  el usuario es redirigido a la página de inicio de sesión o a la página de acceso prohibido según corresponda
 * @param route se le pasa la ruta actual 
 * @param state estado de la ruta actual 
 * @returns   true si el usuario está autenticado y tiene permisos de administrador,
 */

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
  const payload = JSON.parse(atob(token.split(".")[1])); //Payload es la parte del token que contiene la información del usuario y aqui lo decodificamos
  const exp = payload.exp; //Fecha de expiración del token
  const now = new Date().getTime() / 1000; //Convertimos a segundos
  if(now > exp){
    return true;
  }else{
    return false;
  }
}
