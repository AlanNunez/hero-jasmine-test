import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail.component';
import { of } from 'rxjs';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } }
    });
    const locationStub = () => ({ back: () => ({}) });
    const heroServiceStub = () => ({
      getHero: id => ({ subscribe: f => f({}) }),
      updateHero: hero => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Location, useFactory: locationStub },
        { provide: HeroService, useFactory: heroServiceStub }
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getHero').and.callThrough();
      component.ngOnInit();
      expect(component.getHero).toHaveBeenCalled();
    });
  });

  describe('getHero', () => {
    it('makes expected calls', () => {
      const heroServiceStub: HeroService = fixture.debugElement.injector.get(
        HeroService
      );
      spyOn(heroServiceStub, 'getHero').and.callThrough();
      component.getHero();
      expect(heroServiceStub.getHero).toHaveBeenCalled();
    });
  });

  describe('goBack', () => {
    it('makes expected calls', () => {
      const locationStub: Location = fixture.debugElement.injector.get(
        Location
      );
      spyOn(locationStub, 'back').and.callThrough();
      component.goBack();
      expect(locationStub.back).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getHero').and.callThrough();
      component.ngOnInit();
      expect(component.getHero).toHaveBeenCalled();
    });;

    it('should capitalize the hero name', () => {
      const heroServiceStub: HeroService = fixture.debugElement.injector.get(
        HeroService
      );
      spyOn(heroServiceStub, 'getHero').and.returnValue(of(
        { id: 3, name: "SuperDude", strength: 8 },
      ));
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    });
  });

  describe('save', () => {
    it('makes expected calls', () => {
      const heroServiceStub: HeroService = fixture.debugElement.injector.get(
        HeroService
      );
      spyOn(component, 'goBack').and.callThrough();
      spyOn(heroServiceStub, 'updateHero').and.returnValue(of(true))
      component.save();
      expect(component.goBack).toHaveBeenCalled();
      expect(heroServiceStub.updateHero).toHaveBeenCalled();
    });
  });
});
