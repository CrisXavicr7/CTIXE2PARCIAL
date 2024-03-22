import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuestosPage } from './puestos.page';

describe('PuestosPage', () => {
  let component: PuestosPage;
  let fixture: ComponentFixture<PuestosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PuestosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
