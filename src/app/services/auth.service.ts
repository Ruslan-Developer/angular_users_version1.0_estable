import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8080/login';

  private _token: string | undefined;

  private _login: any = {
    isAuth: false,
    isAdmin: false,
    user: undefined
  };

  constructor(private http: HttpClient) {}

    loginUser({username, password}: any): Observable<any> {
      return this.http.post(this.url, {username, password});
    
   }

   set login(login: any){
    this._login = login;
    sessionStorage.setItem('login', JSON.stringify(login)); 
   }

   get login(){
    if(this._login.isAuth){ 
      
      return this._login;

    }else if(sessionStorage.getItem('login') != null){

      this._login = JSON.parse(sessionStorage.getItem('login') || '{}');
      return this._login;
    }
     return this._login; //Si no hay login, devolvemos el objeto vacío
   }

   set token(token: string){
     this._token = token;
     sessionStorage.setItem('token', token);
   }

   get token(){
    if(this._token != undefined){
      return this._token;

    } else if(sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token') || ''; 
      return this._token;
    }
    return this._token!; //Si no hay token, devolvemos un string vacío
   
   }

    /**
     * Método que determina si el usuario es administrador o no.
     * A través del getter login accedemos a la propiedad isAdmin del objeto login almacenado 
     * en el sessionStorage que tendrá un valor de true si el usuario es administrador y false si no lo es.
     * !IMPORTANTE: Aqui es login y no _login porque estamos accediendo a la propiedad login que es la que se guarda en el sessionStorage
     * y no a la propiedad _login que es la que se guarda en la memoria del servicio AuthService de ese modo si el usuario
     * recarga la página, no perderá la sesión iniciada y no tendrá que volver a loguearse.
     * */ 

   isAdmin(){
   
    return this.login.isAdmin; //A tarves del getter login accedemos a la propiedad isAdmin del objeto login almacenado en el sessionStorage
   }
   /**
    * Método que permite saber si el usuario está autenticado o no en la aplicación web
    * A traves del getter login accedemos a la propiedad isAuth del objeto login almacenado en el sessionStorage
    * que tendra un valor de true si el usuario está autenticado y false si no lo está. 
    * @returns devuelve un booleano que indica si el usuario está autenticado o no
    * 
    */

   isAuthenticated(){

    return this.login.isAuth; 
   }

   logout(){

    this._token = undefined;
    this._login = {
      isAuth: false,
      isAdmin: false,
      user: undefined
    };
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
   }
}
