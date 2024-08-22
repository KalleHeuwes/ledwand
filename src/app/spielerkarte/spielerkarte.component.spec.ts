import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerkarteComponent } from './spielerkarte.component';

describe('SpielerkarteComponent', () => {
  let component: SpielerkarteComponent;
  let fixture: ComponentFixture<SpielerkarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerkarteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielerkarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
