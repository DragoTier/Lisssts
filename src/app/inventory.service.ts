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

  addToInventory(inventory: InventoryList[]) { //do not touch
    inventory = inventory.reverse();
    //for each list in inventory compare with each list in this.inventory
    for(var t = inventory.length - 1; t >= 0; t--){
      for( var i = this.inventory.length -1; i >= 0; i--){
        //if both contain a list with the same name
        if(inventory[t].name === this.inventory[i].name){
          //compare each item of the list with each item of the corresponding list
          for( var j = inventory[t].items.length -1; j >= 0; j--){
            for(var k = this.inventory[i].items.length -1; k >= 0; k--){
              //if item with same is found: add count to existing item in this.inventory and remove it form list
              if(inventory[t].items[j].name === this.inventory[i].items[k].name){
                this.inventory[i].items[k].count += inventory[t].items[j].count;
                inventory[t].items.splice(j, 1);
                break;
              }
            }
          }
          // add remaining items to this.inventory
          inventory[t].items.forEach( (item) => {
            this.inventory[i].items.push(item);
          });
          // remove the list
          inventory.splice(t, 1);
          break;
        }
      }
    }
    inventory.forEach((list) => {
      this.inventory.push(list);
    });
    this.inventorySource.next(this.inventory);
  }
}
