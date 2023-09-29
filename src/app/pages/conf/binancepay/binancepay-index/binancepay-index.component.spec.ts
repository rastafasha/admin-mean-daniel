import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinancepayIndexComponent } from './binancepay-index.component';

describe('BinancepayIndexComponent', () => {
  let component: BinancepayIndexComponent;
  let fixture: ComponentFixture<BinancepayIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinancepayIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinancepayIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
