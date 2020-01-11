import { Injectable } from '@angular/core';
import { INVENTORY} from './mock-inventory';
import { InventoryList} from './mock-inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }

  getInventory(): InventoryList[] {
    return INVENTORY;
  }
}
