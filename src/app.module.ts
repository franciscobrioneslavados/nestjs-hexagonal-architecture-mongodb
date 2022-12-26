import { Logger, Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configVar } from './config/config-var';
import { Configuration } from './config/env.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./environments/${process.env.NODE_ENV}.env`,
      load: [configVar],
    }),
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
  ],
  providers: [ConfigService],
})
export class AppModule {
  static port: number | string;

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('*');
  // }

  constructor(private readonly configService: ConfigService) {
    const logger = new Logger(AppModule.name);

    AppModule.port = configService.get(Configuration.PORT);

    logger.log(
      `Configure on ENV: ${configService.get(Configuration.NODE_ENV)}`,
    );

    logger.verbose(`CONFIG_VAR: => ${JSON.stringify(configVar())}`);

    logger.log(
      `Configure NODE PORT on ${configService.get(Configuration.PORT)}`,
      AppModule.name,
    );
  }
}
