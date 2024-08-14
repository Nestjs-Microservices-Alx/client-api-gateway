import { IsEnum, IsOptional } from 'class-validator';

import { OrderStatus, OrderStatusList } from '../enum';

export class StatusDto {
  @IsEnum(OrderStatusList, {
    message: `status must be a valid value (${OrderStatusList.join(', ')})`,
  })
  @IsOptional()
  status: OrderStatus;
}
