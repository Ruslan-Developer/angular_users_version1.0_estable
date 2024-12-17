import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @Input() 
  placeholder: string = 'Search...';

  @Output()
  onValue = new EventEmitter<string>();

  
  emitValue(value: string) {
    this.onValue.emit(value);
  }

}
