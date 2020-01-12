import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddListModalPageRoutingModule } from './add-list-modal-routing.module';

import { AddListModalPage } from './add-list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddListModalPageRoutingModule
  ],
  declarations: [AddListModalPage]
})
export class AddListModalPageModule {}
