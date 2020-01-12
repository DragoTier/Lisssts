import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddListModalPage } from './add-list-modal.page';

describe('AddListModalPage', () => {
  let component: AddListModalPage;
  let fixture: ComponentFixture<AddListModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddListModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddListModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
