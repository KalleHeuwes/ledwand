import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballTableComponent } from './football-table.component';

describe('FootballTableComponent', () => {
  let component: FootballTableComponent;
  let fixture: ComponentFixture<FootballTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
