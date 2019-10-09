import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAuctionComponent } from './form-auction.component';

describe('FormAuctionComponent', () => {
  let component: FormAuctionComponent;
  let fixture: ComponentFixture<FormAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
