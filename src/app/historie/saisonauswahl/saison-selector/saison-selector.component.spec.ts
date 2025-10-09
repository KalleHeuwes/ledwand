import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisonSelectorComponent } from './saison-selector.component';

describe('SaisonSelectorComponent', () => {
  let component: SaisonSelectorComponent;
  let fixture: ComponentFixture<SaisonSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaisonSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaisonSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
