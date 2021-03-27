import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifieruComponent} from './modifieru.component';

describe('ModifieruComponent', () => {
  let component: ModifieruComponent;
  let fixture: ComponentFixture<ModifieruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifieruComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifieruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
