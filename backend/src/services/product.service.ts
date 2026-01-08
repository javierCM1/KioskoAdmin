 import {prisma} from '../config/db';


export class ProductService {
  
  static async createProduct(data: { 
  barcode?: string; 
  name: string; 
  buyPrice: number; 
  sellPrice: number; 
  stock: number; 
  category: string; 
  imagePath?: string 
}) {
  
  // 1. Validaciones de lógica
  if (data.buyPrice < 0) throw new Error("El precio de compra no puede ser negativo");

  // 2. Creación en base de datos
  return await prisma.product.create({
    data: {
      name: data.name,
      barcode: data.barcode || null, // Prisma prefiere null a undefined para campos opcionales
      buyPrice: data.buyPrice, // Prisma convertirá el number a Decimal automáticamente si el valor es numérico
      sellPrice: data.sellPrice,
      stock: data.stock,
      category: data.category,
      imagePath: data.imagePath || null
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


