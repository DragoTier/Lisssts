import { Component, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  items = [1, 2, 3];

  @ViewChild(IonReorderGroup, {static: false}) reorderGroup: IonReorderGroup;

  constructor() {}

  doReorder(ev: any){
    ev.detail.complete();
    //this.items = ev.detail.complete(this.items);
  }

  toggleReorderGrouo(){
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

}
