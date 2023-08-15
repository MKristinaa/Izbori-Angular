/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PartiesComponent } from './parties.component';

describe('PartiesComponent', () => {
  let component: PartiesComponent;
  let fixture: ComponentFixture<PartiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
