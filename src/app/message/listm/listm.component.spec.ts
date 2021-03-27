import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListmComponent} from './listm.component';

describe('ListmComponent', () => {
  let component: ListmComponent;
  let fixture: ComponentFixture<ListmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListmComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
