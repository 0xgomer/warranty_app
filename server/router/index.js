import {Router} from "express";
import {body} from "express-validator";
import UserController from '../controllers/user-controller.js'
import AuthController from "../controllers/auth-controller.js";
import ProductController from "../controllers/product-controller.js";
import AuthMiddleware from "../middlewares/auth-middleware.js";
import RoleMiddleware from "../middlewares/role-middleware.js";
import multer from "multer";
import WarrantyController from "../controllers/warranty-controller.js";
import StatisticController from "../controllers/statistic-controller.js";
import PagesController from "../controllers/pages-controller.js";

const router = new Router()
const upload = multer({dest:'uploads/'})


// Auth

router.post('/registration', body('email').isEmail(), body('username').matches(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i), body('password').matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), AuthController.registration)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/forgotPassword', AuthController.forgotPassword)
router.patch('/recovery/:link', body('password').matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), AuthController.recoveryPassword)
router.get('/activate/:link', AuthController.activate)
router.get('/refresh', AuthController.refresh)

//admin settings

router.get('/users', AuthMiddleware, RoleMiddleware, UserController.getUsers)
router.get('/statistic', AuthMiddleware, RoleMiddleware, StatisticController.getStatistic)

//user settings

router.patch('/changeEmail', AuthMiddleware, body('email').isEmail(), UserController.changeEmail)
router.patch('/changeUsername', AuthMiddleware, body('username').matches(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i), UserController.changeUsername)
router.patch('/changePassword', AuthMiddleware, body('newPassword').matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), UserController.changePassword)
router.get('/user', AuthMiddleware, UserController.getUser)
router.patch('/user', AuthMiddleware, body('email').isEmail(), body('username').matches(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i), UserController.editUser)
router.delete('/user', AuthMiddleware, RoleMiddleware, UserController.deleteUser)

//products

router.get('/products', AuthMiddleware, RoleMiddleware, ProductController.getAllProducts)
router.post('/product', AuthMiddleware, RoleMiddleware, upload.single('file'), ProductController.addProduct)
router.patch('/product', AuthMiddleware, RoleMiddleware, upload.single('file'), ProductController.editProduct)
router.get('/product', AuthMiddleware, RoleMiddleware, ProductController.getProduct)
router.delete('/product', AuthMiddleware, RoleMiddleware, ProductController.deleteProduct)

// warranty

router.post('/warranty', AuthMiddleware, WarrantyController.addWarranty)
router.get('/warranty', WarrantyController.getWarranty)
router.get('/warranties', AuthMiddleware, WarrantyController.getAllWarranties)
router.patch('/warranty', AuthMiddleware, RoleMiddleware, WarrantyController.editWarranty)
router.delete('/warranty', AuthMiddleware, RoleMiddleware, WarrantyController.deleteWarranty)

// pages

router.get('/pages', PagesController.getPage)
router.patch('/pages',
    AuthMiddleware,
    RoleMiddleware,
    PagesController.editPage)


export default router