import { HttpClientModule } from '@angular/common/http';
import { HeroService } from './../hero.service';
import { HeroComponent } from './../hero/hero.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";
import { By } from '@angular/platform-browser';
import { Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';


@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
describe("HeroesComponent", () => {
  let component: ComponentFixture<HeroesComponent>;
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
    TestBed.configureTestingModule({
      declarations:[HeroesComponent, HeroComponent],
      imports:[HttpClientModule],
      providers: [{ provide: HeroService, useValue: mockHeroService
     }],
     schemas: [NO_ERRORS_SCHEMA]
    })
    component = TestBed.createComponent(HeroesComponent);
  });

  describe("Delete", () => {
    it("should delete one of the elements", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.componentInstance.heroes = HEROES;
      component.componentInstance.delete(HEROES[2]);
      expect(component.componentInstance.heroes.length).toBe(2);
    });

    it("should call deleteHero", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.componentInstance.heroes = HEROES;
      component.componentInstance.delete(HEROES[2]);
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });

  it("set the heroes correctly", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    component.detectChanges();
    expect(component.componentInstance.heroes.length).toBe(3);
  });

  it('should call the heroService.deleteHero when the Hero Component delete button is clicked', () => {
    spyOn(component.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    component.detectChanges();

    const heroComponents = component.debugElement.queryAll(By.directive(HeroComponent));
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit();

    expect(component.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  })

  it('should add a new  hero to the hero list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    component.detectChanges();

    mockHeroService.addHero.and.returnValue(of({
      id: 1,
      name: "Mr Jackson",
      strength: 4
    }));

    let input = component.debugElement.query(By.css('input')).nativeElement;
    input.value = "Mr Jackson";

    let button = component.debugElement.queryAll(By.css('button'))[0];
    button.triggerEventHandler('click', null);

    component.detectChanges();

    const heroText = component.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain("Mr Jackson");
   });
})
