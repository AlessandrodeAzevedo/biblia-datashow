import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AtalhoComponent } from './atalho.component';

describe('AtalhoComponent', () => {
  let component: AtalhoComponent;
  let fixture: ComponentFixture<AtalhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AtalhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
