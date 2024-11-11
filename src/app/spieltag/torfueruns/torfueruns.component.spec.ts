import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorfuerunsComponent } from './torfueruns.component';

describe('TorfuerunsComponent', () => {
  let component: TorfuerunsComponent;
  let fixture: ComponentFixture<TorfuerunsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorfuerunsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorfuerunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
