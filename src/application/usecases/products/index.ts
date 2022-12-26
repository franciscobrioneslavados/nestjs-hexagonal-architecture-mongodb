import CreateProductUseCase from './createProduct.usecase';
import DeleteProductUseCase from './deleteProduct.usecase';
import GetAllProductsUseCase from './getAllProducts.usecase';
import GetProductUseCase from './getProduct.usecase';
import UpdateProductUseCase from './updateProduct.usecase';

export const PRODUCTS_USECASES = [
  CreateProductUseCase,
  DeleteProductUseCase,
  GetAllProductsUseCase,
  GetProductUseCase,
  UpdateProductUseCase,
];
