import { Component, ViewChildren, OnInit, QueryList } from '@angular/core';
import { IonReorderGroup, ModalController, PopoverController } from '@ionic/angular';
import { ShoppingListItem, ShoppingList, InventoryList } from '../inventoryClasses';
import { AddItemModalPage } from '../add-item-modal/add-item-modal.page';
import { AddListModalPage } from '../add-list-modal/add-list-modal.page';
import { DeleteListPopoverComponent } from 'app/delete-list-popover/delete-list-popover.component';
import { ShoppingListService } from 'app/shopping-list.service';
import { InventoryService } from 'app/inventory.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  stringToggle: string = 'reorder';
  stringDone: string = 'done';
  reorderButtonName: string = this.stringToggle;
  shoppingLists: ShoppingList[];

  markedItems: number[] = [1];
  masterCheck: boolean;

  constructor(
    private shoppingListService: ShoppingListService, 
    private inventoryService: InventoryService, 
    public modalController: ModalController, 
    public popoverController: PopoverController, 
    ) {}

  @ViewChildren(IonReorderGroup) reorderGroupArray !: QueryList<IonReorderGroup>;

  ngOnInit(){
    this.subscribeShoppingList();
  }

  addToInventory(){
    let newInventory: InventoryList[] = [];
    for(var t = this.shoppingLists.length -1; t >= 0; t--){
      let newList: InventoryList = {
        id: this.shoppingLists[t].id,
        name: this.shoppingLists[t].name,
        items: []
      };
      for(var i = this.shoppingLists[t].items.length -1; i >= 0; i--){
        if(this.shoppingLists[t].items[i].isChecked){
          if(!newInventory.includes(newList)){
            newInventory.push(newList);
          }
          newInventory[newInventory.length-1].items.push(this.shoppingLists[t].items[i]);
          
          this.shoppingLists[t].items.splice(i, 1);
        }
      }
    }
    this.updateShoppingLists();
    this.inventoryService.addToInventory(newInventory);
    this.checkEvent();
  }

  checkEvent(){
    let checked = 0;
    this.shoppingLists.map( obj => {
      obj.items.map( item => {
        if(item.isChecked) checked++;
      });
    });
    if(checked > 0) {
      this.masterCheck = true;
    } else {
      this.masterCheck = false;
    }
  }

  async presentPopover(ev: any, id: number) {
    const popover = await this.popoverController.create({
      component: DeleteListPopoverComponent,
      event: ev,
      // translucent: true
    });
    popover.onDidDismiss().then( detail => {
      if(detail !== null && detail.data.deletePressed){
        this.shoppingLists.forEach( (list, invIndex) => {
          if(list.id == id){
            this.shoppingLists.splice(invIndex, 1);
            this.updateShoppingLists();
            return;
          }
        });
      }
    });
    return await popover.present();
  }

  async presentNewListModal() {
    let lastId: number = 0;
    if(this.shoppingLists.length > 0){
      lastId = this.shoppingLists[this.shoppingLists.length-1].id;
    }

    const modal = await this.modalController.create({
      component: AddListModalPage,
      componentProps: {
        'lastId': lastId
      }
    });
    modal.onDidDismiss().then((detail) => {
      if(detail !== null){
        this.shoppingLists.push(detail.data.list);
      }
    });
    return await modal.present();
  }

  async presentNewItemModal(id: number) {
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

  subscribeShoppingList(): void {
    this.shoppingListService.getShoppingList()
    .subscribe(shoppingList => {this.shoppingLists = shoppingList;});
  }

  doReorder(ev: any, id: number){
    this.shoppingLists.forEach( (list, invIndex) => {
      if(list.id == id){
        this.shoppingLists[invIndex].items = ev.detail.complete(this.shoppingLists[invIndex].items);
        return;
      }
    });
    this.updateShoppingLists();
  }

  toggleReorderGroups(){
    this.reorderGroupArray.forEach( (reorderGroup, index) => {
      reorderGroup.disabled = !reorderGroup.disabled;
    });
    this.reorderButtonName = this.toggleReorderButtonName(this.reorderGroupArray.first.disabled);
  }

  delete(item: ShoppingListItem, id: number){
    this.shoppingLists.forEach( (list, invIndex) => {
      if(list.id == id){
        const listIndex = list.items.indexOf(item, 0);
        if(listIndex > -1){
          if(list.items[listIndex].count > 1){
            this.shoppingLists[invIndex].items[listIndex].count--;
          } else {
            this.shoppingLists[invIndex].items.splice(listIndex, 1);
          }
        }
        this.updateShoppingLists();
        return;
      }
    });
  }

  add(item: ShoppingListItem, id: number){
    this.shoppingLists.forEach( (list, invIndex) => {
      if(list.id == id){
        const listIndex = list.items.indexOf(item, 0);
        if(listIndex > -1){
          this.shoppingLists[invIndex].items[listIndex].count++;
        } else {
          this.shoppingLists[invIndex].items.push(item);
        }
        this.updateShoppingLists();
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
  private updateShoppingLists(){
    this.shoppingListService.setShoppingList(this.shoppingLists);
  }

  private toggleReorderButtonName(isDisabled: boolean): string {
    if(isDisabled) {
      return this.stringToggle;
    } else {
      return this.stringDone;
    }
  }
}
