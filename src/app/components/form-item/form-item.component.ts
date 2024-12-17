import { Component, EventEmitter, Output } from '@angular/core';
import { Item } from '../../models/item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'form-item',
  standalone: true,
  imports: [FormsModule], // Importamos el módulo FormsModule para poder usar ngModel
  templateUrl: './form-item.component.html',
 
})
export class FormItemComponent {

  //Transmitimos los datos al componente padre
  @Output() addItemEventEmitter = new EventEmitter();

  private counterId = 4; // Contador para asignar un id a cada item

  item: any = {
    product: '',
    price: '',
    quantity: '',
  }

  onSubmit(): void {
    
    /*id: this.counterId: Aquí se está añadiendo una propiedad id al objeto emitido, 
    cuyo valor es this.counterId. 
    this.counterId es una propiedad del componente que contiene un identificador único o contador.
    
    ...this.item: El spread operator (...) se utiliza para copiar todas las propiedades 
    del objeto this.item dentro del nuevo objeto que se está creando.
    this.item es otro objeto que contiene varias propiedades que se quieren incluir en el evento emitido.*/
    this.addItemEventEmitter.emit({id: this.counterId, ...this.item}); 

    // Se incrementa el contador en 1 para asignar un id único a cada item
    this.counterId++;

    // Se limpian los campos del formulario
    this.item = {
      product: '',
      price: '',
      quantity: '',
    };

  }

  

}
