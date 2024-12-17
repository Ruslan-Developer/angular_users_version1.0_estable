import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navbar-cart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-cart.component.html'
})
export class NavbarCartComponent {

  @Input() items: CartItem[] = [];

  @Input() total: number = 0;  

}
