import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EDocketComponent } from './e-docket.component';

describe('EDocketComponent', () => {
  let component: EDocketComponent;
  let fixture: ComponentFixture<EDocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EDocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EDocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
