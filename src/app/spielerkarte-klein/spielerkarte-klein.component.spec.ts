import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerkarteKleinComponent } from './spielerkarte-klein.component';

describe('SpielerkarteKleinComponent', () => {
  let component: SpielerkarteKleinComponent;
  let fixture: ComponentFixture<SpielerkarteKleinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerkarteKleinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielerkarteKleinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
