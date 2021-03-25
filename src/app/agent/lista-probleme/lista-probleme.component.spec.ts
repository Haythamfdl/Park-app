import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListaProblemeComponent} from './lista-probleme.component';

describe('ListaProblemeComponent', () => {
  let component: ListaProblemeComponent;
  let fixture: ComponentFixture<ListaProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProblemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
