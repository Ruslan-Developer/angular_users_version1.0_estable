import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

 private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

 private _idUserEventEmitter = new EventEmitter();

 private _findUserByIdEventEmitter = new EventEmitter();

 private _selectedUserEventEmitter = new EventEmitter();

 private _errorsUserFormEventEmitter = new EventEmitter();

 private _handlerLoginEventEmitter = new EventEmitter();

 
 private _idProductEventEmitter: EventEmitter<number> = new EventEmitter();

 private _productEventEmitter: EventEmitter<Product> = new EventEmitter();

constructor() { }

  get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
    }
  get idUserEventEmitter(): EventEmitter<number> {
    return this._idUserEventEmitter;
    }

  get findUserByIdEventEmitter(): EventEmitter<number> {
    return this._findUserByIdEventEmitter;
  }

  get selectedUserEventEmitter(): EventEmitter<User> {
    return this._selectedUserEventEmitter;
  }

 get errosUserFormEventEmitter() {
    return this._errorsUserFormEventEmitter;
  }

  get handlerLoginEventEmitter() {
    return this._handlerLoginEventEmitter;
  }

  
  get productEventEmitter(): EventEmitter<Product> {
    return this._productEventEmitter;
  }

  get idProductEventEmitter(): EventEmitter<number> {
    return this._idProductEventEmitter;
  }


}
