import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { InventoryList, ShoppingList } from './inventoryClasses';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  

  shoppingList: ShoppingList[] = [];

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

  addToShoppingList(newShoppingList: ShoppingList) {
    if(newShoppingList.items.length > 1)
      return;

    this.shoppingList.forEach((list) => {
      if(list.name == newShoppingList.name){
        list.items.forEach((item) => {
          if(item.name === newShoppingList.items[0].name){
            item.count++;
            newShoppingList.items.splice(0, 1);
          }
        });
        for(var t = newShoppingList.items.length -1; t >= 0; t--){
          list.items.push(newShoppingList.items[t]);
          newShoppingList.items.splice(t, 1);
        }
      }
    });
    if(newShoppingList.items.length > 0){
      this.shoppingList.push(newShoppingList);
    }
    this.shoppingListSource.next(this.shoppingList);
  }
}
