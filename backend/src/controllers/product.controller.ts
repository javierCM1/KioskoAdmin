import { ProductService } from '../services/product.service';

export class ProductController {   

    constructor() {}    

    public createProduct = async (req: any, res: any) => {

        const { name,price, stock, imagePath,category } = req.body;

        if (!name ||  price == null || stock == null || !category) {
            return res.status(400).json({ message: "All product fields are required" });
        }
        try {           
            
            const product = await ProductService.createProduct({ name, price,category, stock, imagePath });
            return res.status(201).json({ message: "Product created successfully", product });
        }   catch (error: any) {
            return res.status(500).json({ message: error.message });
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