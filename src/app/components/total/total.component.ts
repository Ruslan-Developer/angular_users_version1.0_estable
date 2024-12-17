import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total.component.html',

})
export class TotalComponent {

  @Input() total: number = 0;

}
