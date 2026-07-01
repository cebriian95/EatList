import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpotModal } from './add-spot-modal';

describe('AddSpotModal', () => {
  let component: AddSpotModal;
  let fixture: ComponentFixture<AddSpotModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSpotModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSpotModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
