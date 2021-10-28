import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEspecilidadComponent } from './listado-especilidad.component';

describe('ListadoEspecilidadComponent', () => {
  let component: ListadoEspecilidadComponent;
  let fixture: ComponentFixture<ListadoEspecilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoEspecilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEspecilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
