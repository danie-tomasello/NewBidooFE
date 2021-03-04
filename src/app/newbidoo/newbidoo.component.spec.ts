import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbidooComponent } from './newbidoo.component';

describe('NewbidooComponent', () => {
  let component: NewbidooComponent;
  let fixture: ComponentFixture<NewbidooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewbidooComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbidooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
