import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieraComponent } from './modifiera.component';

describe('ModifieraComponent', () => {
  let component: ModifieraComponent;
  let fixture: ComponentFixture<ModifieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
