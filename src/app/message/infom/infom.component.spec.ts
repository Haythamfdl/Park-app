import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InfomComponent} from './infom.component';

describe('InfomComponent', () => {
  let component: InfomComponent;
  let fixture: ComponentFixture<InfomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfomComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
