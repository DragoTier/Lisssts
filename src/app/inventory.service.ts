import { Injectable } from '@angular/core';
import { InventoryList, InventoryItem} from './inventoryClasses';
import { Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  inventory: InventoryList[] = [
    {name: 'Lebensmittel', id: 1, items: [{name: 'Bierooo', count: 9000}, {name: 'Weinoo', count: 666}]},
    {name: 'Anderes', id: 2, items: [{name: 'Star Wars', count: 404}, {name: 'deine mutter', count: 1}]}
  ];

  private inventorySource = new BehaviorSubject<InventoryList[]>(this.inventory);
  inventory$ = this.inventorySource.asObservable();

  constructor() { }

  //works asynchronously
  getInventory(): Observable<InventoryList[]> {
    return this.inventory$;
  }

  setInventory(inventory: InventoryList[]){
    this.inventory = inventory;
    this.inventorySource.next(inventory);
  }

  addToInventory(inventory: InventoryList[]) {
    this.inventory.map( (list, listIndex) => {
      inventory.map( (newList, newListIndex) => {
        if(list.name == newList.name){
          
        }
      });
    });
  }
}
