import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Client } from '../../../models/client';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { InvoiceService } from '../../../services/invoice.service';
import { Invoice } from '../../../models/invoice';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css'
})
export class ClientTableComponent implements OnChanges  {
  @Input()
  invoice!: Invoice;

  @Input() total: number = 0;
  //Por ahora no lo necesitamos
  @Input()
  clients: Client[] = [];
  //Recibimos el cliente que queremos mostrar
  @Input()
  client!: Client | null;

  totalWithTax: number = 0;
  tax: number = 0;


  constructor(private service: InvoiceService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['invoice'] && changes['invoice'].currentValue) {
      this.updateTotals();
    }
  }

  private updateTotals(): void {
    this.totalWithTax = this.invoice.total * 1.21;
    this.tax = this.invoice.total * 0.21;
  }
  
  ngOnInit(): void {

      // Obtenemos la factura del servicio y tambien el total porque se actualiza en el servicio
      this.invoice = this.service.getInvoice();     
    
  } 

  getTotalWithTax(): number {
    return this.invoice.total * 1.21; // Aplica la tasa del 21%
  }
  getTax(): number {
    return this.invoice.total * 0.21; // Aplica la tasa del 21%
  }

  public downloadPDF() {

    const doc = new jsPDF();

    autoTable(doc, {
      body: [
        [
          {
            content: 'Factura',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff',
            }

          },
          {
            content: 'ClientSphere',
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff',

            }

          }
        ],

      ],
      theme: 'plain',
      styles: {
        fillColor: '#3366ff',

      },
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Referencia: #FACT-001'
              + '\n' + 'Fecha: 19-12-2024'
              + '\n' + 'Nº: Factura: 1234',
            styles: {
              halign: 'right'

            }

          },

        ],

      ],
      theme: 'plain',

    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Facturado a: '
              + '\n' + ' '
              + '\n' + `${this.client?.name ?? ''}`
              + '\n' + `${this.client?.lastName ?? ''}`
              + '\n' + `${this.client?.email ?? ''}`
              + '\n' + `${this.client?.phone ?? ''}`
               ,
            styles: {
              halign: 'left',              

            }

          },
          {
            content: 'Dirección de envio: '
               + '\n' + ' '
               + '\n' + `${this.client?.address ?? ''}`
               + '\n' + `${this.client?.postalCode ?? ''}`
               + '\n' + `${this.client?.city ?? ''}`
               + '\n' + `${this.client?.province ?? ''}`
               + '\n' + `${this.client?.country ?? ''}`,
            styles: {
              halign: 'left',          

            }

          },
          {
            content: 'Detalles de la empresa'
              + '\n' + ' '
              + '\n' + 'Nº Fiscal: 123456789'
              + '\n' + 'Clintersphere'
              + '\n' + 'Calle Falsa 123'              
              + '\n' + 'Madrid, Madrid, 28001'
              + '\n' + 'España',
            styles: {
              halign: 'right',
            
            }

          },

        ],

      ],
      theme: 'plain',

    });

    autoTable(doc, {
      body: [
        [

          {
            content: 'Total adeudado',
            styles: {
              halign: 'right',
              fontSize: 14

            }
          },

        ],
        [

          {
            content: 
            this.getTotalWithTax().toFixed(2) + ' €',
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#3366ff',

            }

          },
        ],
        [

          {
            content: 'Fecha de vencimiento: 28-01-2025',
            styles: {
              halign: 'right',

            }

          },
        ],
      ],
      theme: 'plain'

    });

    autoTable(doc, {
      head: [['Items', 'Descripción', 'Cantidad', 'Precio', 'Total']],
      body: [
        ['Tarjeta Gráfica', 'SLIM 16GB GDDR6X DLSS3', '1', '1246 €', '1246 €'],
        ['Placa Base', 'MSI MAG X670E TOMAHAWK WIFI', '2', '314 €', '628 €'],
        ['Memoria RAM', 'Kingston FURY Beast DDR4 3200 MHz 16GB 2x8GB CL16', '5', '40 €', '200 €'],
        ['Móvil', ' Apple iPhone 16 128GB', '1', '1000 €', '1000 €'],
      ],
      theme: 'striped',
      headStyles: {
        fillColor: '#343a40',

      },

    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Subtotal',
            styles: {
              halign: 'right'
            }
          },
          {
            content: 
            this.invoice.total.toFixed(2) + ' €',
            styles: {
              halign: 'right'
            }
          },

        ],
        [
          {
            content: 'Impuesto Total (21%)',
            styles: {
              halign: 'right'
            }
          },
          {
            content: 
            this.getTax().toFixed(2) + ' €',
            styles: {
              halign: 'right'
            }
          },

        ],
        [
          {
            content: 'Total',
            styles: {
              halign: 'right'
            }
          },
          {
            content: 
            this.totalWithTax.toFixed(2) + ' €',
            styles: {
              halign: 'right'
            }
          },

        ],
      ],
      theme: 'plain',

    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Detalles del pago',
            styles: {
              halign: 'left',
              fontSize: 14
            }
          }
        ],
        [
          {
            content: 'Métodos de pago disponibles: Transferencia bancaria, tarjeta de crédito, PayPal.',
           
            styles: {
              halign: 'left',
            }
          }
        ],
        [
          {
            content: 'Datos de cuenta bancaria: '
            + '\n' + 'Número de cuenta: 1234 5678 90 1234567890'
            + '\n' + 'IBAN: ESXX XXXX XXXX XXXX XXXX XXXX'
            + '\n' + 'Beneficiario: ClientSphere',
            
            styles: {
              halign: 'left',
            }
          }
        ],
        [
          {
            content: 'Plazo de pago: antes del 28/01/2025.',
            styles: {
              halign: 'left',
            }
          }
        ],
        [
          {
            content: 'Referencia de pago: FACT-00123-ABCDEF' 
            + '\n' + 'Número de factura:  FACT-001',
            styles: {
              halign: 'left',
            }
          }
        ]
      ]
    });

   

    return doc.save('invoice.pdf');
  }

}
