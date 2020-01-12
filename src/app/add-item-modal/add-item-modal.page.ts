import { Component, OnInit, Input } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { InventoryItem } from '../mock-inventory';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.page.html',
  styleUrls: ['./add-item-modal.page.scss'],
})
export class AddItemModalPage implements OnInit {

  toastMessage: string = 'Please fill in the fields first';

  @Input() id: number;

  name: string = "";
  count: string = "";

  constructor(private modalCtrl: ModalController, public toastController: ToastController) {}

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.toastMessage,
      duration: 1300,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }

  
  checkProperties(){
    if(this.name.length > 0 && this.count.length > 0){
      this.dismiss();
    } else{
      this.presentToast();
    }
  }

  dismiss(){
    const item: InventoryItem = {
      name: this.name,
      count: +this.count
    };
    this.modalCtrl.dismiss({ //JSON data
      'id': this.id,
      'item': item
    });
  }

  

}
