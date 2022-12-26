import { Injectable, Inject } from '@nestjs/common';
import Product from '../../../domain/models/products.model';
import { ProductRepository } from '../../../domain/ports/product.repository';
import { Optional } from 'typescript-optional';

@Injectable()
export default class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository') private productRepository: ProductRepository,
  ) {}

  public handler(
    productId: string,
    product: Product,
  ): Promise<Optional<Product>> {
    return this.productRepository.updateProduct(productId, product);
  }
}
