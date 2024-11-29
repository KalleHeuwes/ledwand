import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalbzeitComponent } from './halbzeit.component';

describe('HalbzeitComponent', () => {
  let component: HalbzeitComponent;
  let fixture: ComponentFixture<HalbzeitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HalbzeitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalbzeitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
