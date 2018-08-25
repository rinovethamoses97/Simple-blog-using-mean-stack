import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostwallComponent } from './postwall.component';

describe('PostwallComponent', () => {
  let component: PostwallComponent;
  let fixture: ComponentFixture<PostwallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostwallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostwallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
