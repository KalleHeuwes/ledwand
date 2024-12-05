import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdesignComponent } from './subdesign.component';

describe('SubdesignComponent', () => {
  let component: SubdesignComponent;
  let fixture: ComponentFixture<SubdesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubdesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
