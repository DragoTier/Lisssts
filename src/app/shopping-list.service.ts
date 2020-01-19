import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { InventoryList } from './inventoryClasses';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  shoppingList: InventoryList[] = [
    {name: 'Lebensmittel', id: 1, items: [{name: 'Tomaten', count: 5}, {name: 'Gurken', count: 1}]},
    {name: 'Anderes', id: 2, items: [{name: 'Glasreiniger', count: 1}, {name: 'Spargelschäler', count: 1}]}
  ];

  private shoppingListSource = new BehaviorSubject<InventoryList[]>(this.shoppingList);
  shoppingList$ = this.shoppingListSource.asObservable();
  
  constructor() { }

  getShoppingList(): Observable<InventoryList[]>{
    return this.shoppingList$;
  }

  setShoppingList(shoppingList: InventoryList[]){
    this.shoppingList = shoppingList;
    this.shoppingListSource.next(shoppingList);
  }
}
