import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListpRComponent} from './listp-r.component';

describe('ListpRComponent', () => {
  let component: ListpRComponent;
  let fixture: ComponentFixture<ListpRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
