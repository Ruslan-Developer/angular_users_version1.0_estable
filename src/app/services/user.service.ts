
import { User } from '../models/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  private urlBackend: string = 'http://localhost:8080/api/users';

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
    return this.http.get(this.urlBackend).pipe(
      map((users:any) => users as User[]),
    );
  }
  /**
   * Metodo que hace una solicitud GET a la URL 'http://localhost:8080/api/users/{id}'
   * para obtener un usuario especifico por id.
   * @param id pasamos el id del usuario que queremos buscar en la base de datos
   * @returns Devuelve un Observable que emite un objeto User con el id pasado como parámetro.
   */
  findById(id: number): Observable<User> {
    return this.http.get<User>(this.urlBackend + '/' + id);
  }
}
