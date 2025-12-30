import {prisma} from '../config/db';

export class SaleService {
  static async createSale(items: { productId: number; quantity: number }[]) {
    // Usamos $transaction para que si algo falla, TODO vuelva atrás
    return await prisma.$transaction(async (tx) => {
      let total = 0;
      const saleItemsData = [];

      for (const item of items) {
        // 1. Validar que el producto existe y tiene stock
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product) throw new Error(`Producto con ID ${item.productId} no encontrado`);
        if (product.stock < item.quantity) throw new Error(`Stock insuficiente para ${product.name}`);

        // 2. Calcular subtotal y acumular el total
        const subtotal = Number(product.price) * item.quantity;
        total += subtotal;

        // 3. Descontar el stock (Crucial)
        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.quantity } }
        });

        // 4. Preparar el detalle para guardar
        saleItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price
        });
      }

      // 5. Crear la venta y sus detalles
      return await tx.sale.create({
        data: {
          total,
          items: {
            create: saleItemsData
          }
        },
        include: { items: true } // Para que devuelva la venta con sus hijos
      });
    });
  }
}