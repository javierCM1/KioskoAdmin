 import {prisma} from '../config/db';


export class ProductService {
  static async createProduct(data: { name: string; price: number; stock: number; category: string; imagePath?: string }) {
    // Validamos que el precio no sea negativo (Objetividad estratégica)
    if (data.price <= 0) throw new Error("El precio debe ser mayor a cero");

    return await prisma.product.create({
      data: {
        ...data,
        price: data.price // Prisma manejará la conversión a Decimal
      }
    });
  }

  static async getAllProducts() {
    return await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getProductById(id: number) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  static async updateProduct(id: number, data: Partial<{ name: string; price: number; stock: number; category: string; imagePath?: string }>) {
    
 
    if (data.price !== undefined && data.price <= 0) {
      throw new Error("El precio debe ser mayor a cero");
    }

    try {
      return await prisma.product.update({
        where: { id },
        data: {
          ...data,
          ...(data.price !== undefined && { price: data.price })
        }
      });
    } catch (error) {
      throw new Error("No se pudo actualizar: El producto no existe");
    }
  }

  static async deleteProduct(id: number) {
    try {
     
      return await prisma.product.delete({
        where: { id }
      });
    } catch (error) {
      throw new Error("Producto no encontrado o ya fue eliminado");
    }
  }

  

}


