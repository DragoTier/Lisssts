import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { InventoryList, ShoppingList } from './inventoryClasses';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  shoppingList: ShoppingList[] = [
    {name: 'Lebensmittel', id: 1, items: [{name: 'Tomaten', count: 5, isChecked: false}, {name: 'Gurken', count: 1, isChecked: false}]},
    {name: 'Anderes', id: 2, items: [{name: 'Glasreiniger', count: 1, isChecked: false}, {name: 'Spargelschäler', count: 1, isChecked: false}]}
  ];

  private shoppingListSource = new BehaviorSubject<ShoppingList[]>(this.shoppingList);
  shoppingList$ = this.shoppingListSource.asObservable();
  
  constructor() { }

  getShoppingList(): Observable<ShoppingList[]>{
    return this.shoppingList$;
  }

  setShoppingList(shoppingList: ShoppingList[]){
    this.shoppingList = shoppingList;
    this.shoppingListSource.next(shoppingList);
  }
}
