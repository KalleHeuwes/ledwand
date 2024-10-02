import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartupdateComponent } from './smartupdate.component';

describe('SmartupdateComponent', () => {
  let component: SmartupdateComponent;
  let fixture: ComponentFixture<SmartupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartupdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
