import { HeroComponent } from './../hero/hero.component';
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroService } from '../hero.service';

describe('Shallow test', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
      TestBed.configureTestingModule({
        declarations:[HeroComponent],
        providers:[HeroService]
      })

      fixture = TestBed.createComponent(HeroComponent);
  })

  it('Vanilla test', () => {
     fixture.componentInstance.hero = { id: 1, name: "SuperDude", strength: 3};
     expect(fixture.componentInstance.hero.name).toBe('SuperDude');
  })
})
