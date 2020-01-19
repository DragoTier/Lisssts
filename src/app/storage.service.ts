import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InventoryService } from './inventory.service';
import { ShoppingListService } from './shopping-list.service';
import { InventoryList } from './inventoryClasses';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  inventoryKey: string = 'inventory';
  shoppingListsKey: string = 'shoppingLists';
  inventory: InventoryList[];
  shoppingLists: InventoryList[];
  private firstInvokeInventory = true;
  private firstInvokeShoppingList = true;

  constructor(private storage: Storage, private inventoryService: InventoryService, private shoppingListService: ShoppingListService) { }

  subscribeInventory() {
    this.inventoryService.getInventory()
    .subscribe(inventory => {this.inventory = inventory; this.storeInventory();});
  }

  subscribeShoppingLists() {
    this.shoppingListService.getShoppingList()
    .subscribe(shoppingLists =>  {this.shoppingLists = shoppingLists; this.storeShoppingList();});
  }

  async storeShoppingList(){
    if(this.firstInvokeShoppingList){
      this.firstInvokeShoppingList = false;
    } else{
      this.storage.set(this.shoppingListsKey, JSON.stringify(this.shoppingLists));
    }
  }

  async storeInventory(){
    if(this.firstInvokeInventory){
      this.firstInvokeInventory = false;
    } else {
      this.storage.set(this.inventoryKey, JSON.stringify(this.inventory));
    }
  }

  async storeToDisk(){
    this.storeInventory();
    this.storeShoppingList();
  }

  async loadFromDisk(){
    this.storage.get(this.inventoryKey).then(val => {
      this.inventoryService.setInventory(JSON.parse(val));
    });
    this.storage.get(this.shoppingListsKey).then(val => {
      this.shoppingListService.setShoppingList(JSON.parse(val));
    });
  }
}
