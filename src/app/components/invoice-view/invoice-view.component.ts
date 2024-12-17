import { Component, Input } from '@angular/core';

@Component({
  selector: 'invoice-view',
  standalone: true,
  imports: [],
  templateUrl: './invoice-view.component.html',
  
})
export class InvoiceViewComponent {
 
  @Input() id!: number;
  @Input() name!: string;
  
}
