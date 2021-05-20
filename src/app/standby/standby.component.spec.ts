import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StandbyComponent } from './standby.component';

describe('StandbyComponent', () => {
  let component: StandbyComponent;
  let fixture: ComponentFixture<StandbyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StandbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
