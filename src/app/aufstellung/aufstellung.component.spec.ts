import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AufstellungComponent } from './aufstellung.component';

describe('AufstellungComponent', () => {
  let component: AufstellungComponent;
  let fixture: ComponentFixture<AufstellungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AufstellungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AufstellungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
