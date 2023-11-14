import UserModel from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signupService = async (first_name, last_name, email, age, password) => {
    try {
        if (!first_name || !last_name || !email || !age || !password) throw { name: 'client error', httpcode: 404, description: 'Todas las credenciales son necesarias' }

        const existsUser = await UserModel.findOne({ email: email })
        if (existsUser) throw { name: 'client error', httpcode: 404, description: 'Ya existe ese email registrado' }

        const hashedPassword = bcrypt.hashSync(password, 10); // Hashear la contraseña

        const user = await UserModel.create({
            first_name: first_name,
            last_name: last_name,
            age: age,
            email: email,
            password: hashedPassword, // Almacenar la contraseña hasheada
        })

        return user;
    } catch (error) {
        throw error;
    }
}

export const signinService = async (email, password) => {
    try {
        if (!email || !password) throw { name: 'client error', httpcode: 404, description: 'Todas las credenciales son necesarias' }

        const user = await UserModel.findOne({ email: email })
        if (!user) throw { name: 'client error', httpcode: 404, description: 'Usuario no encontrado' }

        const validatePassword = bcrypt.compareSync(password, user.password)

        if (!validatePassword) throw { name: 'client error', httpcode: 404, description: 'Credenciales inválidas' }

        return user;
    } catch (error) {
        throw error;
    }
}

export const forgotPasswordService = async (email) => {
    try {
      // Lógica para generar un token único y enviarlo por correo al usuario
      // Puedes utilizar alguna librería para generar tokens únicos (por ejemplo, 'uuid')
      const token = jwt.sign({ email: email }, 'clave-secreta', { expiresIn: '1h' });
  
      // Envía el token por correo electrónico al usuario
  
      return token;
    } catch (error) {
      throw error;
    }
  };
  
  export const resetPasswordService = async (token, newPassword) => {
    try {
      // Lógica para verificar el token y restablecer la contraseña
      const decodedToken = jwt.verify(token, 'clave-secreta');
  
      // Busca al usuario por el correo electrónico en el token
      const user = await UserModel.findOne({ email: decodedToken.email });
  
      if (!user) {
        throw { name: 'client error', httpcode: 404, description: 'Usuario no encontrado' };
      }
  
      // Actualiza la contraseña del usuario
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      user.password = hashedPassword;
  
      // Guarda los cambios en la base de datos
      await user.save();
  
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  export const changeUserRoleService = async (userId, newRole) => {
    try {
      // Lógica para cambiar el rol del usuario
      // Puedes utilizar el userId para buscar al usuario en la base de datos
      const user = await UserModel.findById(userId);
  
      if (!user) {
        throw { name: 'client error', httpcode: 404, description: 'Usuario no encontrado' };
      }
  
      // Actualiza el rol del usuario
      user.role = newRole;
  
      // Guarda los cambios en la base de datos
      await user.save();
  
      return user;
    } catch (error) {
      throw error;
    }
  };

export const logoutService = async () => {
    try {

    } catch (error) {
        throw error;
    }
}
