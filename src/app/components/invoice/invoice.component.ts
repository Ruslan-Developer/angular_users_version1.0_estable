import { Component, Input, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { InvoiceViewComponent } from '../invoice-view/invoice-view.component';

import { ListItemsComponent } from '../list-items/list-items.component';
import { ListClientsComponent } from '../list-clients/list-clients.component';
import { TotalComponent } from '../total/total.component';
import { FormItemComponent } from '../form-item/form-item.component';
import { Item } from '../../models/item';
import { ClientViewComponent } from '../client-view/client-view.component';
import { CompanyViewComponent } from '../company-view/company-view.component';
import { ClientTableComponent } from '../client-table/client-table/client-table.component';
import { SearchBoxComponent } from '../search-box/search-box/search-box.component';
import { Client } from '../../models/client';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-invoice',
  standalone: true,
  // Importamos nuestros componentes para poder utilizarlos en la plantilla
  imports: [  InvoiceViewComponent, 
              ClientViewComponent, 
              CompanyViewComponent, 
              ListItemsComponent,
              TotalComponent, 
              FormItemComponent,
              ListClientsComponent,
              ClientTableComponent,
              SearchBoxComponent
            ],
  templateUrl: './invoice.component.html',

})
export class InvoiceComponent implements OnInit {

  invoice!: Invoice;

  clients: Client[] = []

  client: Client | null = null;

  clientPdf: Client = new Client();

  constructor(private service: InvoiceService) { }

  ngOnInit(): void {


    // Obtenemos la factura del servicio y tambien el total porque se actualiza en el servicio
    this.invoice = this.service.getInvoice();
    
  }

  searchClient(value: string) {
    
    this.service.searchByClientName(value).subscribe(client => this.client = client);
    console.log('Searching for client:', value);
  }

  resetClient(): void {
    this.client = null;
    
  }

  removeItem(id: number) {
    // Filtramos los items para eliminar el item con el id que recibimos
    this.invoice = this.service.remove(id); // Cambiamos el estado de la factura con el item eliminado
  }

  addItem(item: Item) {
    // Importante: aqui se añade un item a la factura y se actualiza el total
    this.invoice = this.service.add(item);
  }

  

}
