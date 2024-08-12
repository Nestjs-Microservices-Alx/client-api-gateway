import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PRODUCTS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/shared/dtos';

@Controller('products')
export class ProductsController {
  constructor(
    // microservices: mismo name q se uso al registrar el microservicio en el module `ClientsModule`
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'This action adds a new product';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    // send to await response (async - MessagePattern) | emit just emit event and don't wait for response
    return this.productsClient.send(
      // .send() retorna Observable
      { cmd: 'find_all_products' },
      {
        ...paginationDto,
      },
    ); // pattern tal cual lo tiene el us, payload
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string) {
    try {
      // // observable requiere subscribe: firstValueFrom() retorna Promise y recibe Observable
      // espera el 1er valor q el observable emita (maneja el subscribe/unsubscribe x debajo)
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );

      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string) {
    return 'This action updates a product #' + id;
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string, @Body() body: any) {
    console.log(body);
    return 'This action removes a product #' + id;
  }
}
