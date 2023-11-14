import { Router } from 'express';
import passport from 'passport';
import {
  signupController,
  signinController,
  logoutController,
  changeUserRole,
  forgotPasswordController,
  resetPasswordController,
  changeUserRoleController,
} from '../controllers/userController.js';

const router = Router();

// Rutas relacionadas con la autenticación
router.post('/signup', passport.authenticate('signup'), signupController);
router.get('/signin', passport.authenticate('signin'), signinController);
router.get('/logout', logoutController);

// Rutas relacionadas con la recuperación de contraseña
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password/:token', resetPasswordController);
router.post('/premium/:uid', changeUserRole);

// Ruta para cambiar el rol de un usuario
router.post('/premium/:uid', changeUserRoleController);

export default router;
