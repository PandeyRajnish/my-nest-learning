import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  addProduct(
    @Body('title') pTitle: string,
    @Body('description') pDesc: string,
    @Body('price') pPrice: number,
  ) {
    const returnedId = this.productService.insertProduct(pTitle, pDesc, pPrice);

    return { id: returnedId };
  }
}
