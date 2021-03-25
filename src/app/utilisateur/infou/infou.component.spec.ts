import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfouComponent } from './infou.component';

describe('InfouComponent', () => {
  let component: InfouComponent;
  let fixture: ComponentFixture<InfouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
