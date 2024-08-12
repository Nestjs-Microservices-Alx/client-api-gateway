import { Module } from '@nestjs/common';

// microservices
import { ClientsModule, Transport } from '@nestjs/microservices';

import { envs, PRODUCTS_SERVICE } from 'src/config';
import { ProductsController } from './products.controller';

@Module({
  // registrar el Microservicio de productos
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE,
        transport: Transport.TCP, // xq el microservicio usa TCP, siempre el mismo
        options: {
          host: envs.PRODUCTS_MICROSERVICE_HOST,
          port: envs.PRODUCTS_MICROSERVICE_PORT,
        },
      },
    ]),
  ],

  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
