import { Component, Input } from '@angular/core';
import { Company } from '../../models/company';

@Component({
  selector: 'company-view',
  standalone: true,
  imports: [],
  templateUrl: './company-view.component.html',

})
export class CompanyViewComponent {
  // Aqui inyectamos la clase Company inicializando sus propiedades
  @Input() company: Company = {
    name: 'empresas s.a',
    address: 'Calle Falsa 123',
    phone: 123456789,
    email: 'miempresa',
    creationDate: new Date(),
    fiscalNumber: 0,
    city: 'Madrid',
    postalCode: 28001,
    country: 'España',
    description: 'Empresa dedicada a la fabricación y distribución de productos tecnológicos.',
    logo: 'assets/images/logo.webp'
    
  }; 

}
