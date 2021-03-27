import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListmNlComponent} from './listm-nl.component';

describe('ListmNlComponent', () => {
  let component: ListmNlComponent;
  let fixture: ComponentFixture<ListmNlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListmNlComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmNlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
