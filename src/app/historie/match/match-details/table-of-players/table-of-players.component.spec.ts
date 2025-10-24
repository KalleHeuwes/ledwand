import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfPlayersComponent } from './table-of-players.component';

describe('TableOfPlayersComponent', () => {
  let component: TableOfPlayersComponent;
  let fixture: ComponentFixture<TableOfPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOfPlayersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOfPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
