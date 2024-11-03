import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerwechselComponent } from './spielerwechsel.component';

describe('SpielerwechselComponent', () => {
  let component: SpielerwechselComponent;
  let fixture: ComponentFixture<SpielerwechselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerwechselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielerwechselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
