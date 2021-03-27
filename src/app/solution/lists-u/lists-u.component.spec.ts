import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListsUComponent} from './lists-u.component';

describe('ListsUComponent', () => {
  let component: ListsUComponent;
  let fixture: ComponentFixture<ListsUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsUComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
