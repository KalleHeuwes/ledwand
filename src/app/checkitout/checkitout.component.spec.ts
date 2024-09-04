import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckitoutComponent } from './checkitout.component';

describe('CheckitoutComponent', () => {
  let component: CheckitoutComponent;
  let fixture: ComponentFixture<CheckitoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckitoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckitoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
