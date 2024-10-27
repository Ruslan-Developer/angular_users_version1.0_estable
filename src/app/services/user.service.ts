
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

  /**
   * Método POST que envía un objeto User a la URL 'http://localhost:8080/api/users'
   * para crear un nuevo usuario en la base de datos.
   * @param user le pasamos el objeto User que queremos crear en la base de datos
   * @returns un Observable que emite el objeto User creado.
   * En el post es importante especificar el tipo de dato que es del tipo un <User> (Cast) y un JSON
   *  que se va a enviar en el body de la solicitud como segundo argumento.
   */

  create(user: User): Observable<User> {
    return this.http.post<User>(this.urlBackend, user);
  }
  /**
   * Método que usa PUT para enviar un objeto User a la URL 'http://localhost:8080/api/users/{id}'
   * para actualizar un usuario existente en la base de datos.
   * @param user se pasa el objeto User que queremos actualizar en la base de datos
   * @returns un Observable que es la respuesta futura de la solicitud HTTP al servidor de backend. Operaciones asincronas.
   * Al PUT se le pasa el id del usuario que queremos actualizar en la URL y el objeto User (JSON) que queremos actualizar en el body de la solicitud.
   */

  update(user: User): Observable<User>{
    return this.http.put<User>(this.urlBackend + '/' + user.id, user);
  }
}
