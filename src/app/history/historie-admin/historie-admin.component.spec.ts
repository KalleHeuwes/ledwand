import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorieAdminComponent } from './historie-admin.component';

describe('HistorieAdminComponent', () => {
  let component: HistorieAdminComponent;
  let fixture: ComponentFixture<HistorieAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorieAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorieAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
