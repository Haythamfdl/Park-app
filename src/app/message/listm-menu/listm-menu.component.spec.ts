import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListmMenuComponent} from './listm-menu.component';

describe('ListmMenuComponent', () => {
  let component: ListmMenuComponent;
  let fixture: ComponentFixture<ListmMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListmMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
