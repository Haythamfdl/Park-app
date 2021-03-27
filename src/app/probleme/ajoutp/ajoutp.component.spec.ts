import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AjoutpComponent} from './ajoutp.component';

describe('AjoutpComponent', () => {
  let component: AjoutpComponent;
  let fixture: ComponentFixture<AjoutpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutpComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
