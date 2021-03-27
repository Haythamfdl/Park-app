import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListpMenuComponent} from './listp-menu.component';

describe('ListpMenuComponent', () => {
  let component: ListpMenuComponent;
  let fixture: ComponentFixture<ListpMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListpMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
