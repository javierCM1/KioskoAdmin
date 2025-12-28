import { Request,Response } from "express";
import { AuthService } from "../services/auth.service";


export class AuthController {   

    constructor() {}

 public registerUser = async (req: Request, res: Response) => {

    try {
       const { name, password,email } = req.body;

       if (!name || !password || !email) {
        return res.status(400).json({ message: "Name, email, and password are required" });
       }

         const user = await AuthService.registerUser(name, password,email);

        return res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


public loginUser = async(req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
        if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
        }

      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }



}