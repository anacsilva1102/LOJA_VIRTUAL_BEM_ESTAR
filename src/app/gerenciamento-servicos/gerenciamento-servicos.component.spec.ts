import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoServicosComponent } from './gerenciamento-servicos.component';

describe('GerenciamentoServicosComponent', () => {
  let component: GerenciamentoServicosComponent;
  let fixture: ComponentFixture<GerenciamentoServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciamentoServicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerenciamentoServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
