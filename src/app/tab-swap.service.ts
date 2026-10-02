import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabSwapService {

  constructor() { }
  Tab1DrawnEvent: EventEmitter<any> = new EventEmitter();
  Tab2DrawnEvent: EventEmitter<any> = new EventEmitter();
}
