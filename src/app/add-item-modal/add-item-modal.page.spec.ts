import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddItemModalPage } from './add-item-modal.page';

describe('AddItemModalPage', () => {
  let component: AddItemModalPage;
  let fixture: ComponentFixture<AddItemModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddItemModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
