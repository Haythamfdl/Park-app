import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListmLComponent} from './listm-l.component';

describe('ListmLComponent', () => {
  let component: ListmLComponent;
  let fixture: ComponentFixture<ListmLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListmLComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
