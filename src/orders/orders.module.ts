import { Module } from '@nestjs/common';

// microservices
import { ClientsModule, Transport } from '@nestjs/microservices';

import { envs, ORDERS_SERVICE } from 'src/config';
import { OrdersController } from './orders.controller';

@Module({
  // register the Orders Microservice
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE,
        transport: Transport.TCP, // mismo q usa el microservicio
        options: {
          host: envs.ORDERS_MICROSERVICE_HOST,
          port: envs.ORDERS_MICROSERVICE_PORT,
        },
      },
    ]),
  ],

  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
