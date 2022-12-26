import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationModule } from '../application/application.module';
import ProductSchema from './adapters/respository/products/schema/product.schema';
import ProductController from './controllers/product.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration } from '../config/env.enum';

@Module({
  imports: [
    ApplicationModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get(Configuration.MONGO_CONNECTION_STRING)}`,
      }),
    }),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductController],
})
export class InfrastructureModule {}
