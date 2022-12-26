import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainModule } from 'src/domain/domain.module';
import ProductRepositoryMongo from '../infrastructure/adapters/respository/products/product.repository.mongo';
import ProductSchema from '../infrastructure/adapters/respository/products/schema/product.schema';
import ProductFactory from './factory/product.factory';
import { PRODUCTS_USECASES } from './usecases/products';

@Module({
  imports: [
    DomainModule,
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
    ]),
  ],
  providers: [
    ProductFactory,
    ...PRODUCTS_USECASES,
    { provide: 'ProductRepository', useClass: ProductRepositoryMongo },
  ],
  exports: [ProductFactory, ...PRODUCTS_USECASES],
})
export class ApplicationModule {}
