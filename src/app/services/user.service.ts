
import { User } from '../models/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  constructor(private http: HttpClient) { }

  /**
   * Utiliza el servicio HTTP de Angular (this.http) para hacer una solicitud GET 
   * a la URL 'http://localhost:8080/api/users'.
   * Esta llamada devuelve un Observable que emite la respuesta de la solicitud HTTP.
   * @returns devuelve un Observable que emite un array de usuarios
   * El operador pipe se usa para encadenar operadores que transforman el Observable,
   * es decir, que modifican los valores que emite el Observable.
   * El operador map transforma la respuesta de la solicitud HTTP en un array de objetos User.
   */

  findAll(): Observable<User[]> {
    return this.http.get('http://localhost:8080/api/users').pipe(
      map((users:any) => users as User[]),
    );
  }
}
