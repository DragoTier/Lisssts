import { Component, ViewChild, OnInit } from '@angular/core';
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

  @ViewChild(IonReorderGroup, {static: false}) reorderGroup: IonReorderGroup;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(){
    this.getInventory();
  }

  getInventory(): void {
    this.inventory = this.inventoryService.getInventory();
  }

  doReorder(ev: any){
    this.inventory.forEach(element => {
      element = ev.detail.complete(element);
    });
    
  }

  toggleReorderGroup(){
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
    this.reorderButtonName = this.toggleReorderButtonName(this.reorderGroup.disabled);
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

  private toggleReorderButtonName(isDisabled: boolean): string {
    if(isDisabled) {
      return this.stringToggle;
    } else {
      return this.stringDone;
    }
  }
}
