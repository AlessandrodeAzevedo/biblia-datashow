import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LouvorComponent } from './louvor.component';

describe('LouvorComponent', () => {
  let component: LouvorComponent;
  let fixture: ComponentFixture<LouvorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LouvorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LouvorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
