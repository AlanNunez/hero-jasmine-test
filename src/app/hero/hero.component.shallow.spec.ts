import { HeroComponent } from './hero.component';
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Shallow test', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let HEROES;
  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8 },
      {id: 2, name: 'Wonderful woman', strength: 8 },
      {id: 3, name: 'SuperDude', strength: 8 },
    ]
      TestBed.configureTestingModule({
        declarations:[HeroComponent],
        schemas: [NO_ERRORS_SCHEMA]
      })

      fixture = TestBed.createComponent(HeroComponent);
  })

  it('Vanilla test', () => {
     fixture.componentInstance.hero = { id: 1, name: "SuperDude", strength: 3};
     expect(fixture.componentInstance.hero.name).toBe('SuperDude');
  })

  it('Vanilla DOM test', () => {
    fixture.componentInstance.hero = { id: 1, name: "SuperDude", strength: 3};
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('a'));
    expect(debugElement.nativeElement.textContent).toContain('SuperDude');
 })

})
