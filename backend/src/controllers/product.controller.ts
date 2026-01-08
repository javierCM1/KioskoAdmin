import { ProductService } from '../services/product.service';

export class ProductController {   

    constructor() {}    

  // En tu ProductController
public createProduct = async (req: any, res: any) => {
    try {
        const { name, barcode, category, buyPrice, sellPrice, stock } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

        // PARSEO CRÍTICO: FormData siempre envía strings.
        const product = await ProductService.createProduct({
            name,
            barcode,
            category,
            imagePath,
            buyPrice: Number(buyPrice), // Forzar a número
            sellPrice: Number(sellPrice), // Forzar a número
            stock: Number(stock) // Forzar a número
        });

        res.status(201).json({ message: "Guardado", product });
    } catch (error: any) {
        console.error("LOG DEL SERVIDOR:", error); // ESTO te dirá la verdad en la terminal
        res.status(500).json({ message: error.message });
    }
}
    public getAllProducts = async (req: any, res: any) => { 

        try {
            const products = await ProductService.getAllProducts();
            return res.status(200).json(products);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }

    }

    public getProductById = async (req: any, res: any) => {

        const { id } = req.params;

        try {
            const product = await ProductService.getProductById(id);
            return res.status(200).json(product);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }

    }

    public updateProduct = async (req: any, res: any) => {
        const { id } = req.params;
        const { name, price, stock, imagePath, category } = req.body;

        if (!name || price == null || stock == null || !category) {
            return res.status(400).json({ message: "All product fields are required" });
        }

        try {
            const updatedProduct = await ProductService.updateProduct(parseInt(id), { name, price, stock, imagePath, category });
            return res.status(200).json({ message: "Product updated successfully", updatedProduct });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }

    }


    public deleteProduct = async (req: any, res: any) => {

        const { id } = req.params;

        try {
            await ProductService.deleteProduct(parseInt(id));
            return res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: "No se pudo eliminar el producto" });
        }
    }
}