import { Module } from '@nestjs/common';

// microservices
import { NatsModule } from 'src/transports/nats.module';

import { ProductsController } from './products.controller';

@Module({
  // registrar el Microservicio de productos
  imports: [
    NatsModule, // reusable module

    // // --------------------------
    // ClientsModule.register([
    //   {
    //     name: NATS_SERVICE,
    //     // transport: Transport.TCP, // xq el microservicio usa TCP, siempre el mismo
    //     transport: Transport.NATS, // xq el us usa NATS
    //     options: {
    //       servers: envs.NATS_SERVERS, // NATS
    //       // host: envs.PRODUCTS_MICROSERVICE_HOST, // TCP
    //       // port: envs.PRODUCTS_MICROSERVICE_PORT, // TCP
    //     },
    //   },
    // ]),
  ],

  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
