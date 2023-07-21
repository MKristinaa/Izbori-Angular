/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Party_registerComponent } from './party_register.component';

describe('Party_registerComponent', () => {
  let component: Party_registerComponent;
  let fixture: ComponentFixture<Party_registerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Party_registerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Party_registerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
