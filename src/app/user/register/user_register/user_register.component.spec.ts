/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { User_registerComponent } from './user_register.component';

describe('User_registerComponent', () => {
  let component: User_registerComponent;
  let fixture: ComponentFixture<User_registerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User_registerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User_registerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
