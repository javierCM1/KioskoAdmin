import { SaleService } from './../services/sale.service';
import { Request,Response } from "express";





export class SaleController {   

    constructor() {}    



    static create = async (req: Request, res: Response) => {

      try {
      const { items } = req.body;
      
      if (!items || items.length === 0) {
        return res.status(400).json({ message: "La venta debe tener al menos un producto" });
      }

      const newSale = await SaleService.createSale(items);
      res.status(201).json(newSale);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }

    }


}