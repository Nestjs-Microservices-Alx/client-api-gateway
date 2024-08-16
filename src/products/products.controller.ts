import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { NATS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/shared/dtos';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    // microservices: mismo name q se uso al registrar el microservicio en el module `ClientsModule`
    @Inject(NATS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(
    @Body()
    createProductDto: CreateProductDto,
  ) {
    return this.productsClient.send(
      { cmd: 'create_product' },
      {
        ...createProductDto,
      },
    );
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
    return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

    /* // // 2. parsing observables to promises
    try {
      // // observable requiere subscribe: firstValueFrom() retorna Promise y recibe Observable
      // espera el 1er valor q el observable emita (maneja el subscribe/unsubscribe x debajo)
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );

      return product;
    } catch (error) {
      throw new RpcException(error); // to be caught by RpcCustomExceptionFilter
    } */
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productsClient
      .send(
        { cmd: 'update_product' },
        {
          ...body,
          id,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'remove_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
