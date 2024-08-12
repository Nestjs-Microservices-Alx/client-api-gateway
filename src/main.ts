import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // logger ------------
  const logger = new Logger('MAIN');

  // // envs ------------
  const PORT = envs.PORT;

  // // set global prefix ------------
  app.setGlobalPrefix('api');

  // // start app ------------
  await app.listen(PORT);
  logger.log(`App is running on port ${PORT}`);
}
bootstrap();
