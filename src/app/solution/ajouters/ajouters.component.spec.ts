import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutersComponent } from './ajouters.component';

describe('AjoutersComponent', () => {
  let component: AjoutersComponent;
  let fixture: ComponentFixture<AjoutersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
