import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-delete-list-popover',
  templateUrl: './delete-list-popover.component.html',
  styleUrls: ['./delete-list-popover.component.scss'],
})
export class DeleteListPopoverComponent implements OnInit {

  deletePressed: boolean = false;

  constructor( public popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.deletePressed = false;
  }

  delete(){
    this.deletePressed = true;
    this.dismiss();
  }

  dismiss(){
    this.popoverCtrl.dismiss({
      'deletePressed': true
    });
  }
}
