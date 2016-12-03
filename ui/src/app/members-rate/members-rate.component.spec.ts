/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MembersRateComponent } from './members-rate.component';

describe('MembersRateComponent', () => {
  let component: MembersRateComponent;
  let fixture: ComponentFixture<MembersRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
