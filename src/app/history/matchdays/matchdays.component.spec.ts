import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchdaysComponent } from './matchdays.component';

describe('MatchdaysComponent', () => {
  let component: MatchdaysComponent;
  let fixture: ComponentFixture<MatchdaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchdaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
