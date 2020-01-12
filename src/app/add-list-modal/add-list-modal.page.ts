import { Component, OnInit, Input } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { InventoryList, InventoryItem} from '../mock-inventory';

@Component({
  selector: 'app-add-list-modal',
  templateUrl: './add-list-modal.page.html',
  styleUrls: ['./add-list-modal.page.scss'],
})
export class AddListModalPage implements OnInit {

  toastMessage: string = 'Please fill in the field first';
  name: string = "";
  
  @Input() lastId: number;

  constructor(private modalCtrl: ModalController, public toastController: ToastController) { }

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
    if(this.name.length > 0){
      this.dismiss();
    } else{
      this.presentToast();
    }
  }

  dismiss(){
    const list: InventoryList = {
      name: this.name,
      id: ++this.lastId,
      items: []
    }

    
    this.modalCtrl.dismiss({ //JSON data
      'list': list
    });
  }

}
