import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule} from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddItemModalPageModule } from './add-item-modal/add-item-modal.module';
import { AddListModalPageModule } from './add-list-modal/add-list-modal.module';
import { DeleteListPopoverComponent } from './delete-list-popover/delete-list-popover.component';

@NgModule({
  declarations: [
    AppComponent, 
    DeleteListPopoverComponent
  ],
  entryComponents: [DeleteListPopoverComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule, 
    AddItemModalPageModule, 
    AddListModalPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
