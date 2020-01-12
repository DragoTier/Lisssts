import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddListModalPage } from './add-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddListModalPageRoutingModule {}
