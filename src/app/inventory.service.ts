import { Injectable } from '@angular/core';
import { InventoryList} from './inventoryClasses';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  inventory: InventoryList[] = [
    {name: 'Lebensmittel', id: 1, items: [{name: 'Bierooo', count: 9000}, {name: 'Weinoo', count: 666}]},
    {name: 'Anderes', id: 2, items: [{name: 'Star Wars', count: 404}, {name: 'deine mutter', count: 1}]}
  ];

  constructor() { }

  //works asynchronously
  getInventory(): Observable<InventoryList[]> {
    return of(this.inventory);
  }

  setInventory(inventory: InventoryList[]){
    this.inventory = inventory;
    this.getInventory();
  }
}
