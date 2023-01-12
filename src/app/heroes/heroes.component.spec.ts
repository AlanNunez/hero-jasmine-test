import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe("HeroesComponent", () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "Wonderful woman", strength: 8 },
      { id: 3, name: "SuperDude", strength: 8 },
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);
    component = new HeroesComponent(mockHeroService);
  });

  describe("Delete", () => {
    it("should delete one of the elements", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(component.heroes.length).toBe(2);
    });

    it("should call deleteHero", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });

  it("set the heroes correctly", () => {
    // mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // let fixture = TestBed.createComponent(HeroesComponent);
    // expect(fixture.componentInstance.heroes.length).toBe(3);
  });
});
