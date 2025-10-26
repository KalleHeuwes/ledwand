import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfGoalsComponent } from './table-of-goals.component';

describe('TableOfGoalsComponent', () => {
  let component: TableOfGoalsComponent;
  let fixture: ComponentFixture<TableOfGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOfGoalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOfGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
