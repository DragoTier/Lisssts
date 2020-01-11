import { Injectable } from '@angular/core';
import { INVENTORY} from './mock-inventory';
import { InventoryList} from './mock-inventory';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }

  getInventory(): Observable<InventoryList[]> {
    return of(INVENTORY);
  }
}
