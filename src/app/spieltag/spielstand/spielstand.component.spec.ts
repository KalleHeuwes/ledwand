import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielstandComponent } from './spielstand.component';

describe('SpielstandComponent', () => {
  let component: SpielstandComponent;
  let fixture: ComponentFixture<SpielstandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielstandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielstandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
