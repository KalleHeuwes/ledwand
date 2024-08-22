import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpieltagComponent } from './spieltag.component';

describe('SpieltagComponent', () => {
  let component: SpieltagComponent;
  let fixture: ComponentFixture<SpieltagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpieltagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpieltagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
