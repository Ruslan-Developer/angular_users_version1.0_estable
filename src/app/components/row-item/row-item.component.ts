import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'tr[row-item]',
  standalone: true,
  imports: [],
  templateUrl: './row-item.component.html',

})
export class RowItemComponent {

  @Input() item!: Item;


    @Output() removeEventEmitter: EventEmitter<number> = new EventEmitter<number>();
    onRemove(id: number) {
      this.removeEventEmitter.emit(id); // Aqui emitimos el evento con el id del item a eliminar

  }


  

}
