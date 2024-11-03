import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Interceptor que asegura que todas las peticiones HTTP que se realizan al servidor de backend contienen el token de autenticación del usuario autenticado en la aplicación web.
 * Esto se hace para que el servidor de backend pueda identificar al usuario que realiza la petición HTTP y pueda devolver la información
 * solicitada al usuario autenticado de forma automaática y segura.
 * @param req Petición HTTP que se va a realizar al servidor de backend
 * @param next Función que permite continuar con la petición HTTP que se va a realizar al servidor de backend
 * @return next(authReq) Devuelve la petición HTTP clonada con el token de autenticación añadido a la cabecera de la petición HTTP
 * @return next(req) Devuelve la petición HTTP sin el token de autenticación añadido a la cabecera de la petición HTTP
 * @see AuthService Servicio que se encarga de gestionar la autenticación de los usuarios en la aplicación web
 * @see HttpInterceptorFn Interfaz que define el tipo de los interceptores de peticiones HTTP
 * @see inject(AuthService).token Propiedad que permite acceder al token de autenticación del usuario autenticado en la aplicación web
 * @see req.clone() Método que permite clonar una petición HTTP
 * @see req.headers.set() Método que añade el token de autenticación a la cabecera de la petición HTTP
 * 
 */
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = inject(AuthService).token;

  if(token != null){
    const authReq = req.clone({
      
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });

    return next(authReq); 
  }
  return next(req);
};
