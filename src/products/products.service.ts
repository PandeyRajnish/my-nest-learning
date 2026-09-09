import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  product: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const id = Math.floor(Math.random() * Date.now()).toString();
    const newProduct = new Product(id, title, desc, price);
    this.product.push(newProduct);
    return id;
  }

  getProducts() {
    return [...this.product];
  }

  getProduct(prodId: string) {
    const product = this.product.find((prod) => prod.id === prodId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return { ...product };
  }
}
