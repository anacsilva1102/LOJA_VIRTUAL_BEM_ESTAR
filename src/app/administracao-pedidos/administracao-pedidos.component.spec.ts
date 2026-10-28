import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracaoPedidosComponent } from './administracao-pedidos.component';

describe('AdministracaoPedidosComponent', () => {
  let component: AdministracaoPedidosComponent;
  let fixture: ComponentFixture<AdministracaoPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministracaoPedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministracaoPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
