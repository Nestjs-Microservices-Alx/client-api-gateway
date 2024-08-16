import { Module } from '@nestjs/common';

// microservices

import { NatsModule } from 'src/transports/nats.module';
import { OrdersController } from './orders.controller';

@Module({
  // register the Orders Microservice
  imports: [
    NatsModule, // reusable module
  ],

  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
