import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerListeComponent } from './spieler-liste.component';

describe('SpielerListeComponent', () => {
  let component: SpielerListeComponent;
  let fixture: ComponentFixture<SpielerListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielerListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielerListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
