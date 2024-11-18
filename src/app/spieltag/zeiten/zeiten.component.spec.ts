import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeitenComponent } from './zeiten.component';

describe('ZeitenComponent', () => {
  let component: ZeitenComponent;
  let fixture: ComponentFixture<ZeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZeitenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
