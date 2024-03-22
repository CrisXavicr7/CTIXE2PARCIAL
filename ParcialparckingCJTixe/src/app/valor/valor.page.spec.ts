import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValorPage } from './valor.page';

describe('ValorPage', () => {
  let component: ValorPage;
  let fixture: ComponentFixture<ValorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ValorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
