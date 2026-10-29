import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoProdutosComponent } from './gerenciamento-produtos.component';

describe('GerenciamentoProdutosComponent', () => {
  let component: GerenciamentoProdutosComponent;
  let fixture: ComponentFixture<GerenciamentoProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciamentoProdutosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerenciamentoProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
