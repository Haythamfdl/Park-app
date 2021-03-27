import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListpNrComponent} from './listp-nr.component';

describe('ListpNrComponent', () => {
  let component: ListpNrComponent;
  let fixture: ComponentFixture<ListpNrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListpNrComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpNrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
