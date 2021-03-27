import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EnvoyermComponent} from './envoyerm.component';

describe('EnvoyermComponent', () => {
  let component: EnvoyermComponent;
  let fixture: ComponentFixture<EnvoyermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvoyermComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoyermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
