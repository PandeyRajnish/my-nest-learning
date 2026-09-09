import { Controller, Get, Header } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get()
    @Header('Content-Type', 'application/json')
    getProducts(): any {
        return {
            id: 1,
            name: 'Product 1',
            price: 100
        }
    }
}
