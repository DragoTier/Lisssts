import { Component, ViewChildren, OnInit, QueryList } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { InventoryItem, InventoryList } from '../mock-inventory';
import { InventoryService} from '../inventory.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  stringToggle: string = 'reorder';
  stringDone: string = 'done';

  reorderButtonName: string = this.stringToggle;

  inventoryItem: InventoryItem = {
    name: 'MockItem',
    count: 5
  }

  inventory: InventoryList[];

  constructor(private inventoryService: InventoryService) {}

  @ViewChildren(IonReorderGroup) reorderGroupArray !: QueryList<IonReorderGroup>;

  ngOnInit(){
    this.subscribeInventory();
  }

  subscribeInventory(): void {
    this.inventoryService.getInventory()
    .subscribe(inventory => {this.inventory = inventory; console.log("fetched");});
  }

  doReorder(ev: any, id: number){
    this.inventory.forEach( (list, invIndex) => {
      if(list.id == id){
        this.inventory[invIndex].items = ev.detail.complete(this.inventory[invIndex].items);
        return;
      }
    });
  }

  toggleReorderGroups(){
    this.reorderGroupArray.forEach( (reorderGroup, index) => {
      reorderGroup.disabled = !reorderGroup.disabled;
    });
    this.reorderButtonName = this.toggleReorderButtonName(this.reorderGroupArray.first.disabled);
  }

  delete(item: InventoryItem, id: number){
    this.inventory.forEach( (list, invIndex) => {
      if(list.id == id){
        const listIndex = list.items.indexOf(item, 0);
        if(listIndex > -1){
          if(list.items[listIndex].count > 1){
            this.inventory[invIndex].items[listIndex].count--;
          } else {
            this.inventory[invIndex].items.splice(listIndex, 1);
          }
        }
        this.updateInventory();
        return;
      }
    });
  }

  add(item: InventoryItem, id: number){
    this.inventory.forEach( (list, invIndex) => {
      if(list.id == id){
        const listIndex = list.items.indexOf(item, 0);
        if(listIndex > -1){
          this.inventory[invIndex].items[listIndex].count++;
        } else {
          this.inventory[invIndex].items.push(item);
        }
        this.updateInventory();
        return;
      }
    });
  }

  // addNewItem(item: InventoryItem){
  //   const index = this.inventoryItems.indexOf(item, 0);
  //   if(index > -1){
  //     this.inventoryItems[index].count++;
  //   } else {
  //     this.inventoryItems.push(item);
  //   }
  // }
  private updateInventory(){
    this.inventoryService.setInventory(this.inventory);
  }

  private toggleReorderButtonName(isDisabled: boolean): string {
    if(isDisabled) {
      return this.stringToggle;
    } else {
      return this.stringDone;
    }
  }
}
