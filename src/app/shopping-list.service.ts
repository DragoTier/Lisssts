import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InventoryList } from './inventoryClasses';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  shoppingList: InventoryList[] = [
    {name: 'Lebensmittel', id: 1, items: [{name: 'Tomaten', count: 5}, {name: 'Gurken', count: 1}]},
    {name: 'Anderes', id: 2, items: [{name: 'Glasreiniger', count: 1}, {name: 'Spargelschäler', count: 1}]}
  ];
  constructor() { }

  getShoppingList(): Observable<InventoryList[]>{
    return of(this.shoppingList);
  }

  setShoppingList(shoppingList: InventoryList[]){
    this.shoppingList = shoppingList;
    this.getShoppingList();
  }
}
