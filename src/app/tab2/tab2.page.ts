import { Component, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { InventoryItem } from '../inventory-item';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  stringToggle: string = 'reorder';
  stringDone: string = 'done';

  reorderButtonName: string = this.stringToggle;
  inventoryItem: InventoryItem = {
    name: 'Bier',
    count: 6
  };
  inventoryItems: InventoryItem[] = [
    {name: 'Bier', count: 6},
    {name: 'Nudeln', count: 1},
    {name: 'Tomaten', count: 1},
    {name: 'Pesto', count: 2},
    {name: 'Feta', count: 2}
  ];

  items = [1, 2, 3];

  @ViewChild(IonReorderGroup, {static: false}) reorderGroup: IonReorderGroup;

  constructor() {}


  doReorder(ev: any){
    this.inventoryItems = ev.detail.complete(this.inventoryItems);
  }

  toggleReorderGroup(){
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
    this.reorderButtonName = this.toggleReorderButtonName(this.reorderGroup.disabled);
  }

  delete(item: InventoryItem){
    item.name = '';
    
  }

  add(item: InventoryItem){
    item.name = 'Bier2';
  }

  private toggleReorderButtonName(isDisabled: boolean): string {
    if(isDisabled) {
      return this.stringToggle;
    } else {
      return this.stringDone;
    }
  }
}
