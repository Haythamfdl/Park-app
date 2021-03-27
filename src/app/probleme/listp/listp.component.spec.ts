import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListpComponent} from './listp.component';

describe('ListpComponent', () => {
  let component: ListpComponent;
  let fixture: ComponentFixture<ListpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListpComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
