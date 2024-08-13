import { PartialType } from '@nestjs/mapped-types';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  // este es el client, asi 1 no valida el ID aqui
}
