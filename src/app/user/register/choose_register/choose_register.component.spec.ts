/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Choose_registerComponent } from './choose_register.component';

describe('Choose_registerComponent', () => {
  let component: Choose_registerComponent;
  let fixture: ComponentFixture<Choose_registerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Choose_registerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Choose_registerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
