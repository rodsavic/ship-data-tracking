import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipTracking } from './ship-tracking';

describe('ShipTracking', () => {
  let component: ShipTracking;
  let fixture: ComponentFixture<ShipTracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipTracking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipTracking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
