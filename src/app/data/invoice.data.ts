
import { Client } from "../models/client";


export const invoiceData: any = {

   
    id: 1234,
    name: 'Productos tecnológicos',
    type: 'Venta',
    issueDate: new Date(),
    dueDate: new Date(),
    client: {
        name: 'Juan',
        lastname: 'Perez García',
        email: 'micliente@example.com',
        phone: 123456789,
        address: 'Calle López Gómez 123',
            number: 1234,
            street: 'Calle 123',
            city: 'Lisboa',
            province: 'Lisboa',
            postalCode: 12345,
            country: 'Portugal'
        
        
    },
    company: {
        name: 'ClientSphere',
        address: 'Calle Falsa 123',
        phone: 123456789,
        email: 'miempresa@example.com',
        creationDate: formatDate(new Date(), '/', '/'),
        fiscalNumber: 123456789,
        city: 'Madrid',
        postalCode: 28001,
        country: 'España',
        description: 'Empresa dedicada a la fabricación y distribución de productos tecnológicos.',
        logo: 'assets/images/logo.webp'
    },
    items: [
        {
            id: 1,
            product: 'Tarjeta Gráfica SLIM 16GB GDDR6X DLSS3',
            quantity: 1,
            price: 1246
        },
        {
            id: 2,
            product: 'Placa Base MSI MAG X670E TOMAHAWK WIFI',
            quantity: 2,
            price: 314
        },
        {
            id: 3,
            product: 'Memoria RAM DDR4 3200 MHz 16GB 2x8GB CL16',
            quantity: 5,
            price: 40
        }, 
    ],

  

    
}

export const clientsData: Client[] = [
    {
        id: 1,
        name: 'Juan',
        lastName: 'Perez García',
        email: 'micliente@example.com',
        phone: 123456789,
        address: 'Calle López Gómez 123',
        city: 'Lisboa',
        province: 'Lisboa',
        postalCode: 12345,
        country: 'Portugal'
    },
    {
        id: 2,
        name: 'Maria',
        lastName: 'Gomez',
        email: 'maria.gomez@example.com',
        phone: 987654321,
        address: 'Avenida Siempre Viva 742',
        city: 'Barcelona',
        province: 'Barcelona',
        postalCode: 8001,
        country: 'España'
    }
];



function formatDate(date: Date, p0: string, p1: string): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

