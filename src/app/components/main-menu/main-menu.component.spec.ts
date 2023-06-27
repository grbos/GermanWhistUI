import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuComponent as MainMenu } from './main-menu.component';

describe('MainMenuComponent', () => {
  let component: MainMenu;
  let fixture: ComponentFixture<MainMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMenu ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
