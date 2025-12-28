import bcrypt from "bcrypt";
import {prisma} from "../config/db";
import jwt from 'jsonwebtoken';

export class AuthService {


    static async login(email: string, pass: string) {
        // 1. Buscar el usuario
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Credenciales inválidas");

        // 2. Comparar contraseña
        const isValid = await bcrypt.compare(pass, user.password);
        if (!isValid) throw new Error("Credenciales inválidas");

        // 3. Generar JWT (La llave del kiosko)
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET || 'secret_para_dev_123',
            { expiresIn: '8h' } // Tiempo suficiente para una jornada de trabajo
        );

        return {
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        };
    }

  static async registerUser(name: string, password: string, email: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      // Seleccionamos solo lo que queremos devolver por seguridad
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true // Aquí está tu fecha, confirmada
      }
    });

    return user;
  }

  

   

}