import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListaEquipComponent} from './lista-equip.component';

describe('ListaEquipComponent', () => {
  let component: ListaEquipComponent;
  let fixture: ComponentFixture<ListaEquipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEquipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEquipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
