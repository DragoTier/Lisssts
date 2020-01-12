import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { InventoryItem } from '../mock-inventory';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.page.html',
  styleUrls: ['./add-item-modal.page.scss'],
})
export class AddItemModalPage implements OnInit {

  @Input() id: number;

  item: InventoryItem = {
    name: 'FUCK THIS SHIT',
    count: 6
  }

  constructor(navParams: NavParams, private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss({ //JSON data
      'id': this.id,
      'item': this.item
    });
  }

  

}
