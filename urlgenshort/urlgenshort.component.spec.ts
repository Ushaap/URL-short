import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlgenshortComponent } from './urlgenshort.component';

describe('UrlgenshortComponent', () => {
  let component: UrlgenshortComponent;
  let fixture: ComponentFixture<UrlgenshortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlgenshortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlgenshortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
