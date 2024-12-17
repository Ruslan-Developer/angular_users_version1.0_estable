import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';
import { RowItemComponent } from '../row-item/row-item.component';
import { Client } from '../../models/client';
import { ListClientsComponent } from '../list-clients/list-clients.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'list-items',
  standalone: true,
  imports: [RowItemComponent],
  templateUrl: './list-items.component.html',

})
export class ListItemsComponent {
  @Input() items: Item[] = [];
  @Input() clients: Client[] = [];
  @Output() removeEventEmitter: EventEmitter<number> = new EventEmitter<number>();
  onRemove(id: number) {
    this.removeEventEmitter.emit(id); // Aqui emitimos el evento con el id del item a eliminar
  }



}
