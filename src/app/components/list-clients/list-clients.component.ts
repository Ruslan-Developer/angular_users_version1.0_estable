import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';



@Component({
  selector: 'app-list-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-clients.component.html',
  
})

export class ListClientsComponent implements OnInit {
  
 
  clients: Client[] = [];

  constructor(private service: InvoiceService ) { }

  ngOnInit(): void {
    //this.clients = this.service.getClients();
    this.service.findAll().subscribe(clients => this.clients = clients);
    
  }

}
