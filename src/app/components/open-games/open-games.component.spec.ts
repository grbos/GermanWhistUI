import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenGamesComponent } from './open-games.component';

describe('OpenGamesComponent', () => {
  let component: OpenGamesComponent;
  let fixture: ComponentFixture<OpenGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
