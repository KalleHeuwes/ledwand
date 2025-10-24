import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfDocsComponent } from './table-of-docs.component';

describe('TableOfDocsComponent', () => {
  let component: TableOfDocsComponent;
  let fixture: ComponentFixture<TableOfDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOfDocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOfDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
