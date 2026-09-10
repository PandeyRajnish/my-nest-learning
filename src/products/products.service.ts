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
    const [product] = this.findProduct(prodId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return { ...product };
  }

  updateProduct(
    id: string,
    productData: {
      title?: string | null;
      description?: string | null;
      price?: number | null;
    },
  ) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = {
      title: productData.title !== undefined ? productData.title : null,
      description:
        productData.description !== undefined ? productData.description : null,
      price: productData.price !== undefined ? productData.price : null,
    } as Product;

    this.product[index] = { ...product, ...updatedProduct };
    return { ...product, ...updatedProduct };
  }

  partialUpdate(
    id: string,
    productData: {
      title?: string;
      description?: string;
      price?: number;
    },
  ) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = {
      ...product,
      ...productData,
    };

    this.product[index] = updatedProduct;
    return updatedProduct;
  }

  removeProduct(id: string) {
    const [product, index] = this.findProduct(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    this.product.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.product.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }
    return [this.product[productIndex], productIndex];
  }
}
