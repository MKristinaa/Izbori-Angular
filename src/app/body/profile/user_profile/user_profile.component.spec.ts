/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { User_profileComponent } from './user_profile.component';

describe('User_profileComponent', () => {
  let component: User_profileComponent;
  let fixture: ComponentFixture<User_profileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User_profileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User_profileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
