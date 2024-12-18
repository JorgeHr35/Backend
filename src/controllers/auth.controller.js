import Cliente from "../models/cliente.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

// Registro de un cliente
export const register = async (req, res) => {
  try {
    const { nombre, correo_electronico, contrasena } = req.body;

    const existingCliente = await Cliente.findOne({ correo_electronico });
    if (existingCliente) {
      return res.status(400).json({ error: "El correo ya está en uso" });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoCliente = new Cliente({
      nombre,
      correo_electronico,
      contrasena: hashedPassword,
    });

    await nuevoCliente.save();
    res.status(201).json({ message: "Cliente registrado exitosamente" });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ error: "Error en el registro" });
  }
};

// Inicio de sesión
export const login = async (req, res) => {
  try {
    const { correo_electronico, contrasena } = req.body;

    const cliente = await Cliente.findOne({ correo_electronico });
    if (!cliente) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos" });
    }

    const isPasswordValid = await bcrypt.compare(contrasena, cliente.contrasena);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: cliente._id, nombre: cliente.nombre }, // Sin rol
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: { id: cliente._id, nombre: cliente.nombre },
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ error: "Error en el inicio de sesión" });
  }
};
