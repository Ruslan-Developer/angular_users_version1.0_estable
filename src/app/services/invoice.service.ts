import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';

import { Item } from '../models/item';
import { Client } from '../models/client';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { invoiceData } from '../data/invoice.data';


@Injectable({
  providedIn: 'root'
})
// Aqui se consumen APIs, se realizan operaciones de negocio, etc.
export class InvoiceService {

  private invoice: Invoice = invoiceData;

 // private clients: Client[] = clientsData;

  public clients: Client[] = [];

  // 2º Paso: Importamos el módulo HttpClient de Angular para poder realizar peticiones HTTP

  constructor(private http: HttpClient) { 



  }

  getInvoice(): Invoice {
    // Guardamos el valor de total una constante para no tener que recalcularlo
    const total = this.calculateTotal();
  return {... this.invoice, total: total }; // Devuelve una copia del objeto con el total actualizado
  }

  getClients(): Client[] {
    return this.clients;
  }

  findAll(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:8080/api/customers')
    .pipe( map((clients: any) => clients as Client[]),);
  }
  
  searchByClientName(lastname: string): Observable<Client> {
   // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydGVqZSIsImF1dGhvcml0aWVzIjoiW3tcImF1dGhvcml0eVwiOlwiUk9MRV9BRE1JTlwifSx7XCJhdXRob3JpdHlcIjpcIlJPTEVfVVNFUlwifV0iLCJ1c2VybmFtZSI6InJ0ZWplIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzMzNTA2MDYxLCJleHAiOjE3MzM1MDk2NjF9.8EElG6pnscY4OTFhZOE3FtBfLbKyM_1JTdoffYV5-SA'; // Reemplaza esto con el token JWT real
   // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Client>(`http://localhost:8080/api/customers/${lastname}`).pipe(
      catchError(this.handleError)
    );
  }
    

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      // Manejo específico para el error 404
      return throwError('El cliente con ese apellido no existe');
    } else {
      // Manejo genérico para otros errores
      return throwError('Ocurrió un error inesperado');
    }
  }

  remove(id: number): Invoice {
    // Debemos volver a asignar el valor de la factura para que se actualice el total porque se ha modificado el array d
    this.invoice.items = this.invoice.items.filter(item => item.id !== id); 
    const total = this.calculateTotal()
    // Devolvemos una copia de la factura con el total actualizado
    return {... this.invoice, total: total };
  }
  
  add(item: Item): Invoice {
    /**
     ** Este código está creando un nuevo array que contiene 
     ** todos los elementos actuales de this.invoice.items y añade un nuevo item al final de este array. 
     ** Luego, asigna este nuevo array de vuelta a this.invoice.items.
     */
    this.invoice.items = [... this.invoice.items, item]; 
    const total = this.calculateTotal();
    // Devolvemos una copia de la factura con el total actualizado
    return {... this.invoice, total: total };
  }

  calculateTotal() {

    // let total = 0;
    //  Recorre cada item de la factura y calcula el total
    // this.invoice.items.forEach(item => {
    //   total += item.price * item.quantity; // Suma el total de cada item al total general
    // });

    // return total; // Devuelve el total calculado
    return this.invoice.items.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);

  }

 

}
