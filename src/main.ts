import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './shared/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // logger ------------
  const logger = new Logger('MAIN');

  // // envs ------------
  const PORT = envs.PORT;

  // // set global prefix ------------
  app.setGlobalPrefix('api');

  // // set global pipes ------------
  app.useGlobalPipes(
    // validate DTOs
    new ValidationPipe({
      whitelist: true, // remueve extra data of DTO - like Mongoose ODM
      // forbidNonWhitelisted: true, // envia 1 error con las properties q NO estan definidas en DTO
    }),
  );

  // // global filters ------------
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  // // start app ------------
  await app.listen(PORT);
  logger.log(`Client Gateway is running on port ${PORT}`);
}
bootstrap();
