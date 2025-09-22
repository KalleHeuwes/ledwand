import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerprofilComponent } from './spielerprofil.component';

describe('SpielerprofilComponent', () => {
  let component: SpielerprofilComponent;
  let fixture: ComponentFixture<SpielerprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerprofilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielerprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
