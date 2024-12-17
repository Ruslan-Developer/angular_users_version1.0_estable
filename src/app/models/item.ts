export class Item {
    id!: number;
    product!: string;
    price!: number;
    quantity!: number;

    total() {
        return this.price * this.quantity * 1.21;
    }
    
}