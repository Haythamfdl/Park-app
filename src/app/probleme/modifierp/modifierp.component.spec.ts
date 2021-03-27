import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifierpComponent} from './modifierp.component';

describe('ModifierpComponent', () => {
  let component: ModifierpComponent;
  let fixture: ComponentFixture<ModifierpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifierpComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
