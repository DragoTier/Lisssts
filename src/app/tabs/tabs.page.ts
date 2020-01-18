import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.storageService.subscribeShoppingLists();
    this.storageService.subscribeInventory();
  }
}
