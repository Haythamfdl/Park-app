import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutaComponent } from './ajouta.component';

describe('AjoutaComponent', () => {
  let component: AjoutaComponent;
  let fixture: ComponentFixture<AjoutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
