import { Component, ViewChildren, OnInit, QueryList } from '@angular/core';
import { IonReorderGroup, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { InventoryItem, InventoryList } from '../mock-inventory';
import { InventoryService } from '../inventory.service';
import { AddItemModalPage } from '../add-item-modal/add-item-modal.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  stringToggle: string = 'reorder';
  stringDone: string = 'done';
  reorderButtonName: string = this.stringToggle;
  inventory: InventoryList[];

  inventoryItem: InventoryItem = {
    name: 'MockItem',
    count: 5
  }

  constructor(private inventoryService: InventoryService, public modalController: ModalController) {}

  @ViewChildren(IonReorderGroup) reorderGroupArray !: QueryList<IonReorderGroup>;

  ngOnInit(){
    this.subscribeInventory();
  }

  async presentModal(id: number) {
    const modal = await this.modalController.create({
      component: AddItemModalPage,
      componentProps: {
        'id': id,
      }
    });
    modal.onDidDismiss().then((detail) => {
      if(detail !== null){
        this.add(detail.data.item, detail.data.id);
      }
    });
    return await modal.present();
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
