import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

 private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

 private _idUserEventEmitter = new EventEmitter();

 private _findUserByIdEventEmitter = new EventEmitter();

 private _selectedUserEventEmitter = new EventEmitter();

 private _errorsUserFormEventEmitter = new EventEmitter();

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


}
