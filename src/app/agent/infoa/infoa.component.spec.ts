import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoaComponent} from './infoa.component';

describe('InfoaComponent', () => {
  let component: InfoaComponent;
  let fixture: ComponentFixture<InfoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
