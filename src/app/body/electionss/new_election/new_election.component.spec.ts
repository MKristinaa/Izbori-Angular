/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { New_electionComponent } from './new_election.component';

describe('New_electionComponent', () => {
  let component: New_electionComponent;
  let fixture: ComponentFixture<New_electionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ New_electionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(New_electionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
