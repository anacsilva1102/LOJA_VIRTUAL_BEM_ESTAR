import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemServicoComponent } from './item-servico.component';

describe('ItemServicoComponent', () => {
  let component: ItemServicoComponent;
  let fixture: ComponentFixture<ItemServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemServicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
