import { TestBed } from '@angular/core/testing';
import { ProdutosService } from './produtos-service.service';



describe('ProdutosServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutosService = TestBed.get(ProdutosService);
    expect(service).toBeTruthy();
  });
});
