import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BibliaComponent } from './biblia.component';

describe('BibliaComponent', () => {
  let component: BibliaComponent;
  let fixture: ComponentFixture<BibliaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
