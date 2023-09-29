import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinancepayEditComponent } from './binancepay-edit.component';

describe('BinancepayEditComponent', () => {
  let component: BinancepayEditComponent;
  let fixture: ComponentFixture<BinancepayEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinancepayEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinancepayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
