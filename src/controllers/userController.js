import express from 'express';
import passport from 'passport';
import {
  signupService,
  signinService,
  logoutService,
  forgotPasswordService,
  resetPasswordService,
  changeUserRoleService,
} from '../services/userService.js';

export const signupController = async (req, res) => {
  try {
    // No es necesario almacenar el usuario en la sesión aquí

    return res.status(201).json({
      status: 'success',
      detail: 'Usuario registrado correctamente',
      payload: {} // No es necesario devolver información sensible aquí
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const signinController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ status: 'error', msg: 'Credenciales inválidas' });
    }

    // No es necesario almacenar el usuario en la sesión aquí

    return res.status(200).json({
      status: 'success',
      detail: 'Usuario inició sesión correctamente',
      payload: {} // No es necesario devolver información sensible aquí
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const logoutController = async (req, res) => {
  try {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send('Error al cerrar sesión');
      } else {
        return res.status(200).json({
          status: 'success',
          details: 'Logout success'
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    await forgotPasswordService(email);

    return res.status(200).json({
      status: 'success',
      detail: 'Correo de restablecimiento de contraseña enviado correctamente',
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await resetPasswordService(token, newPassword);

    return res.status(200).json({
      status: 'success',
      detail: 'Contraseña restablecida correctamente',
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const changeUserRoleController = async (req, res) => {
  try {
    const { userId, newRole } = req.body;
    await changeUserRoleService(userId, newRole);

    return res.status(200).json({
      status: 'success',
      detail: 'Rol de usuario cambiado correctamente',
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getCurrentUser = (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ status: 'error', msg: 'Usuario no autenticado' });
    }

    const currentUser = {
      firstName: req.user.first_name,
      lastName: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };

    return res.status(200).json({
      status: 'success',
      detail: 'Usuario autenticado',
      payload: currentUser,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};


